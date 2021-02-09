import React, { Component, Fragment } from "react";
import { ActionCableConsumer } from "react-actioncable-provider-refurbished";
import { API_ROOT } from "../constants/index";
import NewConversationForm from "./NewConversationForm";
import MessageArea from "./MessageArea";
import Cable from "./Cable";
import "./ConversationList.css";
import moment from "moment";

export class ConversationsList extends Component {
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

  formatDate = (date) => {
    return moment(date).format("MMM DD");
  };

  mapConversations = (conversations, handleClick) => {
    return conversations.map((conversation, index) => {
      return (
        <li
          className={this.state.activeindex === index ? "active" : ""}
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
                {this.formatDate(
                  conversation.messages[conversation.messages.length - 1]
                    .created_at
                )}
              </span>
            </div>
          ) : (
            <div className="conversationMessagesContainer">
              <p className="conversationText"></p>
              <span className="conversationDate"></span>
            </div>
          )}
        </li>
      );
    });
  };

  findActiveConversation = (conversations, activeConversation) => {
    let conf = conversations.find(
      (conversation) => conversation.id === activeConversation
    );
    console.log("conf find", conf);
    return conf;
  };

  render() {
    const { conversations, activeConversation } = this.state;

    return (
      <div className="container">
        <div className="conversations">
          <ActionCableConsumer
            channel={{ channel: "ConversationsChannel" }}
            onReceived={this.handleReceivedConversation}
          />
          {this.state.conversations.length ? (
            <Cable
              conversations={conversations}
              handleReceivedMessage={this.handleReceivedMessage}
            />
          ) : null}

          <ul className="conversationList">
            {this.mapConversations(conversations, this.handleClick)}
          </ul>
          <NewConversationForm />
        </div>
        <div className="messages">
          {activeConversation ? (
            <MessageArea
              conversation={this.findActiveConversation(
                conversations,
                activeConversation
              )}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default ConversationsList;
