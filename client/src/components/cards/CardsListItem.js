// @flow
import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import type { Card } from "../types";

type Props = {
  card: Card,
  showSpinner: Function,
  removeDeletedCard: Function,
  deleteCardRequest: Function,
  deleteCardCallbacks: Object
};

const getDeleteButtonPressedHandler = (
  showSpinner,
  deleteCardRequest,
  deleteCardCallbacks,
  cardId
) => () => {
  showSpinner();
  deleteCardRequest(cardId)(deleteCardCallbacks);
};

export const CardsListItem = ({
  card: { last4, id },
  deleteCardRequest,
  deleteCardCallbacks,
  showSpinner
}: Props) => (
  <View style={styles.container}>
    <Text style={styles.cardNumberText}>...{last4}</Text>
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={getDeleteButtonPressedHandler(
        showSpinner,
        deleteCardRequest,
        deleteCardCallbacks,
        id
      )}
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
    padding: 10
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
