import React from "react";
import socketio from "socket.io-client";

export const socket = socketio.connect(
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "http://13.48.44.175:8080" //To change URL of Application
);
export const SocketContext = React.createContext();
