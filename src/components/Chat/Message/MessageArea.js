import React from "react";
import NewMessageForm from "./NewMessageForm";
import "./NewMessageForm.css";

const MessagesArea = ({ conversation: { id, title, messages } }) => {
  const orderedMessages = (messages) => {
    const sortedMessages = messages.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    return sortedMessages.map((message) => {
      return (
        <div className={"messageContent"} key={message.id}>
          {message.text}
        </div>
      );
    });
  };

  return (
    <div className="messagesArea">
      <h2 className="messageTitle">{title}</h2>
      <div className="messageWrapper">{orderedMessages(messages)}</div>
      <NewMessageForm conversation_id={id} />
    </div>
  );
};

export default MessagesArea;

// helpers
