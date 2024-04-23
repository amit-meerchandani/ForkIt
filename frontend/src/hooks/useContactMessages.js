import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useContactMessages = (reciverId) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/messages/${reciverId}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data.messages);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reciverId, setMessages]);
  return { messages, loading };
};

export default useContactMessages;
