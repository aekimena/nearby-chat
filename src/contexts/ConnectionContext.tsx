// ConnectionContext.tsx
import React, { createContext, useContext, useState } from "react";
import TcpSocket from "react-native-tcp-socket";
// import * as NetworkInfo from "expo-network";
import { useNetInfo } from "@react-native-community/netinfo";
import { Alert, PermissionsAndroid } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux";
import {
  selectClients,
  selectInviteCode,
  selectPort,
} from "../storeServices/host/hostReducer";
import { addClient } from "../storeServices/host/actions";

const ConnectionContext = createContext(null);

export const ConnectionProvider = ({ children }) => {
  const { details, type } = useNetInfo();

  const PORT = useSelector(selectPort);
  const INVITE_CODE = useSelector(selectInviteCode);
  const CLIENTS = useSelector(selectClients);

  const dispatch = useDispatch();

  const [server, setServer] = useState(null);
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [ip, setIp] = useState("0.0.0.0");
  const [myIp, setMyIp] = useState("");
  const [netDetails, setDetails] = useState();

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
      socket.on("data", (data) => {
        socket.write("Echo server " + data);
      });

      socket.on("error", (error) => {
        console.log("An error ocurred with client socket ", error);
      });

      socket.on("close", (error) => {
        console.log("Closed connection with ", socket.address());
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

    return { server: newServer, approveClient };
  };

  // Connect as client
  const connectToServer = () => {
    const newClient = TcpSocket.createConnection(
      { port: 5000, host: ip },
      () => {
        console.log("Connected to server:", ip);
      }
    );

    newClient.on("data", (data) => {
      const msg = data.toString();
      console.log("Received:", msg);
      setMessages((prev) => [...prev, { from: "server", text: msg }]);
    });

    newClient.on("error", (err) => console.log("Client error:", err));
    newClient.on("close", () => console.log("Connection closed"));

    setClient(newClient);
  };

  // Send message
  const sendMessage = (text) => {
    if (client) client.write(text);
    if (server) {
      // For server, echo message back to connected clients (if any)
      server.connections.forEach((s) => s.write(text));
    }
    setMessages((prev) => [...prev, { from: "me", text }]);
  };

  return (
    <ConnectionContext.Provider
      value={{
        myIp,
        ip,
        setIp,
        startServer,
        connectToServer,
        sendMessage,
        messages,
        details,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => useContext(ConnectionContext);
