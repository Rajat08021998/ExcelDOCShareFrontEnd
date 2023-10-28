import React from "react";
import socketio from "socket.io-client";

export const socket = socketio.connect(
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "http://16.170.253.57:8080" //To change URL of Application
);
export const SocketContext = React.createContext();
