// @flow
import React, { Component } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import Stripe, { PaymentCardTextField } from "tipsi-stripe";

type Props = {
  handleSubmit: Function
};

type State = {
  isValid: boolean,
  params: object,
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
    const { notification } = this.state;
    return (
      <View>
        <PaymentCardTextField
          style={styles.cardTextField}
          onParamsChange={this.fieldParamsChangedHandler}
        />
        <Button
          title="Pay"
          onPress={this.payButtonPressedHandler}
          style={styles.payButon}
          color="black"
        />
        <Text>{notification}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardTextField: {
    width: 300,
    color: "#449aeb",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5
  },
  payButon: {
    width: 100
  }
});
