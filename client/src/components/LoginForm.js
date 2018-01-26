// @flow
import React, { Component } from "react";
import { View, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FormInput } from "AppComponents";
import { validateLogin } from "AppValidators";
import {
  REGISTER_SCREEN,
  REGISTER_SCREEN_TITLE
} from "../navigation/constants";

type Props = {
  handleSubmit: Function,
  navigator: any
};

type State = {
  values: {
    username: string,
    password: string
  },
  validations: {
    username: string,
    password: string
  }
};

export class LoginForm extends Component<Props, State> {
  state = {
    values: {
      username: "",
      password: ""
    },
    validations: {
      username: "",
      password: ""
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

  validate = (callback: Function): any =>
    this.setState(
      ({ values }: any): any => ({
        validations: validateLogin(values)
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

  formSubmitHandler = () => {
    const { handleSubmit } = this.props;
    const { username, password } = this.state.values;
    if (!this.hasValidationErrors()) {
      handleSubmit(username, password);
    }
  };

  loginButtonClickedHandler = () => {
    this.validate(this.formSubmitHandler);
  };

  registerLinkClickHandler = () => {
    this.props.navigator.push({
      screen: REGISTER_SCREEN,
      title: REGISTER_SCREEN_TITLE
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
