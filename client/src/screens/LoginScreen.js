// @flow
import React, { Component } from "react";
import type { Element, ElementRef } from "react";
import { AsyncStorage } from "react-native";
import { LoginForm } from "AppComponents";
import { RequestProvider, SpinnerProvider } from "AppProviders";
import { ResponseStatuses } from "AppConstants";
import { userLogin } from "AppProxies";
import { startApp } from "AppNavigation";

const { STATUS_OK, STATUS_403 } = ResponseStatuses;

type updateValidations = {
  username: string,
  password: string
};

type Props = {
  navigator: Object,
  showSpinner: Function,
  hideSpinner: Function
};

type State = {
  updateValidations: ?updateValidations
};

class WrappedLoginScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.initializeCallbacks();
    this.state = {
      updateValidations: null
    };
  }

  callbackMap: Object;

  initializeCallbacks = () => {
    const { hideSpinner } = this.props;
    const handleOk = ({ token }: { token: string }) => {
      AsyncStorage.setItem("token", token);
      hideSpinner();
      startApp();
    };
    const handleForbidden = (data: { message: string }) => {
      const { message: password } = data;
      const updateValidations = { password };
      this.setState({ updateValidations });
      hideSpinner();
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
      showSpinner={this.props.showSpinner}
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

export const LoginScreen = SpinnerProvider(WrappedLoginScreen);
