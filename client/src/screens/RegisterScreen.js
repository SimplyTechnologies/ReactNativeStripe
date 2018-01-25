import React, { Component } from "react";
import { Text } from "react-native";
import { RequestProvider } from "AppProviders";
import { RegisterForm } from "AppComponents";

export class RegisterScreen extends Component {
  renderRequestProvider = () => <RegisterForm />;
  render() {
    return <RequestProvider render={this.renderRequestProvider} />;
  }
}
