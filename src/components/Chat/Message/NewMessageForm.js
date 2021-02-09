import React from "react";
import { API_ROOT, HEADERS } from "../../constants";
import "./NewMessageForm.css";

class NewMessageForm extends React.Component {
  state = {
    text: "",
    conversation_id: this.props.conversation_id,
    disableButton: true,
  };

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    console.log(nextProps);
    this.setState({ conversation_id: nextProps.conversation_id });
  };

  handleChange = (e) => {
    this.setState({ text: e.target.value }, () => {
      if (this.state.text.length <= 0) {
        this.setState({ disableButton: true });
      } else {
        this.setState({ disableButton: false });
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.text.length > 0) {
      fetch(`${API_ROOT}/messages`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(this.state),
      });
      this.setState({ text: "" });
      this.setState({ disableButton: true });
    }
  };

  render = () => {
    return (
      <div className="messageForm">
        <form onSubmit={this.handleSubmit}>
          <input
            className="messageInput"
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input
            type="submit"
            className={
              this.state.disableButton
                ? "conversationButton disabled"
                : "conversationButton"
            }
            value="Send"
            disabled={this.state.disableButton}
          />
        </form>
      </div>
    );
  };
}

export default NewMessageForm;
