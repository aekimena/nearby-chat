// ConnectionContext.tsx
import React, { createContext, useContext, useState } from "react";
import TcpSocket from "react-native-tcp-socket";
// import * as NetworkInfo from "expo-network";
import { useNetInfo } from "@react-native-community/netinfo";
import { Alert, PermissionsAndroid, ToastAndroid } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAcceptedClients,
  selectClients,
  selectInviteCode,
  selectPort,
} from "../storeServices/host/hostReducer";
import { addClient } from "../storeServices/host/actions";
import { selectUser } from "../storeServices/auth/authReducer";
import { selectMessages } from "../storeServices/messages/chatReducer";
import { Buffer } from "buffer";

const ConnectionContext = createContext(null);

export const ConnectionProvider = ({ children }) => {
  const { details, type } = useNetInfo();

  const PORT = useSelector(selectPort);
  const INVITE_CODE = useSelector(selectInviteCode);
  const CLIENTS = useSelector(selectClients);
  const MESSAGES = useSelector(selectMessages);
  const ACCEPTED_CLIENTS = useSelector(selectAcceptedClients);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const [server, setServer] = useState(null);
  const [client, setClient] = useState(null);
  const [serverSocket, setServerSocket] = useState(null);
  // const [messages, setMessages] = useState([]);
  // const [ip, setIp] = useState("0.0.0.0");
  // const [myIp, setMyIp] = useState("");
  // const [netDetails, setDetails] = useState();

  // Create server
  // const startServer = () => {
  //   const newServer = TcpSocket.createServer((socket) => {
  //     console.log("Client connected:", socket.address());
  //     socket.on("data", (data) => {
  //       const msg = data.toString();
  //       console.log("Received:", msg);
  //       setMessages((prev) => [...prev, { from: "client", text: msg }]);
  //     });

  //     socket.on("error", (err) => console.log("Socket error:", err));
  //     socket.on("close", () => console.log("Client disconnected"));
  //   });

  //   newServer.listen({ port: 5000, host: "0.0.0.0" }, () => {
  //     console.log("Server running on:", myIp, "port 5000");
  //   });

  //   setServer(newServer);
  // };

  const startServer = (onJoinRequest, onClientLeave) => {
    // const newServer = TcpSocket.createServer((socket) => {
    //   let clientProfile = null;

    //   socket.once("data", (data) => {
    //     try {
    //       const message = JSON.parse(data.toString());
    //       if (message.type === "PROFILE") {
    //         clientProfile = { ...message, socket };
    //         console.log("👤 Connection request from:", clientProfile.name);
    //         socket.write("WAIT_FOR_APPROVAL");

    //         // Notify the UI (so you can show name/image)
    //         onJoinRequest(clientProfile, socket);
    //       }
    //     } catch (e) {
    //       console.log("Invalid initial data from client");
    //       socket.destroy();
    //     }
    //   });
    // });

    const newServer = TcpSocket.createServer(function (socket) {
      setServerSocket(socket);
      socket.on("data", (data) => {
        // socket.write("Echo server " + data);
        // console.log("message was received to server ", data);

        const decoded = Buffer.from(data).toString("utf-8");

        const json = JSON.parse(decoded);

        if (json?.type == "join_request") {
          // Ask for approval
          const requestingClient = socket.address(); // { port: 12346, family: 'IPv4', address: '127.0.0.1' }
          const requestingClientData = { ...requestingClient, ...json };
          // show modal to accept with the client data
          console.log("Client wants to connect: ", requestingClientData);

          return;
        }

        if (json?.type == "enter_code") {
          if (json?.code?.trim() == INVITE_CODE) {
            // add client
          }
          return;
        }

        if (
          json?.type == "message" &&
          !CLIENTS.find((i) => i.deviceId == json?.deviceId)
        ) {
          // remome client
          return;
        }

        if (json?.type == "message") {
          dispatch({ type: "newMessage", payload: json });
        } else {
          console.log("New message from client: ", json);
        }

        // const message = JSON.parse(data.toString());
        // if (message.type == "join_request") {
        //   console.log("User wants to join; ", message);
        // }
      });

      socket.on("error", (error) => {
        console.log("An error ocurred with client socket ", error);
      });

      socket.on("close", (error) => {
        console.log("Closed connection with ", socket.address(), error);
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

    const approveClient = (clientProfile) => {
      const socket = clientProfile.socket;
      socket.write("ENTER_CODE");

      socket.on("data", (data) => {
        const message = data.toString();

        if (message.startsWith("CODE:")) {
          const entered = message.split(":")[1].trim();

          if (entered === INVITE_CODE) {
            socket.write("APPROVED");
            // c.push(clientProfile);
            dispatch(addClient(clientProfile));

            broadcast(`🟢 ${clientProfile.name} joined the chat`, socket);

            socket.on("data", (msg) => {
              const text = msg.toString();
              broadcast(`${clientProfile.name}: ${text}`, socket);
            });

            socket.on("close", () => {
              removeClient(socket);
              onClientLeave(clientProfile);
              broadcast(`🔴 ${clientProfile.name} left the chat`, socket);
            });
          } else {
            socket.write("REJECTED");
            socket.destroy();
          }
        }
      });
    };

    const removeClient = (socket) => {
      // const index = clients.findIndex((c) => c.socket === socket);
      // if (index !== -1) clients.splice(index, 1);
      dispatch(removeClient(socket));
    };

    const broadcast = (message, sender) => {
      CLIENTS.forEach((c) => {
        if (c.socket !== sender) {
          c.socket.write(message);
        }
      });
    };

    // newServer.listen({ port: PORT, host: "0.0.0.0" }, () => {
    //   console.log(`✅ Server running on port ${PORT}`);
    //   console.log(`🔑 Join Code: ${INVITE_CODE}`);
    // });

    // newServer.on("error", (err) => console.error("Server error:", err));

    // setServer(newServer);

    return { server, approveClient };
  };

  // Connect as client
  const connectToServer = ({ port, host }: { port: string; host: string }) => {
    // const newClient = TcpSocket.createConnection(
    //   { port: Number(port), host },
    //   () => {
    //     console.log("Connected to server:", host);
    //   }
    // );

    // // Send join request
    // const joinRequest = JSON.stringify({
    //   type: "join_request",
    //   name: user.name,
    //   image: user.image,
    //   deviceId: user.deviceId,
    // });
    // newClient.write(joinRequest);

    // newClient.on("data", (data) => {
    //   const msg = data.toString();
    //   console.log("Received:", msg);
    //   setMessages((prev) => [...prev, { from: "server", text: msg }]);
    // });

    // newClient.on("error", (err) => console.log("Client error:", err));
    // newClient.on("close", () => console.log("Connection closed"));

    // setClient(newClient);

    const options = {
      port: Number(port),
      // host: "127.0.0.1",
      // localAddress: "127.0.0.1",
      host,
      // localAddress: host,
      // reuseAddress: true,
      // localPort: 20000,
      // interface: "wifi",
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
          image: user?.image,
          // message: text,
          deviceId: user?.deviceId,
          id: Date.now().toString(),
          type: "join_request",
        })
      );

      // // Write on the socket
      // client.write("Hello server!");

      // // Close socket
      // client.destroy();
    });

    setClient(client);

    client.on("data", function (data) {
      // console.log("message was received to client: ", data);
      //       const message = Buffer.from(data).toString("utf-8");
      // console.log("Message received by client:", message);

      // const decoded = Buffer.from(data).toString("utf-8");
      // try {
      //   const json = JSON.parse(decoded);
      //   console.log("Received:", json);
      // } catch {
      //   console.log("Received (raw):", decoded);
      // }
      const decoded = Buffer.from(data).toString("utf-8");

      const json = JSON.parse(decoded);
      if (json?.type == "message") {
        dispatch({ type: "newMessage", payload: json });
      } else {
        console.log("New message from server: ", json);
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
        })
      );
    // if (serverSocket) {
    // For server, echo message back to connected clients (if any)
    // server.connections.forEach((s) => s.write(text));
    // console.log(server);
    if (serverSocket)
      serverSocket.write(
        JSON.stringify({
          name: user?.name,
          message: text,
          deviceId: user?.deviceId,
          id: Date.now().toString(),
          type: "message",
        })
      );
    // }
    // setMessages((prev) => [...prev, { from: "me", text }]);
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
    // dispatch({
    //   type: "newMessage",
    //   payload: {
    //     id: Date.now().toString(),
    //     message: text,
    //     name: user?.name,
    //     deviceId: user?.deviceId,
    //   },
    // });
  };

  return (
    <ConnectionContext.Provider
      value={{
        // myIp,
        // ip,
        // setIp,
        startServer,
        connectToServer,
        sendMessage,
        client,
        server,
        // messages,
        // details,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => useContext(ConnectionContext);
