import React, { useState } from 'react';
import useConversation from '../zustand/useConversation.js';
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `api/message/send/${selectedConversation._id}`, { message }
      );

      // Ensure messages is an array before spreading it
      if (Array.isArray(messages)) {
        setMessage([...messages, res.data]);  // Correct way to update the message array
      } else {
        setMessage([res.data]);  // If messages is not an array, we reset it to just the new message
      }

      setLoading(false);
    } catch (error) {
      console.log("Error in send messages:", error);
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
