// @flow
import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import type { Card } from "../types";

type Props = {
  card: Card,
  removeDeletedCard: Function,
  deleteCardRequest: Function
};

const getDeleteButtonPressedHandler = (deleteCardRequest, cardId) => () =>
  deleteCardRequest(cardId);

export const CardsListItem = ({
  card: { last4, id },
  deleteCardRequest
}: Props) => (
  <View style={styles.container}>
    <Text style={styles.cardNumberText}>...{last4}</Text>
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={getDeleteButtonPressedHandler(deleteCardRequest, id)}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  cardNumberText: {
    alignItems: "center",
    fontSize: 15,
    padding: 10
  },
  deleteButton: {
    alignItems: "center",
    backgroundColor: "#FC4040",
    padding: 12,
    width: 80
  },
  deleteButtonText: {
    color: "white"
  }
});
