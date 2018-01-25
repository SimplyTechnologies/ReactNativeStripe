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
      submit: {
        [STATUS_OK]: handleOk
      }
    };
    this.requestProxyMap = {
      submit: userLogin
    };
  };

  handleLoginSubmit = () => {};

  renderRequestProvider = (handleRequest: Function): Element<*> => (
    <LoginForm handleSubmit={handleRequest} navigator={this.props.navigator} />
  );

  render() {
    return (
      <RequestProvider
        requestProxyMap={this.requestProxyMap}
        callbackMap={this.callbackMap}
        render={this.renderRequestProvider}
      />
    );
  }
}
