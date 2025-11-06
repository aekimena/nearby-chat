declare module "net" {
  import TcpSockets from "react-native-tcp-socket";
  export = TcpSockets;
}

declare module "tls" {
  import TcpSockets from "react-native-tcp-socket";

  export const Server = TcpSockets.TLSServer; // TLS version of Server
  export const TLSSocket = TcpSockets.TLSSocket; // Secure socket class
  export const connect = TcpSockets.connectTLS; // Secure connect()
  export const createServer = TcpSockets.createTLSServer; // Secure createServer()
}
