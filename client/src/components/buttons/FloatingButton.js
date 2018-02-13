// @flow
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  itemTitle: string,
  handleButtonPress: Function
};

export const FloatingButton = ({ itemTitle, handleButtonPress }: Props) => (
  <ActionButton buttonColor="rgba(231,76,60,1)" offsetX={15} offsetY={10}>
    <ActionButton.Item
      buttonColor="#1abc9c"
      title={itemTitle}
      onPress={handleButtonPress}
    >
      <Icon name="md-create" style={styles.actionButtonIcon} />
    </ActionButton.Item>
  </ActionButton>
);

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
