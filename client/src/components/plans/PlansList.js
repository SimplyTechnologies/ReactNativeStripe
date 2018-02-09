// @flow
import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { NoItems } from "AppComponents";

type Props = {
  plans: any
};

type State = {};

// TODO: Flowify Depper
type PlansItem = {
  item: any
};

export class PlansList extends Component<Props, State> {
  renderItem = ({ item }: PlansItem) => <Text>{item.id}</Text>;

  keyExtractor = (item: any): string => item.id;

  isEmpty = (): boolean => {
    const { plans } = this.props;
    return plans && plans.length === 0;
  };

  render() {
    const { plans } = this.props;
    const empty = this.isEmpty();
    return empty ? (
      <NoItems itemName="plans" />
    ) : (
      <FlatList
        data={plans}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}
