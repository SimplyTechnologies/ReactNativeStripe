// @flow
import React, { Component } from "react";
import { View } from "react-native";
import { CardsList, Loading } from "AppComponents";
import { ResponseStatuses } from "AppConstants";

type Props = {
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
