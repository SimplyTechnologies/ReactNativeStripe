// @flow
import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

type Props = {
  handleSubmit: Function
};

type State = {
  username: string,
  password: string
};

export class LoginForm extends Component<Props, State> {
  state = {
    username: "",
    password: ""
  };

  usernameInputChangedHandler = (username: string) => {
    this.setState({ username });
  };

  passwordInputChangedHandler = (password: string) => {
    this.setState({ password });
  };

  loginButtonClickedHandler = () => {
    const { username, password } = this.state;
    const { handleSubmit } = this.props;
    handleSubmit(username, password);
  };

  render() {
    const { username, password } = this.state;
    return (
      <View>
        <TextInput
          placeholder="Login"
          value={username}
          onChangeText={this.usernameInputChangedHandler}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={this.passwordInputChangedHandler}
        />
        <Button
          title="Login"
          color="black"
          onPress={this.loginButtonClickedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
