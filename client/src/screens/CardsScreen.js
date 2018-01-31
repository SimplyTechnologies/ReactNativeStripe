// @flow
import React, { Component } from "react";
import type { Element } from "react";
import {
  InitEventHandlers,
  RequestProvider,
  ModalProvider
} from "AppProviders";
import { getCards } from "AppProxies";
import { CardsList } from "AppComponents";
import { ResponseStatuses, ModalTypes } from "AppConstants";
import type { Card } from "../types";

const { STATUS_OK } = ResponseStatuses;
const { ADD_CARD } = ModalTypes;

type Props = {
  navigator: any
};

type State = {
  cards: Array<Card>,
  loading: boolean
};

class WrappedCardsScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      cards: []
    };
    this.initializeCallbacks(this);
  }

  componentDidMount() {
    setTimeout(() => this.props.openModal(ADD_CARD, {}), 2000);
  }

  callbackMap: Object;
  initializeCallbacks = (context: any) => {
    const handleOk = (data: Array<Card>) => {
      context.setState({ cards: data, loading: false });
    };
    this.callbackMap = {
      [STATUS_OK]: handleOk
    };
  };

  removeDeletedCard = ({ deletedCardId }: { deletedCardId: string }) => {
    this.setState(({ cards }: State): { cards: Card[] } => ({
      cards: cards.filter((card: Card): boolean => card.id !== deletedCardId)
    }));
  };

  renderRequestProvider = (
    handleRequest: Function
  ): Element<typeof CardsList> => (
    <CardsList
      removeDeletedCard={this.removeDeletedCard}
      getCards={handleRequest}
      cards={this.state.cards}
      loading={this.state.loading}
    />
  );

  render() {
    return (
      <RequestProvider
        render={this.renderRequestProvider}
        requestProxy={getCards}
        callbackMap={this.callbackMap}
      />
    );
  }
}

export const CardsScreen = InitEventHandlers(ModalProvider(WrappedCardsScreen));
