import React from "react";
import socketio from "socket.io-client";

export const socket = socketio.connect(
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "http://13.51.207.101:8080"
);
export const SocketContext = React.createContext();
