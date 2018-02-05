// @flow
import React, { Component } from "react";
import type { Element } from "react";
import { View, StyleSheet } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import { InitEventHandlers, ModalProvider, CardsProvider } from "AppProviders";
import { CardsList } from "AppComponents";
import { ModalTypes } from "AppConstants";

const { ADD_CARD } = ModalTypes;

type Props = {
  navigator: any,
  openModal: Function
};

type State = {};

class WrappedCardsScreen extends Component<Props, State> {
  removeDeletedCard = () => {};

  openAddCardModal = () => {
    const { openModal } = this.props;
    openModal(ADD_CARD, {});
  };

  renderCardsProvider = (cards: Array): Element<typeof CardsList> => (
    <CardsList removeDeletedCard={this.removeDeletedCard} cards={cards} />
  );

  render() {
    return (
      <View>
        <CardsProvider render={this.renderCardsProvider} />
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="All Card"
            onPress={this.openAddCardModal}
          >
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});

export const CardsScreen = InitEventHandlers(ModalProvider(WrappedCardsScreen));
