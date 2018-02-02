// @flow
import React, { Component } from "react";
import { View } from "react-native";
import { CardsList } from "AppComponents";

type Props = {
  removeDeletedCard: Function,
  getCards: Function,
  updateCards: any
};

type State = {
  cards: any
};

export class CardsContainer extends Component<Props, State> {
  this.state = {
    cards: null
  };

  componentWillReceiveProps(nextProps: Props) {
    const { updateCards: cards } = nextProps;
    if (cards) {
      this.setState({ cards });
    }
  }

  componentDidMount() {
    this.props.getCards();
  }

  render() {
    return <CardsList />;
  }
}
