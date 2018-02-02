// @flow
import React, { Component } from "react";
import type { Element } from "react";
import { View, StyleSheet } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import {
  InitEventHandlers,
  RequestProvider,
  ModalProvider
} from "AppProviders";
import { getCards } from "AppProxies";
import { CardsList } from "AppComponents";
import { CardsContainer } from "AppContainers";
import { ResponseStatuses, ModalTypes } from "AppConstants";
import type { Card } from "../types";

const { STATUS_OK } = ResponseStatuses;
const { ADD_CARD } = ModalTypes;

type Props = {
  navigator: any,
  openModal: Function
};

type State = {
  cards: any
};

class WrappedCardsScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cards: null
    };
    this.initializeCallbacks();
  }

  callbackMap: Object;
  initializeCallbacks = () => {
    const handleOk = (data: Array<Card>) => {
      this.setState({ cards: data });
    };
    this.callbackMap = {
      [STATUS_OK]: handleOk
    };
  };

  removeDeletedCard = ({ deletedCardId }: { deletedCardId: string }) => {
    this.setState(({ cards }: State): { cards: Card[] } => ({
      cards: cards.filter((card: Card): boolean => card.id !== deletedCardId)
    }));
  };

  openAddCardModal = () => {
    const { openModal } = this.props;
    openModal(ADD_CARD, {});
  };

  renderRequestProvider = (
    handleRequest: Function
  ): Element<typeof CardsList> => (
    <CardsList
      removeDeletedCard={this.removeDeletedCard}
      getCards={handleRequest}
      cards={this.state.cards}
    />
  );

  render() {
    return (
      <View>
        <RequestProvider
          render={this.renderRequestProvider}
          requestProxy={getCards}
          callbackMap={this.callbackMap}
        />
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
