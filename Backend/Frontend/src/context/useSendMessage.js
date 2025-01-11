import React, { useState } from 'react';
import useConversation from '../zustand/useConversation.js';
import axios from 'axios';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `api/message/send/${selectedConversation._id}`,
        { message }
      );
      // Append the new message to the existing messages array
      setMessage((prevMessages) => [...prevMessages, res.data]);
      setLoading(false);
    } catch (error) {
      console.log('Error in send messages:', error);
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
