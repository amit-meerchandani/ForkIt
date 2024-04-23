import React from "react";
import { useSelector } from "react-redux";

const NoChatSelected = () => {
  const { error, loading, user } = useSelector((state) => state.user);

  return (
    <div className="no-chat-selected">
      <div>
        <div className="message">
          <p>
            Welcome <span className="username">{user.name}</span> 👋❄
          </p>
          <p>Select a chat to start messaging</p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
