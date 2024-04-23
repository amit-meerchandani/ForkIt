import React from "react";
import "./chat.css";
import Contacts from "./Contacts";
import MainChat from "./MainChat";
import { useSocketContext } from "../../context/socketContex";
import useConversation from "../../zhustand/useConversation";
const Chat = () => {
  return (
    <div className="main-chat-container">
      <div className="chat-container">
        <Contacts />
        <MainChat />
      </div>
    </div>
  );
};

export default Chat;
