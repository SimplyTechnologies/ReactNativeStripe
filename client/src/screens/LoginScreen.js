// @flow
import React, { Component } from "react";
import type { Element, ElementRef } from "react";
import { AsyncStorage } from "react-native";
import { LoginForm } from "AppComponents";
import { RequestProvider } from "AppProviders";
import { ResponseStatuses } from "AppConstants";
import { userLogin } from "AppProxies";
import { startApp } from "AppNavigation";

const { STATUS_OK, STATUS_403 } = ResponseStatuses;

type Props = {
  navigator: any
};

type State = {
  updateValidations: any
};

export class LoginScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.initializeCallbacks();
    this.state = {
      updateValidations: null
    };
  }

  callbackMap: Object;

  initializeCallbacks = () => {
    const handleOk = ({ token }: { token: string }) => {
      AsyncStorage.setItem("token", token);
      startApp();
    };
    const handleForbidden = (data: { message: string }) => {
      const { message: password } = data;
      const updateValidations = { password };
      this.setState({ updateValidations });
    };
    this.callbackMap = {
      [STATUS_OK]: handleOk,
      [STATUS_403]: handleForbidden
    };
  };

  renderRequestProvider = (
    handleRequest: Function
  ): Element<typeof LoginForm> => (
    <LoginForm
      callbackMap={this.callbackMap}
      handleSubmit={handleRequest}
      navigator={this.props.navigator}
      updateValidations={this.state.updateValidations}
    />
  );

  render() {
    return (
      <RequestProvider
        requestProxy={userLogin}
        render={this.renderRequestProvider}
      />
    );
  }
}
