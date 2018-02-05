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
  updateValidations: any,
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

  componentWillReceiveProps(nextProps: Props) {
    const { updateValidations } = nextProps;
    if (updateValidations) {
      this.setState(({ validations }) => {
        return { ...validations, ...updateValidations };
      });
    }
  }

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
          <TouchableOpacity
            style={styles.button}
            onPress={this.loginButtonClickedHandler}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.registerLinkClickHandler}>
            <Text style={styles.register}>Don't have an account?</Text>
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
    backgroundColor: "black",
    borderRadius: 5
  },
  buttonText: {
    textAlign: "center",
    color: "white"
  },
  register: {
    marginTop: 5,
    fontSize: 16,
    textDecorationLine: "underline"
  }
});