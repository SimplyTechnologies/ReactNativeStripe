// @flow
import React, { Component } from "react";
import type { Element } from "react";
import { AsyncStorage } from "react-native";
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
    const handleOk = ({ token }: { token: string }): void =>
      AsyncStorage.setItem("token", token);
    this.callbackMap = {
      [STATUS_OK]: handleOk
    };
  };

  renderRequestProvider = (handleRequest: Function): Element<*> => (
    <LoginForm handleSubmit={handleRequest} navigator={this.props.navigator} />
  );

  render() {
    return (
      <RequestProvider
        requestProxy={userLogin}
        callbackMap={this.callbackMap}
        render={this.renderRequestProvider}
      />
    );
  }
}
