// @flow

import React, { Component } from "react";
import { FlatList, ActivityIndicator, View } from "react-native";
import type { Element } from "react";
import { CardsListItem } from "AppComponents";
import type { Card } from "../types";

type Props = {
  getCards: Function,
  cards: Array<Card>,
  loading: boolean,
  removeDeletedCard: Function
};

type State = {};

export class CardsList extends Component<Props, State> {
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
  render() {
    const { cards, loading } = this.props;
    return (
      <View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={cards}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        )}
      </View>
    );
  }
}
