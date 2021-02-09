import React from "react";
import ReactDOM from "react-dom";
import { ActionCableProvider } from "react-actioncable-provider-refurbished";
import ActionCable from "actioncable";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { API_WS_ROOT } from "./constants";

const cable = ActionCable.createConsumer(API_WS_ROOT);

ReactDOM.render(
  <ActionCableProvider cable={cable}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ActionCableProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
