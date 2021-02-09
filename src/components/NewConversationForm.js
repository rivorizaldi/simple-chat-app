import React, { Component } from "react";
import { API_ROOT, HEADERS } from "../constants";
import "./NewConversationForm.css";

export class NewConversationForm extends Component {
  state = {
    title: "",
    disableButton: true,
  };

  handleChange = (e) => {
    this.setState({ title: e.target.value }, () => {
      if (this.state.title.length <= 0) {
        this.setState({ disableButton: true });
      } else {
        this.setState({ disableButton: false });
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.title.length > 0) {
      fetch(`${API_ROOT}/conversations`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(this.state),
      }).then(() => {
        this.setState({ title: "" });
        this.setState({ disableButton: true });
      });
    }
  };

  render() {
    return (
      <div className="conversationForm">
        <form onSubmit={this.handleSubmit}>
          <input
            className="conversationInput"
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
            placeholder="New Chat"
          />
          <input
            className={
              this.state.disableButton
                ? "conversationButton disabled"
                : "conversationButton"
            }
            type="submit"
            value="Add"
            disabled={this.state.disableButton}
          />
        </form>
      </div>
    );
  }
}

export default NewConversationForm;
