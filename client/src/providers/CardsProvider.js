//@flow
import React, { Component } from "react";
import { View } from "react-native";
import { Loading } from "AppComponents";
import { RequestProvider } from "AppProviders";
import { getCards } from "AppProxies";
import { ResponseStatuses } from "AppConstants";
import type { Card } from "../types";

const { STATUS_OK } = ResponseStatuses;

type Props = {
  render: Function
};

type State = {
  cards: Array
};

export class CardsProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cards: null
    };
    this.initializeCallbacks();
  }

  initializeCallbacks = () => {
    const handleOk = cards => this.setState({ cards });
    this.callbackMap = {
      [STATUS_OK]: handleOk
    };
  };

  renderRequestProvider = (getCardsRequest: Function) => {
    getCardsRequest();
    return <Loading />;
  };

  renderPending = () => (
    <RequestProvider
      render={this.renderRequestProvider}
      requestProxy={getCards}
      callbackMap={this.callbackMap}
    />
  );

  renderChildren = () => {
    const { render } = this.props;
    const { cards } = this.state;
    return render(cards);
  };

  render() {
    const { cards } = this.state;
    return cards ? this.renderChildren() : this.renderPending();
  }
}
