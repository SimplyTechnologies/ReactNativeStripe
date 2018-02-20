// @flow
import React, { Component } from "react";
import type { Element, ElementRef } from "react";
import { RegisterForm } from "AppComponents";
import { RequestProvider, SpinnerProvider } from "AppProviders";
import { ResponseStatuses } from "AppConstants";
import { userRegister } from "AppProxies";
import { AsyncStorage } from "react-native";
import { startApp } from "AppNavigation";

const { STATUS_OK, STATUS_400 } = ResponseStatuses;

type Props = {
  showSpinner: Function,
  hideSpinner: Function
};

type State = {
  updateValidations: any
};

class WrappedRegisterScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.initializeCallbacks();
  }
  state = {
    updateValidations: null
  };

  initializeCallbacks = () => {
    const { hideSpinner } = this.props;
    const handleOk = ({ token }: { token: string }) => {
      AsyncStorage.setItem("token", token);
      hideSpinner();
      startApp();
    };

    const handleBadRequest = ({ errors }: any) => {
      const { username: { msg: username } } = errors;
      const updateValidations = {
        username
      };
      this.setState({ updateValidations });
      hideSpinner();
    };

    this.callbackMap = {
      [STATUS_OK]: handleOk,
      [STATUS_400]: handleBadRequest
    };
  };

  renderRequestProvider = (
    handleRequest: Function
  ): Element<typeof RegisterForm> => (
    <RegisterForm
      updateValidations={this.state.updateValidations}
      showSpinner={this.props.showSpinner}
      handleSubmit={handleRequest}
      callbackMap={this.callbackMap}
    />
  );

  render() {
    return (
      <RequestProvider
        requestProxy={userRegister}
        render={this.renderRequestProvider}
      />
    );
  }
}

export const RegisterScreen = SpinnerProvider(WrappedRegisterScreen);
