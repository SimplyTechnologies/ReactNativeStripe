// @flow

import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 10,
    backgroundColor: "#202646",
    borderRadius: 5
  },
  textStyle: {
    textAlign: "center",
    color: "white"
  }
});

type Props = {};

type State = {
  username: string,
  password: string,
  confirmPassword: string
};

export class RegisterForm extends Component<Props, State> {
  state = {
    username: "",
    password: "",
    confirmPassword: ""
  };

  inputChangedHandler = (name: string, value: string) => {
    this.setState({ [name]: value });
  };
  render() {
    const { username, password, confirmPassword } = this.state;
    return (
      <View>
        <TextInput
          placeholder="username"
          value={username}
          onChangeText={this.inputChangedHandler.bind(null, "username")}
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={this.inputChangedHandler.bind(null, "password")}
        />
        <TextInput
          placeholder="confirm password"
          value={confirmPassword}
          onChangeText={this.inputChangedHandler.bind(null, "confirmPassword")}
        />
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
