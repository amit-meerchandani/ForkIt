import React from "react";

function ContactSearchInput() {
  return (
    <div className="chat-contact-search">
      <input
        type="text"
        className="chat-search-input"
        placeholder="Search..."
      />
      <button className="chat-search-button">Search</button>
    </div>
  );
}

export default ContactSearchInput;
