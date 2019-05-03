// @flow
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Select, Option } from "react-native-chooser";
import { NoItems } from "AppComponents";
import type { Card } from "AppTypes";

type Props = {
  cards: Array<Card>,
  onSelect: Function,
  defaultText: string
};

const renderOptions = (cards: Array<Card>): Array<Option> =>
  cards.map(
  (card: Card): Option => {
    const { id, last4, exp_month: month, exp_year: year } = card;
    const cardInfo = `...${last4}  ${month}${year}`;
    return (
        <Option value={id} key={id}>
        {cardInfo}
      </Option>
    );
  }
);

export const CardSelect = ({ onSelect, defaultText, cards }: Props) => (
  <View style={styles.selectBox}>
    {cards.length ? (
      <Select
        onSelect={onSelect}
        defaultText={defaultText}
        style={styles.selectStyle}
        backdropStyle={styles.backdropStyle}
        optionListStyle={styles.optionListStyle}
      >
        {renderOptions(cards)}
      </Select>
    ) : (
      <NoItems itemName="cards" />
    )}
  </View>
);

const styles = StyleSheet.create({
  selectBox: {
    marginTop: 20,
    marginBottom: 20
  },
  selectStyle: {
    borderWidth: 2,
    borderColor: "green"
  },
  backdropStyle: { backgroundColor: "#d3d5d6" },
  optionListStyle: { backgroundColor: "#F5FCFF" }
});
