// @flow
import React, { Component } from "react";
import type { Element } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { FloatingButton } from "AppComponents";
import { CardsContainer } from "AppContainers";
import {
  InitEventHandlers,
  ModalProvider,
  RequestProvider,
  SpinnerProvider,
  ToastProvider
} from "AppProviders";
import { getCards, deleteCard } from "AppProxies";
import { ModalTypes } from "AppConstants";
import type { Card } from "AppTypes";

const { ADD_CARD } = ModalTypes;

// calculate container height for displaying FloatButton on the bottom
// TODO: make the calculation more precise
const { height } = Dimensions.get("window");
const containerHeight = height - height * 0.2;

type Props = {
  navigator: any,
  openModal: Function,
  showSpinner: Function,
  hideSpinner: Function
};

type State = {
  newCard: any
};

class WrappedCardsScreen extends Component<Props, State> {
  state = {
    newCard: null
  };

  cardProxies = { getCards, deleteCard };

  removeDeletedCard = () => {};

  setNewCard = (newCard: Card) => this.setState({ newCard });

  removeNewCard = () => this.setState({ newCard: null });

  openAddCardModal = () => {
    const { openModal } = this.props;
    const setNewCard = this.setNewCard;
    openModal(ADD_CARD, { setNewCard });
  };

  renderRequestProvider = ({ getCards, deleteCard }: any) => (
    <ToastProvider>
      {({ showToast, hideToast }) => (
        <CardsContainer
          newCard={this.state.newCard}
          removeNewCard={this.removeNewCard}
          getCards={getCards}
          deleteCard={deleteCard}
          showSpinner={this.props.showSpinner}
          hideSpinner={this.props.hideSpinner}
          showToast={showToast}
          hideToast={hideToast}
        />
      )}
    </ToastProvider>
  );

  render() {
    return (
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: { height: containerHeight }
});

export const CardsScreen = InitEventHandlers(
  ModalProvider(SpinnerProvider(WrappedCardsScreen))
);
