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
  }

  //TESTING FUNCTION
  removeDeletedCard = () => {};

  addCard = (card: Card) => {
    const cards = [...this.state.cards, card];
    this.setState({ cards });
  };

  componentWillReceiveProps(nextProps: Props) {
    const { newCard, removeNewCard } = nextProps;
    if (newCard) {
      this.addCard(newCard);
      removeNewCard();
    }
  }

  initializeGetCardCallbacks = () => {
    const handleOk = (cards: any) => this.setState({ cards });
    const callbackMap = {
      [STATUS_OK]: handleOk
    };
    this.callbacks.getCards = callbackMap;
  };

  componentDidMount() {
    const { getCards } = this.props;
    const { getCards: getCardsCallbacks } = this.callbacks;
    this.props.getCards()(getCardsCallbacks);
  }

  render() {
    const { deleteCard } = this.props;
    const { cards } = this.state;
    return cards ? (
      <CardsList
        cards={cards}
        deleteCardRequest={deleteCard}
        removeDeletedCard={this.removeDeletedCard}
      />
    ) : (
      <Loading />
    );
  }
}
