// @flow
import React, { Component } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import {
  REGISTER_SCREEN,
  REGISTER_SCREEN_TITLE
} from "../navigation/constants";

type Props = {
  handleSubmit: Function,
  navigator: any
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

  registerLinkClickHandler = () => {
    this.props.navigator.push({
      screen: REGISTER_SCREEN,
      title: REGISTER_SCREEN_TITLE
    });
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
        <TouchableOpacity onPress={this.registerLinkClickHandler}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
