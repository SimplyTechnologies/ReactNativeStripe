// @flow
import React, { Component } from "react";
import type { Element } from "react";
import { LoginForm } from "AppComponents";
import { RequestProvider } from "AppProviders";
import { ResponseStatuses } from "AppConstants";
import { userLogin } from "AppProxies";

const { STATUS_OK } = ResponseStatuses;

type Props = {};

type State = {};

export class LoginScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.initializeCallbacks();
  }

  initializeCallbacks = () => {
    const handleOk = () => console.log("OK");
    this.callbackMap = {
      [STATUS_OK]: handleOk
    };
  };

  handleLoginSubmit = () => {};

  renderRequestProvider = (handleRequest: Function): Element<*> => (
    <LoginForm handleSubmit={handleRequest} />
  );

  render() {
    return (
      <RequestProvider
        callbackMap={this.callbackMap}
        requestProxy={userLogin}
        render={this.renderRequestProvider}
      />
    );
  }
}
