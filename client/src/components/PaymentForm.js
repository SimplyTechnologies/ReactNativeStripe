// @flow
import React, { Component } from "react";
import { View, Button, Text, TouchableOpacity, StyleSheet } from "react-native";
import Stripe, { PaymentCardTextField } from "tipsi-stripe";

type Props = {
  handleSubmit: Function,
  message: string,
  style: Object
};

type State = {
  isValid: boolean,
  params: Object | null
};

// TODO: Flowify everything deeper
export class PaymentForm extends Component<Props, State> {
  state = {
    isValid: false,
    params: null
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
    const { message, style } = this.props;
    return (
      <View style={style}>
        <View stle={styles.header}>
          <Text>Pay with card</Text>
        </View>
        <View style={styles.form}>
          <PaymentCardTextField
            style={styles.cardTextField}
            onParamsChange={this.fieldParamsChangedHandler}
          />
          <Text>{message}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={this.payButtonPressedHandler}
          >
            <Text style={styles.buttonText}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {},
  cardTextField: {
    width: 300,
    marginTop: 20,
    marginBottom: 20
  },
  notification: {},
  button: {
    backgroundColor: "blue",
    borderRadius: 5,
    width: 50
  },
  buttonText: {
    textAlign: "center",
    color: "white"
  }
});
