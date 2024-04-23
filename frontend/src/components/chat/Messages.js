import React, { useEffect, useRef, useState } from "react";
// import Message from "./Message";
import useGetMessages from "./../../hooks/useGetMessages";
import Message from "./Message";
import { useSocketContext } from "../../context/socketContex";
import extractTime from "./extractTime";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import useConversation from "../../zhustand/useConversation";
// import MessageSkeleton from "./MessageSkeleton";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const lastMessageRef = useRef();

  const { selectedConversation, setSelectedConversation } = useConversation();

  const currentTime = extractTime(new Date().toISOString());

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <>
      <div className="chat-messages">
        <p className="chat-time">Today at {currentTime}</p>

        {!loading &&
          messages?.length > 0 &&
          messages.map((message, index) => (
            <div
              key={index + 1}
              ref={index === messages?.length - 1 ? lastMessageRef : null}
            >
              <Message message={message} />
            </div>
          ))}
        {/* {loading && [...Array(5)].map((_, idx) => <MessageSkeleton key={idx} />)} */}
        {!loading && messages?.length === 0 && (
          <p className="no-messages">
            Send a message to start the conversation
          </p>
        )}
      </div>
    </>
  );
};

export default Messages;
