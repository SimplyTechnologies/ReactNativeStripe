// @flow

import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
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
  <View>
    <Text>{last4}</Text>
    <TouchableOpacity
      onPress={getDeleteButtonPressedHandler(deleteCardRequest, id)}
    >
      <Text>Delete</Text>
    </TouchableOpacity>
  </View>
);
