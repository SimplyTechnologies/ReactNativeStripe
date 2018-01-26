// @flow
import React, { Component } from "react";
import type { Element } from "react";
import { RegisterForm } from "AppComponents";
import { RequestProvider } from "AppProviders";
import { ResponseStatuses } from "AppConstants";
import { userRegister } from "AppProxies";

const { STATUS_OK } = ResponseStatuses;

export class RegisterScreen extends Component<{}> {
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

  renderRequestProvider = (handleRequest: Function): Element<*> => (
    <RegisterForm handleSubmit={handleRequest} />
  );

  render() {
    return (
      <RequestProvider
        requestProxy={userRegister}
        callbackMap={this.callbackMap}
        render={this.renderRequestProvider}
      />
    );
  }
}
