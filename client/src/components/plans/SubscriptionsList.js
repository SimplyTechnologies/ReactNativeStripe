// @flow
import React, { Component } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SubscriptionsListItem, ItemSeparator, NoItems } from "AppComponents";
import type { Subscription, CallbackMap } from "AppTypes";

type Props = {
  subscriptions: Array<Subscription>,
  deleteSubscription: Function,
  deleteSubscriptionCallbacks: CallbackMap,
  showSpinner: Function
};

type State = {};

// TODO: Flowify deeper
type SubscriptionsItem = {
  item: Subscription
};

export class SubscriptionsList extends Component<Props, State> {
  renderItem = ({ item }: SubscriptionsItem) => (
    <SubscriptionsListItem
      subscription={item}
      deleteSubscription={this.props.deleteSubscription}
      deleteSubscriptionCallbacks={this.props.deleteSubscriptionCallbacks}
      showSpinner={this.props.showSpinner}
    />
  );

  keyExtractor = (item: Subscription) => item.id;

  isEmpty = () => {
    const { subscriptions } = this.props;
    return subscriptions && subscriptions.length === 0;
  };

  render() {
    const { subscriptions } = this.props;
    const empty = this.isEmpty();
    return (
      <View style={styles.container}>
        {empty ? (
          <NoItems itemName="subscriptions" />
        ) : (
          <FlatList
            data={subscriptions}
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
