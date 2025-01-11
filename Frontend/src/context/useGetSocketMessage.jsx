import React, { useEffect } from "react";
import {useSocketContext} from "./SocketContext";
import useConversation from "../zustand/useConversation.js"
import sound from "../assets/notification.mp3"
const useGetSocketMessage = () => {
    const {socket} =useSocketContext();
  const {messages, setMessage} = useConversation(); // Initialize as an array

  useEffect(() => {
  
    // Listen for new messages
    socket.on("newMessage", (newMessage) => {
        const notification = new Audio(sound)
        notification.play();
        setMessage((prevMessages) => [...prevMessages, newMessage]);
      
    });
  
    return () => {
      socket.off("newMessage"); // Cleanup listener
    };
  }, [socket, setMessage]);
};

export default useGetSocketMessage;
