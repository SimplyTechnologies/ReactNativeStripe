// @flow
import React, { Component } from "react";
import type { Element } from "react";
import { View } from "react-native";
import { FloatingButton } from "AppComponents";
import { CardsContainer } from "AppContainers";
import {
  InitEventHandlers,
  ModalProvider,
  RequestProvider
} from "AppProviders";
import { getCards, deleteCard } from "AppProxies";
import { ModalTypes } from "AppConstants";

const { ADD_CARD } = ModalTypes;

type Props = {
  navigator: any,
  openModal: Function
};

type State = {};

class WrappedCardsScreen extends Component<Props, State> {
  cardProxies = { getCards, deleteCard };

  removeDeletedCard = () => {};

  openAddCardModal = () => {
    const { openModal } = this.props;
    openModal(ADD_CARD, {});
  };

  renderRequestProvider = ({ getCards, deleteCard }: any) => (
    <CardsContainer getCards={getCards} deleteCard={deleteCard} />
  );

  render() {
    return (
      <View>
        <RequestProvider
          render={this.renderRequestProvider}
          requestProxy={this.cardProxies}
        />
        <FloatingButton
          itemTitle="Add Card"
          handleButtonPress={this.openAddCardModal}
        />
      </View>
    );
  }
}

export const CardsScreen = InitEventHandlers(ModalProvider(WrappedCardsScreen));
