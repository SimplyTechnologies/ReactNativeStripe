//@flow
import React, { Component } from "react";
import { View } from "react-native";
import { Loading } from "AppComponents";
import { RequestProvider } from "AppProviders";
import { getCards, deleteCard } from "AppProxies";
import { ResponseStatuses } from "AppConstants";
import type { Card } from "../types";

const { STATUS_OK } = ResponseStatuses;

type Props = {
  render: Function
};

type State = {
  cards: Array,
  requests: any
};

export class CardsProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cards: null,
      requests: null
    };
    this.initializeDeleteCardCallbacks();
    this.initializeGetCardsCallbacks();
    this.initializeMap();
  }

  initializeMap = () => {
    const proxyMap = new Map();
    proxyMap.set(getCards, this.getCardsCallbacks);
    proxyMap.set(deleteCard, this.deleteCardCallbacks);
  };

  initializeGetCardsCallbacks = () => {
    const handleOk = cards => this.setState({ cards });
    this.getCardsCallbacks = {
      [STATUS_OK]: handleOk
    };
  };

  initializeDeleteCardCallbacks = () => {
    const handleOk = () => this.removeCard();
    this.deleteCardCallbacks = {
      [STATUS_OK]: handleOk
    };
  };

  removeCard = () => {};

  renderRequestProvider = (requests: any) => {
    requests.getCards();
    this.setState({ requests });
    return <Loading />;
  };

  renderPending = () => (
    <RequestProvider
      render={this.renderRequestProvider}
      requestProxy={this.proxyMap}
    />
  );

  renderChildren = () => {
    const { render } = this.props;
    const { cards, requests } = this.state;
    return render(cards, requests);
  };

  render() {
    const { cards } = this.state;
    return cards ? this.renderChildren() : this.renderPending();
  }
}
