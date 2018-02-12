// @flow
import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  subscription: any,
  deleteSubscription: Function,
  deleteSubscriptionCallbacks: Object
};

const getPlanAmount = (interval: string, count: number): string =>
  `${count} ${interval}`;

const getUnsubscribeButtonPressedHandler = (
  subscriptionId,
  deleteSubscription,
  deleteSubscriptionCallbacks
) => () => deleteSubscription(subscriptionId)(deleteSubscriptionCallbacks);

export const SubscriptionsListItem = ({
  subscription: { id, plan },
  deleteSubscription,
  deleteSubscriptionCallbacks
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
        deleteSubscriptionCallbacks
      )}
    >
      <Text style={styles.unsubscribeButtonText}>Unsubscribe</Text>
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
    backgroundColor: "#4169E1",
    padding: 10
  },
  unsubscribeButtonText: {
    color: "white"
  }
});
