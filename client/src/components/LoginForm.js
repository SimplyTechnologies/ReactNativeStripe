// @flow
import React, { Component } from "react";
import { View, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FormInput } from "AppComponents";
import { FormHelper } from "AppHelpers";
import { validateLogin } from "AppValidators";
import {
  REGISTER_SCREEN,
  REGISTER_SCREEN_TITLE
} from "../navigation/constants";

type Props = {
  handleSubmit: (username: string, password: string) => void,
  navigator: any
};

type State = {
  values: {
    username: string,
    password: string
  },
  validations: {
    username?: string,
    password?: string
  }
};

export class LoginForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.formHelper = new FormHelper(this, validateLogin);
  }
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
  formHelper: FormHelper;

  handleForbiddenResponse = ({ message }: { message: string }) => {
    this.setState({ validations: { password: message } });
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

  formSubmitHandler = () => {
    console.log("ON SUBMIT");
    const { handleSubmit } = this.props;
    const { username, password } = this.state.values;
    if (!this.formHelper.hasValidationErrors()) {
      handleSubmit(username, password);
    }
  };

  loginButtonClickedHandler = () => {
    this.formHelper.validate(this.formSubmitHandler);
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
          secureTextEntry
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
