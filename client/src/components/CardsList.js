// @flow

import React, { Component } from "react";
import { FlatList, ActivityIndicator, View, Text } from "react-native";
import type { Element } from "react";
import { CardsListItem } from "AppComponents";
import type { Card } from "../types";

type Props = {
  getCards: Function,
  cards: Array<Card>,
  removeDeletedCard: Function
};

type State = {};

export class CardsList extends Component<Props, State> {}

/////////////////////

export class CardsList1 extends Component<Props, State> {
  componentDidMount() {
    const { getCards } = this.props;
    getCards();
  }

  removeDeletedCard = (data: any) => {
    const { removeDeletedCard } = this.props;
    removeDeletedCard(data);
  };

  _renderItem = ({ item }: { item: Card }): Element<typeof CardsListItem> => (
    <CardsListItem card={item} removeDeletedCard={this.removeDeletedCard} />
  );

  _keyExtractor = (item: Card): string => item.id;

  isLoading = (): boolean => this.props.cards === null;

  isEmpty = (): boolean => {
    const { cards } = this.props;
    return cards && cards.length === 0;
  };

  renderCards = () => {
    const { cards } = this.props;
    const loading = this.isLoading();
    const empty = this.isEmpty();
    if (loading) {
      return <ActivityIndicator />;
    }
    if (empty) {
      return <Text>No items to show</Text>;
    }
    return (
      <FlatList
        data={cards}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    );
  };

  render() {
    return this.renderCards();
  }
}
