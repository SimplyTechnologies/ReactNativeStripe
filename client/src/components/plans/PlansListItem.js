// @flow
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// TODO: Flowify Deeper
type Props = {
  plan: any,
  addSubscription: Function,
  addSubscriptionCallbacks: Object
};

const getPlanAmount = (interval: string, count: number): string =>
  `${count} ${interval}`;

const getSubscribeButtonPressedHandler = (
  planId,
  addSubscription,
  addSubscriptionCallbacks
) => () => addSubscription(planId)(addSubscriptionCallbacks);

export const PlansListItem = ({
  plan,
  addSubscription,
  addSubscriptionCallbacks
}: Props) => (
  <View style={styles.container}>
    <Text style={styles.planName}>{plan.name}</Text>
    <Text style={styles.planAmount}>
      {getPlanAmount(plan.interval, plan.interval_count)}
    </Text>
    <TouchableOpacity
      style={styles.subscribeButton}
      onPress={getSubscribeButtonPressedHandler(
        plan.id,
        addSubscription,
        addSubscriptionCallbacks
      )}
    >
      <Text style={styles.subscribeButtonText}>Subscribe</Text>
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
  subscribeButton: {
    alignItems: "center",
    backgroundColor: "#4169E1",
    padding: 10
  },
  subscribeButtonText: {
    color: "white"
  }
});
