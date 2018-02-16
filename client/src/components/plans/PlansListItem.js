// @flow
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// TODO: Flowify Deeper
type Props = {
  plan: any,
  isSubscribed: boolean,
  addSubscription: Function,
  addSubscriptionCallbacks: Object,
  showSpinner: Function
};

const EMPTY_FUNCTION = () => {};

const getPlanAmount = (interval: string, count: number): string =>
  `${count} ${interval}`;

const getSubscribeButtonPressedHandler = (
  planId,
  isSubscribed,
  addSubscription,
  addSubscriptionCallbacks,
  showSpinner
) => () => {
  if (!isSubscribed) {
    showSpinner();
    addSubscription(planId)(addSubscriptionCallbacks);
  }
};

export const PlansListItem = ({
  plan,
  isSubscribed,
  addSubscription,
  addSubscriptionCallbacks,
  showSpinner
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
        isSubscribed,
        addSubscription,
        addSubscriptionCallbacks,
        showSpinner
      )}
    >
      <Text style={styles.subscribeButtonText}>
        {isSubscribed ? "✓ Subscribed" : "Subscribe"}
      </Text>
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
    backgroundColor: "#69D2E7",
    padding: 10
  },
  subscribeButtonText: {
    color: "white"
  }
});
