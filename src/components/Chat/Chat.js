import React, { Component } from "react";
import { API_ROOT } from "../../constants/index";
import Cable from "../../provider/Cable";
import "./Chat.css";
import Conversation from "../Conversation/Conversation";
import Message from "../Message/Message";

export class Chat extends Component {
  state = {
    conversations: [],
    activeConversation: null,
    activeindex: 0,
  };

  componentDidMount = () => {
    fetch(`${API_ROOT}/conversations`)
      .then((res) => {
        return res.json();
      })
      .then((conversations) => {
        this.setState({ conversations });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleClick = (id, index) => {
    this.setState({ activeConversation: id, activeindex: index });
  };

  handleReceivedConversation = (response) => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation],
    });
  };

  handleReceivedMessage = (response) => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      (conversation) => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    this.setState({ conversations });
  };

  cable = (
    channel,
    conversations,
    handleReceivedConversation,
    handleReceivedMessage
  ) => {
    return (
      <Cable
        conversations={conversations}
        channel={channel}
        handleReceivedMessage={handleReceivedMessage}
        handleReceivedConversation={handleReceivedConversation}
      />
    );
  };

  render() {
    const { conversations, activeConversation } = this.state;

    return (
      <div className="container">
        {/* Cable for subscribing channel */}
        {this.cable(
          "ConversationsChannel",
          conversations,
          this.handleReceivedConversation,
          this.handleReceivedMessage
        )}
        {this.state.conversations.length
          ? this.cable(
              "MessagesChannel",
              conversations,
              this.handleReceivedConversation,
              this.handleReceivedMessage
            )
          : null}
        {/* Cable End Here */}
        {/* Conversation Component */}
        <Conversation
          conversations={this.state.conversations}
          handleClick={this.handleClick}
          activeIndex={this.state.activeindex}
        />
        {/* Conversation Component End Here */}
        {/* Message Component */}
        {activeConversation ? (
          <Message
            activeConversation={activeConversation}
            conversations={conversations}
          />
        ) : null}
        {/* Message Component End Here */}
      </div>
    );
  }
}

export default Chat;
