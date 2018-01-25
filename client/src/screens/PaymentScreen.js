// @flow
import React, { Component } from "react";
import type { Element } from "react";
import { PaymentForm } from "AppComponents";
import { payWithCard } from "AppProxies";
import { RequestProvider } from "AppProviders";
import { ResponseStatuses } from "AppConstants";

const { STATUS_OK } = ResponseStatuses;

type Props = {};

type State = {};

export class PaymentScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.initializeCallbacks();
  }

  initializeCallbacks = () => {
    const handleOk = ({ msg }) => console.log("Payment Message - ", msg);
    this.callbackMap = {
      [STATUS_OK]: handleOk
    };
  };

  renderRequestProvider = (handleRequest: Function): Element<*> => (
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
