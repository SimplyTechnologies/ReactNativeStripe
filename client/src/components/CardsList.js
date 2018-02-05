// @flow
import React, { Component } from "react";
import { FlatList, ActivityIndicator, View, Text } from "react-native";
import type { Element } from "react";
import { CardsListItem, NoItems } from "AppComponents";
import type { Card } from "../types";

type Props = {
  cards: Array<Card>,
  removeDeletedCard: Function
};

type State = {};

export class CardsList extends Component<Props, State> {
  removeDeletedCard = (data: any) => {
    const { removeDeletedCard } = this.props;
    removeDeletedCard(data);
  };

  _renderItem = ({ item }: { item: Card }): Element<typeof CardsListItem> => (
    <CardsListItem card={item} removeDeletedCard={this.removeDeletedCard} />
  );

  _keyExtractor = (item: Card): string => item.id;

  isEmpty = (): boolean => {
    const { cards } = this.props;
    return cards && cards.length === 0;
  };

  render() {
    const { cards } = this.props;
    const empty = this.isEmpty();
    return empty ? (
      <NoItems itemName="cards" />
    ) : (
      <FlatList
        data={cards}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}
