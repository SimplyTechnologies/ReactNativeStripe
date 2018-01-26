// @flow

import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FormInput } from "AppComponents";
import { validateRegister } from "AppValidators";

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
  values: {
    username: string,
    password: string,
    confirmPassword: string
  },
  validations: {
    username: string,
    password: string,
    confirmPassword: string
  }
};

export class RegisterForm extends Component<Props, State> {
  state = {
    values: {
      username: "",
      password: "",
      confirmPassword: ""
    },
    validations: {
      username: "",
      password: "",
      confirmPassword: ""
    }
  };

  usernameInputChangedHandler = (username: string) => {
    const values = { ...this.state.values };
    values.username = username;
    this.setState({ values });
  };

  passwordInputChangedHandler = (password: string) => {
    const values = { ...this.state.values };
    values.password = password;
    this.setState({ values });
  };

  confirmPasswordInputChangedHandler = (confirmPassword: string) => {
    const values = { ...this.state.values };
    values.confirmPassword = confirmPassword;
    this.setState({ values });
  };

  validate = (callback: Function): any =>
    this.setState(
      ({ values }: any): any => ({
        validations: validateRegister(values)
      }),
      callback
    );

  hasValidationErrors = (): boolean => {
    const { validations } = this.state;
    const keys = Object.keys(validations);
    let hasError = false;
    keys.forEach((key: string) => {
      // hasError should be true if at least one field is invalid
      const isError = validations[key].length > 0;
      hasError = hasError || isError;
    });
    return hasError;
  };

  registerButtonClickedHandler = () => {
    this.validate(() => {
      const { handleSubmit } = this.props;
      const { username, password } = this.state.values;
      if (!this.hasValidationErrors()) {
        handleSubmit(username, password);
      }
    });
  };

  render() {
    const { values, validations } = this.state;
    return (
      <View>
        <FormInput
          autoFocus
          value={values.username}
          placeholder="username"
          handleChange={this.usernameInputChangedHandler}
          validationMessage={validations.username}
        />
        <FormInput
          value={values.password}
          placeholder="password"
          handleChange={this.passwordInputChangedHandler}
          validationMessage={validations.password}
        />
        <FormInput
          value={values.confirmPassword}
          placeholder="confirm password"
          handleChange={this.confirmPasswordInputChangedHandler}
          validationMessage={validations.confirmPassword}
        />
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
