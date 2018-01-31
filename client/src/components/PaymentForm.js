// @flow
import React, { Component } from "react";
import { View, Button, Text, TouchableOpacity, StyleSheet } from "react-native";
import Stripe, { PaymentCardTextField } from "tipsi-stripe";

type Props = {
  handleSubmit: Function,
  buttonTitle: string
};

type State = {
  isValid: boolean,
  params: Object | null,
  notification: string
};

// TODO: Flowify everything deeper
export class PaymentForm extends Component<Props, State> {
  state = {
    isValid: false,
    params: null,
    notification: ""
  };

  fieldParamsChangedHandler = (isValid: boolean, params: Object) => {
    this.setState({ isValid, params });
  };

  payButtonPressedHandler = () => {
    const { isValid, params } = this.state;
    const createToken = Stripe.createTokenWithCard;
    if (isValid) {
      createToken(params).then(this.tokenReceiveHandler);
    }
  };

  tokenReceiveHandler = ({ tokenId }: Object) => {
    const { handleSubmit } = this.props;
    handleSubmit(tokenId);
  };

  render() {
    const { buttonTitle } = this.props;
    const { notification } = this.state;
    return (
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <PaymentCardTextField
            style={styles.cardTextField}
            onParamsChange={this.fieldParamsChangedHandler}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.payButtonPressedHandler}
          >
            <Text style={styles.buttonText}>Pay</Text>
          </TouchableOpacity>
          <Text>{notification}</Text>
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
    width: 300,
    padding: 20,
    borderRadius: 0,
    borderWidth: 0.5,
    borderColor: "black",
    backgroundColor: "#EFEDEB"
  },
  cardTextField: {
    width: 300,
    color: "#449aeb",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5
  },
  button: {
    padding: 10,
    backgroundColor: "black",
    borderRadius: 5
  },
  buttonText: {
    textAlign: "center",
    color: "white"
  }
});
