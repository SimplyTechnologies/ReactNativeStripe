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

class WrappedRegisterScreen extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.initializeCallbacks();
  }
  _form: Element<typeof RegisterForm>;
  callbackMap: Object;

  initializeCallbacks = () => {
    const { hideSpinner } = this.props;
    const handleOk = ({ token }: { token: string }) => {
      AsyncStorage.setItem("token", token);
      hideSpinner();
      startApp();
    };

    const handleBadRequest = (data: any) => {
      if (this._form) {
        this._form.handleBadRequest(data);
      }
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
      showSpinner={this.props.showSpinner}
      handleSubmit={handleRequest}
      callbackMap={this.callbackMap}
      ref={(form: ElementRef<typeof RegisterForm>): void => (this._form = form)}
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
