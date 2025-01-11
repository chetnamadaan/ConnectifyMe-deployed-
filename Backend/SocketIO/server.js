import http from "http";
import { Server } from "socket.io";
import express from "express";

// Initialize the Express app
const app = express();

// Create an HTTP server with Express app
const server = http.createServer(app);

// Initialize the Socket.io server with the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // Set the origin to the client
    methods: ["GET", "POST"],
  },
});
//realtime  messaging

export const getReceiverSocketId=(receiverId)=>{
  return users[receiverId];
}
const users={}

// Setup Socket.io connection and events
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId=socket.handshake.query.userId
  if(userId){
    users[userId]=socket.id
    console.log("Hello", users);
  }

  io.emit("getOnlineUsers", Object.keys(users));


  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

// Export the server and app to be used in other files
export { app, server, io };
