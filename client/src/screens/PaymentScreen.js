// @flow
import React, { Component } from "react";
import type { Element } from "react";
import { PaymentForm } from "AppComponents";
import { payWithCard } from "AppProxies";
import { RequestProvider } from "AppProviders";
import { ResponseStatuses } from "AppConstants";
import { withEventHandlers } from "../navigation/withEventHandlers";

const { STATUS_OK } = ResponseStatuses;

type Props = {};

class Payment extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.initializeCallbacks();
  }

  callbackMap: Object;

  initializeCallbacks = () => {
    const handleOk = ({ msg }) => console.log("Payment Message - ", msg);
    this.callbackMap = {
      [STATUS_OK]: handleOk
    };
  };

  renderRequestProvider = (
    handleRequest: Function
  ): Element<typeof PaymentForm> => (
    <PaymentForm handleSubmit={handleRequest} />
  );

  render() {
    return (
      <RequestProvider
        callbackMap={this.callbackMap}
        requestProxy={payWithCard}
        render={this.renderRequestProvider}
      />
    );
  }
}

export const PaymentScreen = withEventHandlers(Payment);
