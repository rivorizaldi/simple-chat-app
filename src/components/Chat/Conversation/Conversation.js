import React from "react";
import NewConversationForm from "./NewConversationForm";
import EmptyConversation from "./EmptyConversation";
import "./Conversation.css";
import { formatDate } from "../../utility/utility";

const Conversation = ({ conversations, handleClick, activeIndex }) => {
  const mapConversations = (conversations, handleClick, activeIndex) => {
    return conversations.map((conversation, index) => {
      return (
        <li
          className={activeIndex === index ? "active" : ""}
          key={conversation.id}
          onClick={() => {
            handleClick(conversation.id, index);
          }}
        >
          <h2 className="conversationTitle">{conversation.title}</h2>
          {conversation.messages.length > 0 ? (
            <div className="conversationMessagesContainer">
              <p className="conversationText">
                {conversation.messages[conversation.messages.length - 1].text}
              </p>
              <span className="conversationDate">
                {formatDate(
                  conversation.messages[conversation.messages.length - 1]
                    .created_at
                )}
              </span>
            </div>
          ) : (
            <EmptyConversation />
          )}
        </li>
      );
    });
  };

  return (
    <div className="conversations">
      <ul className="conversationList">
        {mapConversations(conversations, handleClick, activeIndex)}
      </ul>
      <NewConversationForm />
    </div>
  );
};

export default Conversation;
