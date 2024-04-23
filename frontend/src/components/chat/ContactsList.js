import React from "react";
import useGetConversations from "../../hooks/useGetConversations";
import Contact from "./Contact";

const ContactsList = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <>
      <div className="chat-contact-container">
        {conversations &&
          conversations.map((conversation, idx) => (
            <Contact
              key={conversation._id}
              conversation={conversation}
              lastIdx={idx === conversations.length - 1}
            />
          ))}
      </div>
    </>
  );
};

export default ContactsList;
