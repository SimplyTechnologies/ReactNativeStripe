// @flow
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// TODO: Flowify Deeper
type Props = {
  plan: any
};

const getPlanAmount = (interval: string, count: number): string =>
  `${count} ${interval}`;

export const PlansListItem = ({
  plan: { name, interval, interval_count }
}: Props) => (
  <View style={styles.container}>
    <Text style={styles.planName}>{name}</Text>
    <Text style={styles.planAmount}>
      {getPlanAmount(interval, interval_count)}
    </Text>
    <TouchableOpacity style={styles.subscribeButton} onPress={() => {}}>
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
