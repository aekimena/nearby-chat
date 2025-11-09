// ConnectionContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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
import store from "../store/configureStore";

const ConnectionContext = createContext(null);

export const ConnectionProvider = ({ children }) => {
  const { details, type } = useNetInfo();

  const PORT = useSelector(selectPort);
  const INVITE_CODE = useSelector(selectInviteCode);
  // const CLIENTS = useSelector(selectClients);
  const MESSAGES = useSelector(selectMessages);
  const ACCEPTED_CLIENTS = useSelector(selectAcceptedClients);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  // const [server, setServer] = useState(null);
  const [client, setClient] = useState(null);
  const [serverSocket, setServerSocket] = useState(null);

  // const [clientSeekingApproval, setClientSeekingApproval] = useState(null);
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

  const startServer = () => {
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
          // setClientSeekingApproval(requestingClientData);
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

            const storedClient = store.getState().host.clientSeekingApproval;

            console.log("about to save client: ", storedClient);

            dispatch({ type: "addClient", payload: storedClient });

            socket.write(JSON.stringify({ type: "authenticated" }));
          } else {
            socket.write(
              JSON.stringify({
                type: "unauthorized",
                message: "Invalid access code!",
              })
            );
          }
          return;
        }

        if (json?.type == "message") {
          const CLIENTS = store.getState().host.authenticatedClients;
          console.log("all clients: ", CLIENTS);

          const clientExists = CLIENTS.findIndex(
            (i) => i.deviceId == json?.deviceId
          );

          if (clientExists == -1) {
            // remove client
            socket.write(
              JSON.stringify({
                type: "unauthorized",
                message: "Access denied!",
              })
            );
            socket.destroy();
            console.log("Client doesnt exist");

            return;
          }
          dispatch({ type: "newMessage", payload: json });
        } else {
          console.log("New message from client: ", json);
        }
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

    newServer.on("error", (error) => {
      console.log("An error ocurred with the server", error);
    });

    newServer.on("close", () => {
      console.log("Server closed connection");
    });

    const removeClient = (socket) => {
      // const index = clients.findIndex((c) => c.socket === socket);
      // if (index !== -1) clients.splice(index, 1);
      // dispatch(removeClient(socket));
    };

    const broadcast = (message, sender) => {
      const CLIENTS = store.getState().host.authenticatedClients;
      CLIENTS.forEach((c) => {
        if (c.socket !== sender) {
          c.socket.write(message);
        }
      });
    };
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
          // image: user?.image, // for now
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

      if (json?.type == "accepted") {
        dispatch({ type: "setClientAccepted", payload: "true" });
        return;
      }
      if (json?.type == "authenticated") {
        // dispatch({ type: "setClientAccepted", payload: "true" });
        // dispatch({ type: "setAuthModalVisible", payload: false });
        dispatch({ type: "setClientAuthenticated", payload: true });
        ToastAndroid.show(
          "Welcome to the chat! you have been invited",
          ToastAndroid.BOTTOM
        );

        return;
      }

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
        serverSocket,
        // clientSeekingApproval,
        // messages,
        // details,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => useContext(ConnectionContext);
