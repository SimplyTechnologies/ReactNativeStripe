import React, { Component } from "react";
import { Text } from "react-native";
import { RequestProvider } from "AppProviders";
import { RegisterForm } from "AppComponents";

export class RegisterScreen extends Component {
  renderRequestProvider = (requestHandler: Function) => (
    <RegisterForm handleSubmit={requestHandler} />
  );
  render() {
    return <RequestProvider render={this.renderRequestProvider} />;
  }
}
