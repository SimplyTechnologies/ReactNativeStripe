// @flow
import React from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { CardLogos } from "AppConstants";
import type { Card, CallbackMap } from "AppTypes";

const brands = {
  Visa: require("img/cards/visa.png"),
  Discover: require("img/cards/discover.png"),
  MasterCard: require("img/cards/mastercard.png"),
  JCB: require("img/cards/jcb.png"),
  "American Express": require("img/cards/american-express.png"),
  "Diners Club": require("img/cards/dinners-club.png")
};

type Props = {
  card: Card,
  showSpinner: Function,
  deleteCardRequest: Function,
  deleteCardCallbacks: CallbackMap
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
  card: { last4, id, brand },
  deleteCardRequest,
  deleteCardCallbacks,
  showSpinner
}: Props) => (
  <View style={styles.container}>
    <Image style={styles.logo} source={brands[brand]} />
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
  logo: {
    alignItems: "center",
    width: 40,
    height: 40
  },
  cardNumberText: {
    alignItems: "center",
    fontSize: 15,
    padding: 10
  },
  deleteButton: {
    alignItems: "center",
    backgroundColor: "#D34712",
    padding: 12,
    width: 80
  },
  deleteButtonText: {
    color: "white"
  }
});
