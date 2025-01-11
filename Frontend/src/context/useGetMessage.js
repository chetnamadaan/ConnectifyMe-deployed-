import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const controller = new AbortController();

    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await axios.get(
            `api/message/get/${selectedConversation._id}`,
            { signal: controller.signal }
          );
          setMessage(res.data);
          setLoading(false);
        } catch (error) {
          if (!axios.isCancel(error)) {
            console.error("Error in getting messages:", error);
          }
        } finally {
          setLoading(false);
        }
      }
    };

    getMessages();

    return () => controller.abort();
  }, [selectedConversation, setMessage]);

  return { loading, messages };
};

export default useGetMessage;
