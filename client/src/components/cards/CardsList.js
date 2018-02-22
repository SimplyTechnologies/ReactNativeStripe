// @flow
import React, { Component } from "react";
import { FlatList, ActivityIndicator, View, Text } from "react-native";
import type { Element } from "react";
import { CardsListItem, ItemSeparator, NoItems } from "AppComponents";
import type { Card, CallbackMap } from "../types";

type Props = {
  cards: Array<Card>,
  deleteCardCallbacks: CallbackMap,
  deleteCardRequest: Function,
  showSpinner: Function
};

type State = {};

type CardsItem = {
  item: Card
};

export class CardsList extends Component<Props, State> {
  renderItem = ({ item }: CardsItem): Element<typeof CardsListItem> => (
    <CardsListItem
      card={item}
      showSpinner={this.props.showSpinner}
      deleteCardRequest={this.props.deleteCardRequest}
      deleteCardCallbacks={this.props.deleteCardCallbacks}
    />
  );

  keyExtractor = (item: Card): string => item.id;

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
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={ItemSeparator}
      />
    );
  }
}
