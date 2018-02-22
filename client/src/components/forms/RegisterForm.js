// @flow

import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FormInput } from "AppComponents";
import { FormHelper } from "AppHelpers";
import { validateRegister } from "AppValidators";
import type { RegisterValidation, CallbackMap } from "AppTypes";

type BadRequestError = {
  errors: {
    username?: { msg: string } | null,
    password?: { msg: string } | null
  }
};
type Props = {
  handleSubmit: (username: string, password: string) => Function,
  callbackMap: CallbackMap,
  showSpinner: Function,
  updateValidations: RegisterValidation
};

type State = {
  values: {
    username: string,
    password: string,
    confirmPassword: string
  },
  validations: RegisterValidation
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

  componentWillReceiveProps(nextProps: Props) {
    const { updateValidations } = nextProps;
    if (updateValidations) {
      this.setState(({ validations: prevValidations }) => {
        const validations = { ...prevValidations, ...updateValidations };
        return { validations };
      });
    }
  }

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
    const { handleSubmit, callbackMap, showSpinner } = this.props;
    const { username, password } = this.state.values;
    if (!this.formHelper.hasValidationErrors()) {
      showSpinner();
      handleSubmit(username, password)(callbackMap);
    }
  };

  registerButtonClickedHandler = () => {
    this.formHelper.validate(this.formSubmitHandler);
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
