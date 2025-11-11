// ConnectionContext.tsx
import React, { createContext, useContext, useRef, useState } from "react";
import TcpSocket from "react-native-tcp-socket";
import { ToastAndroid } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInviteCode,
  selectPort,
} from "../storeServices/host/hostReducer";
import { selectUser } from "../storeServices/auth/authReducer";
import { Buffer } from "buffer";
import store from "../store/configureStore";

const ConnectionContext = createContext(null);

export const ConnectionProvider = ({ children }) => {
  const PORT = useSelector(selectPort);
  const INVITE_CODE = useSelector(selectInviteCode);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const [server, setServer] = useState(null);
  const serverRef = useRef(server);
  const [client, setClient] = useState(null);
  const [serverSocket, setServerSocket] = useState(null);

  let buffer = ""; // store partial chunks here
  const connectedSockets = new Map(); // e.g., { socketId: socket }

  const startServer = () => {
    const newServer = TcpSocket.createServer(function (socket) {
      setServerSocket(socket);

      socket.on("data", (data) => {
        // decode chunk
        const decoded = Buffer.from(data).toString("utf-8");
        buffer += decoded; // append to buffer

        // process all complete messages separated by '\n'
        let boundary;
        while ((boundary = buffer.indexOf("\n")) !== -1) {
          const message = buffer.slice(0, boundary);
          buffer = buffer.slice(boundary + 1);

          try {
            const json = JSON.parse(message);

            if (json?.type == "join_request") {
              // Ask for approval

              socket.id = Date.now().toString();
              connectedSockets.set(socket.id, socket);

              const requestingClientData = {
                ...socket.address(),
                ...json,

                id: socket.id,
              };
              // show modal to accept with the client data

              dispatch({
                type: "setClientSeekingApproval",
                payload: requestingClientData,
              });
              dispatch({ type: "setApprovalModalVisible", payload: true });

              return;
            }

            if (json?.type == "enter_code") {
              if (json?.code?.trim() == INVITE_CODE) {
                // add client

                const storedClient =
                  store.getState().host.clientSeekingApproval;

                dispatch({ type: "addClient", payload: storedClient });

                socket.write(JSON.stringify({ type: "authenticated" }) + "\n");
              } else {
                socket.write(
                  JSON.stringify({
                    type: "unauthorized",
                    message: "Invalid access code!",
                  }) + "\n"
                );
              }
              return;
            }

            if (json?.type == "message") {
              const CLIENTS = store.getState().host.authenticatedClients;

              const clientExists = CLIENTS.findIndex(
                (i) => i.deviceId == json?.deviceId
              );

              if (clientExists == -1) {
                // remove client
                socket.write(
                  JSON.stringify({
                    type: "unauthorized",
                    message: "Access denied!",
                  }) + "\n"
                );
                socket.destroy();
                console.log("Client doesnt exist");

                return;
              }
              dispatch({ type: "newMessage", payload: json });
              broadcastMessage(socket.id, json);
            } else {
              console.log("New message from client: ", json);
            }

            // handle your join request, etc. here
          } catch (error) {
            console.error("⚠️ JSON parse error:", error.message);
          }
        }
      });

      socket.on("error", (error) => {
        console.log("An error ocurred with client socket ", error);
      });

      socket.on("close", (error) => {
        console.log("Closed connection with ", socket.address(), error);
        // remove client from log
        removeClient(socket.id);
      });
    }).listen({ port: PORT, host: "0.0.0.0" }, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`🔑 Join Code: ${INVITE_CODE}`);
    });

    setServer(newServer);

    newServer.on("error", (error) => {
      console.log("An error ocurred with the server", error);
    });

    newServer.on("close", () => {
      console.log("Server closed connection");
    });
  };

  function removeClient(id) {
    connectedSockets.delete(id);
    const allClients = store.getState().host.authenticatedClients;
    const index = allClients.findIndex((c) => c.id === id);
    if (index !== -1) {
      // connectedClients.splice(index, 1);
      dispatch({ type: "removeClient", payload: id });
      console.log("Client removed from list:", id);
    }
  }

  function broadcastMessage(senderId, message) {
    for (const [id, sock] of connectedSockets) {
      if (id !== senderId && sock.writable) {
        sock.write(JSON.stringify({ ...message, senderId }) + "\n");
      }
    }
  }

  function shutdownServer() {
    // 1. Notify all clients first
    const shutdownMsg = JSON.stringify({ type: "server_closed" }) + "\n";

    for (const [id, sock] of connectedSockets) {
      try {
        sock.write(shutdownMsg);
        sock.end();
        // removeClient(id);
      } catch (e) {
        console.warn("Error closing client:", e);
      }
    }

    // 2. Close the server itself
    serverRef.current?.close(() => console.log("✅ Server closed"));
  }

  // Connect as client
  const connectToServer = ({ port, host }: { port: string; host: string }) => {
    const options = {
      port: Number(port),

      host,
    };

    // Create socket
    const client = TcpSocket.createConnection(options, () => {
      console.log("connected to server!");
      dispatch({
        type: "setClientConnected",
        payload: {},
      });

      client.write(
        JSON.stringify({
          name: user?.name,
          image: user?.image, // base64
          deviceId: user?.deviceId,
          type: "join_request",
        }) + "\n"
      );
    });

    setClient(client);

    client.on("data", function (data) {
      // decode chunk
      const decoded = Buffer.from(data).toString("utf-8");
      buffer += decoded; // append to buffer
      console.log(decoded);

      // process all complete messages separated by '\n'
      let boundary;
      while ((boundary = buffer.indexOf("\n")) !== -1) {
        const message = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 1);

        try {
          const json = JSON.parse(message);
          console.log(json);

          console.log("✅ Received full JSON:", json);

          if (json?.type == "accepted") {
            dispatch({ type: "setClientAccepted", payload: "true" });
            return;
          }
          if (json?.type == "authenticated") {
            dispatch({ type: "setClientAuthenticated", payload: true });
            ToastAndroid.show(
              "Welcome to the chat! you have been invited",
              ToastAndroid.BOTTOM
            );

            return;
          }

          if (json?.type == "rejected") {
            ToastAndroid.show("Access denied by host!", ToastAndroid.BOTTOM);
            dispatch({ type: "resetClient", payload: {} });
            return;
          }

          if (json?.type == "unauthorized") {
            ToastAndroid.show(
              "Unauthorized! Ensure that you've been approved, and the invite code is correct",
              ToastAndroid.BOTTOM
            );
            return;
          }

          if (json.type === "server_closed") {
            console.log("🔌 Server ended the session");
            client.destroy(); // close client connection
            dispatch({ type: "resetClient", payload: {} });
            dispatch({ type: "clearChat", payload: {} });
            // alert("The host ended the chat session.");
            ToastAndroid.show(
              "The host ended the chat session",
              ToastAndroid.BOTTOM
            );
            return;
          }

          if (json?.type == "message") {
            dispatch({ type: "newMessage", payload: json });
          } else {
            console.log("New message from server: ", json);
          }
        } catch (error) {
          console.error("⚠️ JSON parse error:", error.message);
        }
      }
    });

    client.on("error", function (error) {
      console.log(error);
      ToastAndroid.show("Something went wrong!", ToastAndroid.BOTTOM);
    });

    client.on("close", function () {
      console.log("Connection closed!");
    });
  };

  // Send message
  const sendMessage = (text) => {
    if (client)
      client.write(
        JSON.stringify({
          name: user?.name,
          message: text,
          deviceId: user?.deviceId,
          id: Date.now().toString(),
          type: "message",
        }) + "\n"
      );

    if (serverSocket)
      serverSocket.write(
        JSON.stringify({
          name: user?.name,
          message: text,
          deviceId: user?.deviceId,
          id: Date.now().toString(),
          type: "message",
        }) + "\n"
      );

    dispatch({
      type: "newMessage",
      payload: {
        name: user?.name,
        message: text,
        deviceId: user?.deviceId,
        id: Date.now().toString(),
        type: "message",
      },
    });
  };

  return (
    <ConnectionContext.Provider
      value={{
        startServer,
        connectToServer,
        sendMessage,
        client,
        serverSocket,
        shutdownServer,
        server,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};
// };

export const useConnection = () => useContext(ConnectionContext);
