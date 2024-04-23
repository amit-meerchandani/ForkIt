import React, { useState } from "react";
import useConversation from "./../zhustand/useConversation";
import { toast } from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessage = async (message, images) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/v1/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message, images }),
        }
      );
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data.newMessage);
      if (messages) {
        setMessages([...messages, data.newMessage]);
      } else {
        setMessages([data.newMessage]);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
