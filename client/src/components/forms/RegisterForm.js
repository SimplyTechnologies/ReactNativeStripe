// @flow

import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FormInput } from "AppComponents";
import { FormHelper } from "AppHelpers";
import { validateRegister } from "AppValidators";

type BadRequestError = {
  errors: {
    username?: { msg: string } | null,
    password?: { msg: string } | null
  }
};
type Props = {
  handleSubmit: (username: string, password: string) => void
};

type State = {
  values: {
    username: string,
    password: string,
    confirmPassword: string
  },
  validations: {
    username?: string,
    password?: string,
    confirmPassword?: string
  }
};

export class RegisterForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.formHelper = new FormHelper(this, validateRegister);
  }
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

  formHelper: FormHelper;

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

  formSubmitHandler = () => {
    const { handleSubmit } = this.props;
    const { username, password } = this.state.values;
    if (!this.formHelper.hasValidationErrors()) {
      handleSubmit(username, password);
    }
  };

  registerButtonClickedHandler = () => {
    this.formHelper.validate(this.formSubmitHandler);
  };

  handleBadRequest = ({ errors: { username, password } }: BadRequestError) => {
    const usernameErr = username ? username.msg : "";
    const passswordErr = password ? password.msg : "";
    this.setState({
      validations: { username: usernameErr, password: passswordErr }
    });
  };

  render() {
    const { values, validations } = this.state;
    return (
      <View style={styles.formContainer}>
        <View style={styles.form}>
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
          <FormInput
            value={values.confirmPassword}
            placeholder="confirm password"
            handleChange={this.confirmPasswordInputChangedHandler}
            validationMessage={validations.confirmPassword}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.registerButtonClickedHandler}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    width: 300
  },
  button: {
    padding: 10,
    backgroundColor: "#202646",
    borderRadius: 5
  },
  buttonText: {
    textAlign: "center",
    color: "white"
  }
});