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

type State = {};

export class LoginScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.initializeCallbacks();
  }

  _form: ?Element<typeof LoginForm>;
  callbackMap: Object;

  initializeCallbacks = () => {
    const handleOk = ({ token }: { token: string }) => {
      AsyncStorage.setItem("token", token);
      startApp();
    };
    const handleForbiddenRequest = (data: { message: string }) => {
      if (this._form) {
        this._form.handleForbiddenRequest(data);
      }
    };
    this.callbackMap = {
      [STATUS_OK]: handleOk,
      [STATUS_403]: handleForbiddenRequest
    };
  };

  renderRequestProvider = (
    handleRequest: Function
  ): Element<typeof LoginForm> => (
    <LoginForm
      handleSubmit={handleRequest}
      navigator={this.props.navigator}
      ref={(form: ElementRef<typeof LoginForm>): void => (this._form = form)}
    />
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
