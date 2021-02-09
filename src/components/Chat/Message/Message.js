import React from "react";
import "./Message.css";
import MessageArea from "./MessageArea"

const Message = ({ activeConversation, conversations }) => {
  const findActiveConversation = (conversations, activeConversation) => {
    return conversations.find(
      (conversation) => conversation.id === activeConversation
    );
  };

  return (
    <div className="messages">
      {activeConversation ? (
        <MessageArea
          conversation={findActiveConversation(
            conversations,
            activeConversation
          )}
        />
      ) : null}
    </div>
  );
};

export default Message;
