// @flow
import React, { Component } from "react";
import { View } from "react-native";
import { CardsList, Loading } from "AppComponents";
import { ResponseStatuses } from "AppConstants";
import type { Card } from "AppTypes";

type Props = {
  newCard: Card,
  removeNewCard: Function,
  getCards: Function,
  deleteCard: Function
};

type State = {
  cards: any
};

const { STATUS_OK } = ResponseStatuses;

export class CardsContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { cards: null };
    this.callbacks = {};
    this.initializeGetCardCallbacks();
    this.initializeDeleteCardCallbacks();
  }

  componentWillReceiveProps(nextProps: Props) {
    const { newCard, removeNewCard } = nextProps;
    if (newCard) {
      this.addCard(newCard);
      removeNewCard();
    }
  }

  componentDidMount() {
    const { getCards } = this.props;
    const { getCards: getCardsCallbacks } = this.callbacks;
    this.props.getCards()(getCardsCallbacks);
  }

  getCardIndexById = (id: string) => {
    const { cards } = this.state;
    let index = -1;
    cards.forEach((card, iteration) => {
      if (id === card.id) {
        index = iteration;
      }
    });
    return index;
  };

  removeCard = (id: string) => {
    const cards = [...this.state.cards];
    const index = this.getCardIndexById(id);
    cards.splice(index, 1);
    this.setState({ cards });
  };

  addCard = (card: Card) => {
    const cards = [card, ...this.state.cards];
    this.setState({ cards });
  };

  initializeGetCardCallbacks = () => {
    const handleOk = (cards: any) => this.setState({ cards });
    const callbackMap = {
      [STATUS_OK]: handleOk
    };
    this.callbacks.getCards = callbackMap;
  };

  initializeDeleteCardCallbacks = () => {
    const handleOk = ({ deletedId }) => this.removeCard(deletedId);
    const callbackMap = {
      [STATUS_OK]: handleOk
    };
    this.callbacks.deleteCard = callbackMap;
  };

  render() {
    const { deleteCard } = this.props;
    const { cards } = this.state;
    const callbacks = this.callbacks;
    return cards ? (
      <CardsList
        cards={cards}
        deleteCardRequest={deleteCard}
        deleteCardCallbacks={callbacks.deleteCard}
        removeDeletedCard={this.removeDeletedCard}
      />
    ) : (
      <Loading />
    );
  }
}
