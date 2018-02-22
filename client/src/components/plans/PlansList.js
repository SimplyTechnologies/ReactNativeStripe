// @flow
import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { PlansListItem, ItemSeparator, NoItems } from "AppComponents";
import type { Plan } from "AppTypes";

type Props = {
  plans: Array<Plan>,
  showSpinner: Function,
  addSubscription: Function,
  addSubscriptionCallbacks: Object,
  subscribedPlanIds: Object
};

type State = {};

// TODO: Flowify Depper
type PlansItem = {
  item: Plan
};

export class PlansList extends Component<Props, State> {
  renderItem = ({ item }: PlansItem) => (
    <PlansListItem
      plan={item}
      isSubscribed={!!this.props.subscribedPlanIds[item.id]}
      addSubscription={this.props.addSubscription}
      addSubscriptionCallbacks={this.props.addSubscriptionCallbacks}
      showSpinner={this.props.showSpinner}
    />
  );

  keyExtractor = (item: Plan): string => item.id;

  isEmpty = (): boolean => {
    const { plans } = this.props;
    return plans && plans.length === 0;
  };

  render() {
    const { plans, subscribedPlanIds } = this.props;
    const empty = this.isEmpty();
    return (
      <View style={styles.container}>
        {empty ? (
          <NoItems itemName="plans" />
        ) : (
          <FlatList
            data={plans}
            extraData={subscribedPlanIds}
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
