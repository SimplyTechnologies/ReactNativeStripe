// @flow
import React, { Component } from "react";
import type { Element } from "react";
import { View } from "react-native";
import { CardsList, FloatingButton } from "AppComponents";
import { InitEventHandlers, ModalProvider, CardsProvider } from "AppProviders";
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
        <FloatingButton
          itemTitle="Add Card"
          handleButtonPress={this.openAddCardModal}
        />
      </View>
    );
  }
}

export const CardsScreen = InitEventHandlers(ModalProvider(WrappedCardsScreen));
