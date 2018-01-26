// @flow
import React, { Component } from "react";
import type { Element } from "react";
import { RegisterForm } from "AppComponents";
import { RequestProvider } from "AppProviders";
import { ResponseStatuses } from "AppConstants";
import { userRegister } from "AppProxies";
import { AsyncStorage } from "react-native";

const { STATUS_OK } = ResponseStatuses;

export class RegisterScreen extends Component<{}> {
  constructor(props) {
    super(props);
    this.initializeCallbacks();
  }

  initializeCallbacks = () => {
    const handleOk = ({ token }: { token: string }): void =>
      AsyncStorage.setItem("token", token);
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
