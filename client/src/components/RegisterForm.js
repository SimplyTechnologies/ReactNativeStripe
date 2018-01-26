// @flow

import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { validateUtils } from "AppUtils";
import {
  REQUIRED,
  MIN_LENGTH,
  USERNAME_MIN_LENGTH,
  PASSWRD_MIN_LENGTH,
  PASSWORD_NOT_MATCH
} from "AppConstants";

const { isEmpty, isLength, matches } = validateUtils;

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

type Props = {
  handleSubmit: Function
};

type State = {
  formValues: {
    username: string,
    password: string,
    confirmPassword: string
  },
  errorMessages: {
    username: string,
    password: string,
    confirmPassword: string
  }
};

export class RegisterForm extends Component<Props, State> {
  state = {
    formValues: {
      username: "",
      password: "",
      confirmPassword: ""
    },
    errorMessages: {
      username: "",
      password: "",
      confirmPassword: ""
    }
  };

  inputChangedHandler = (name: string, value: string) => {
    const formValues = Object.assign({}, this.state.formValues);
    formValues[name] = value;
    this.setState({ formValues });
  };

  validate = (name: string, value: string): string => {
    switch (name) {
      case "username":
        if (isEmpty(value)) {
          return REQUIRED(name);
        } else if (isLength(value, { min: USERNAME_MIN_LENGTH })) {
          return MIN_LENGTH(name, USERNAME_MIN_LENGTH);
        }
        return "";

      case "password":
        if (isEmpty(value)) {
          return REQUIRED(name);
        } else if (isLength(value, { min: PASSWRD_MIN_LENGTH })) {
          return MIN_LENGTH(name, USERNAME_MIN_LENGTH);
        }
        return "";

      case "confirmPassword":
        if (isEmpty(value)) {
          return REQUIRED(name);
        } else if (!matches(value, this.state.formValues.password)) {
          return PASSWORD_NOT_MATCH;
        }
        return "";
      default:
        return "";
    }
  };

  hasValidationErrors(): boolean {
    const errorMessages = Object.keys(this.state.formValues).reduce(
      (result: any, key: string): any => {
        result[key] = this.validate(key, this.state.formValues[key]);
        return result;
      },
      {}
    );
    if (Object.values(errorMessages).join("")) {
      this.setState({
        errorMessages
      });
      return true;
    }
    return false;
  }
  registerButtonClickedHandler = () => {
    const { handleSubmit } = this.props;
    const { username, password, confirmPassword } = this.state.formValues;
    if (!this.hasValidationErrors()) {
      handleSubmit(username, password, confirmPassword);
    }
  };

  render() {
    const { username, password, confirmPassword } = this.state.formValues;
    return (
      <View>
        <TextInput
          placeholder="username"
          value={username}
          onChangeText={this.inputChangedHandler.bind(null, "username")}
        />
        <Text>{this.state.errorMessages.username}</Text>
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={this.inputChangedHandler.bind(null, "password")}
        />
        <Text>{this.state.errorMessages.password}</Text>
        <TextInput
          placeholder="confirm password"
          value={confirmPassword}
          onChangeText={this.inputChangedHandler.bind(null, "confirmPassword")}
        />
        <Text>{this.state.errorMessages.confirmPassword}</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.registerButtonClickedHandler}
        >
          <Text style={styles.textStyle}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
