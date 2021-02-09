import React, { Fragment } from "react";
import { ActionCableConsumer } from "react-actioncable-provider-refurbished";

const Cable = ({
  channel,
  conversations,
  handleReceivedMessage,
  handleReceivedConversation,
}) => {
  const actionCable = (channel) => {
    switch (channel) {
      case "ConversationsChannel":
        return (
          <ActionCableConsumer
            channel={{ channel }}
            onReceived={handleReceivedConversation}
          />
        );
      case "MessagesChannel":
        return (
          <Fragment>
            {conversations.map((conversation) => {
              return (
                <ActionCableConsumer
                  key={conversation.id}
                  channel={{
                    channel,
                    conversation: conversation.id,
                  }}
                  onReceived={handleReceivedMessage}
                />
              );
            })}
          </Fragment>
        );
      default:
        return null;
    }
  };

  return actionCable(channel);
};

export default Cable;
