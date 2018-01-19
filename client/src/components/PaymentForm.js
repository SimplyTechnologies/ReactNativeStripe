import React, { Component } from "react";
import { View, Button, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Stripe, { PaymentCardTextField } from "tipsi-stripe";
import { paymentProxy } from "AppProxies";
import { fetchUtils } from "AppUtils";
import { ResponseStatuses } from "AppConstants";

const { requestHandler } = fetchUtils;
const { STATUS_OK } = ResponseStatuses;

// TODO: Flowify everything
export class PaymentForm extends Component {
  static propTypes = {};

  state = {
    isValid: false,
    params: null,
    notification: ""
  };

  callbackMap = {
    [STATUS_OK]: ({ msg: notification }) => this.setState({ notification })
  };

  fieldParamsChangedHandler = (isValid, params) => {
    this.setState({ isValid, params });
  };

  payButtonPressedHandler = () => {
    const { isValid, params } = this.state;
    const { payWithCard } = paymentProxy;
    if (isValid) {
      Stripe.createTokenWithCard(params).then(res => {
        const { tokenId } = res;
        const payWithCardRequest = payWithCard(tokenId);
        requestHandler(payWithCardRequest, this.callbackMap);
      });
    }
  };

  render() {
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
