// @flow
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Stripe, { PaymentCardTextField } from "tipsi-stripe";
import { PaymentButton } from "AppButtons";
import type { CallbackMap } from "AppTypes";

type Props = {
  message: string,
  payWithToken: Function,
  callbackMap: CallbackMap,
  showSpinner: ?Function
};

type State = {
  isValid: boolean,
  params: ?Object
};

const EMPTY_FUNCTION = () => {};

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
    const { showSpinner } = this.props;
    const { isValid, params } = this.state;
    const createToken = Stripe.createTokenWithCard;
    const spin = showSpinner || EMPTY_FUNCTION;
    if (isValid) {
      spin();
      createToken(params).then(this.tokenReceiveHandler);
    }
  };

  tokenReceiveHandler = ({ tokenId }: Object) => {
    const { payWithToken, callbackMap } = this.props;
    payWithToken(tokenId)(callbackMap);
  };

  render() {
    const { message } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Pay with card form</Text>
        <PaymentCardTextField
          style={styles.cardTextField}
          onParamsChange={this.fieldParamsChangedHandler}
        />
        <Text>{message.length ? message : " "}</Text>
        <PaymentButton payButtonPressedHandler={this.payButtonPressedHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontSize: 25,
    marginTop: 10
  },
  cardTextField: {
    width: 300,
    marginTop: 20,
    marginBottom: 20
  }
});
