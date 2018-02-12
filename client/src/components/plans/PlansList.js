// @flow
import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { PlansListItem, ItemSeparator, NoItems } from "AppComponents";

type Props = {
  plans: any,
  addSubscription: Function,
  addSubscriptionCallbacks: Object,
  subscribedPlanIds: Object
};

type State = {};

// TODO: Flowify Depper
type PlansItem = {
  item: any
};

export class PlansList extends Component<Props, State> {
  renderItem = ({ item }: PlansItem) => (
    <PlansListItem
      plan={item}
      isSubscribed={!!this.props.subscribedPlanIds[item.id]}
      addSubscription={this.props.addSubscription}
      addSubscriptionCallbacks={this.props.addSubscriptionCallbacks}
    />
  );

  keyExtractor = (item: any): string => item.id;

  isEmpty = (): boolean => {
    const { plans } = this.props;
    return plans && plans.length === 0;
  };

  render() {
    const { plans } = this.props;
    const empty = this.isEmpty();
    return (
      <View style={styles.container}>
        {empty ? (
          <NoItems itemName="plans" />
        ) : (
          <FlatList
            data={plans}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            ItemSeparatorComponent={ItemSeparator}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 11
  }
});
