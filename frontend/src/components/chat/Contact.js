import React, { useState } from "react";
import { useEffect } from "react";
import useConversation from "../../zhustand/useConversation";
import { useSocketContext } from "../../context/socketContex";
import useContactMessages from "../../hooks/useContactMessages";
import Loader from "../loader/Loader";
import { useSelector } from "react-redux";
const Contact = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { loading, messages } = useContactMessages(conversation._id);
  const { user } = useSelector((state) => state.user);
  const [following, setFollowing] = useState(false);
  const [followed, setFollowed] = useState(false);

  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(conversation._id);

  let lastMessage = "";
  if (messages?.length > 0) {
    const message_data = messages[messages.length - 1];
    if (message_data?.message) {
      lastMessage = messages[messages.length - 1].message;
    } else if (message_data?.images) {
      lastMessage = "📷 Image";
    }
  } else {
    lastMessage = "No message yet";
  }

  useEffect(() => {
    if (user) {
      const isFollowing = user.following.find(
        (follower) => follower._id === conversation._id
      );
      const isFollowed = user.followers.find(
        (follower) => follower._id === conversation._id
      );
      if (isFollowing) setFollowing(true);
      else setFollowing(false);
      if (isFollowed) setFollowed(true);
      else setFollowed(false);
    }
  }, [user, conversation._id]);

  let connectName = "";
  if (following && followed) {
    connectName = "Connected";
  } else if (following) {
    connectName = "Requested";
  } else {
    connectName = "Follow Back";
  }

  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);
  const isSelected = selectedConversation?._id === conversation._id;
  const handleClick = () => {
    if (connectName !== "Connected") return;
    setSelectedConversation(conversation);
  };

  return (
    <>
      {loading ? (
        <div className="loader-small"></div>
      ) : (
        <div
          className={`chat-contact ${isSelected ? "selected" : ""} ${
            connectName !== "Connected" ? "make-disabled" : ""
          }`}
          onClick={handleClick}
        >
          <img
            className="chat-pic rogers"
            src={conversation.avatar.url}
            alt={conversation.name}
          />
          <span
            className={`chat-badge ${isOnline ? "user-online-now" : ""}`}
          ></span>
          <span className="chat-name">{conversation.name}</span>
          <p className="chat-message">{lastMessage}</p>
        </div>
      )}
    </>
  );
};

export default Contact;
