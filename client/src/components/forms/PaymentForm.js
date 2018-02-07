// @flow
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Stripe, { PaymentCardTextField } from "tipsi-stripe";
import { PaymentButton } from "AppButtons";

type Props = {
  message: string,
  payWithToken: Function,
  callbackMap: Object
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
        <Text>{message}</Text>
        <PaymentButton payButtonPressedHandler={this.payButtonPressedHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
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
