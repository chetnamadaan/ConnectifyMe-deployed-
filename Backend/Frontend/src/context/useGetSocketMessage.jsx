import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../zustand/useConversation.js";
import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { setMessage } = useConversation();

  useEffect(() => {
    // Listening for new messages from the socket
    socket.on("newMessage", (newMessage) => {
      const notification = new Audio(sound);
      notification.play();

      // Appending the new message to the previous messages
      setMessage(newMessage);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, setMessage]);
};

export default useGetSocketMessage;
