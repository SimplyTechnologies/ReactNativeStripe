// @flow
import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  subscription: any,
  deleteSubscription: Function,
  deleteSubscriptionCallbacks: Object,
  showSpinner: Function
};

const getPlanAmount = (interval: string, count: number): string =>
  `${count} ${interval}`;

const getUnsubscribeButtonPressedHandler = (
  subscriptionId,
  deleteSubscription,
  deleteSubscriptionCallbacks,
  showSpinner
) => () => {
  showSpinner();
  deleteSubscription(subscriptionId)(deleteSubscriptionCallbacks);
};

export const SubscriptionsListItem = ({
  subscription: { id, plan },
  deleteSubscription,
  deleteSubscriptionCallbacks,
  showSpinner
}: Props) => (
  <View style={styles.container}>
    <Text style={styles.planName}>{plan.name}</Text>
    <Text style={styles.planAmount}>
      {getPlanAmount(plan.interval, plan.interval_count)}
    </Text>
    <TouchableOpacity
      style={styles.unsubscribeButton}
      onPress={getUnsubscribeButtonPressedHandler(
        id,
        deleteSubscription,
        deleteSubscriptionCallbacks,
        showSpinner
      )}
    >
      <Text style={styles.unsubscribeButtonText}>✗ Unsubscribe</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  planName: {
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 16
  },
  planAmount: {},
  unsubscribeButton: {
    alignItems: "center",
    backgroundColor: "#69D2E7",
    padding: 10
  },
  unsubscribeButtonText: {
    color: "white"
  }
});
