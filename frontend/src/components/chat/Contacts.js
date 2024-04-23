import React from "react";
import ContactSearchInput from "./ContactSearchInput";
import ContactsList from "./ContactsList";

const Contacts = () => {
  return (
    <div className="chat-contacts">
      <i className="fas fa-bars fa-2x"></i>
      <h2>Contacts</h2>
      <ContactSearchInput />
      <ContactsList />
    </div>
  );
};

export default Contacts;
