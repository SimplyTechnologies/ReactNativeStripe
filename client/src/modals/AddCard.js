// @flow
import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { PaymentForm } from "AppComponents";
import { RequestProvider, SpinnerProvider } from "AppProviders";
import { addCard } from "AppProxies";
import { ResponseStatuses } from "AppConstants";
import type { Card } from "AppTypes";

type Props = {
  data: Object,
  closeModal: Function,
  showSpinner: Function,
  hideSpinner: Function
};

type State = {
  message: string
};

const { STATUS_OK } = ResponseStatuses;

class WrappedAddCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      message: ""
    };
    this.callbackMap = {};
    this.initializeCallbackMap();
  }

  initializeCallbackMap = () => {
    const { closeModal, hideSpinner, data: { setNewCard } } = this.props;
    const handleOk = (card: Card) => {
      setNewCard(card);
      hideSpinner();
      closeModal();
    };
    this.callbackMap = {
      [STATUS_OK]: handleOk
    };
  };

  renderRequestProvider = (handleRequest: Function) => (
    <PaymentForm
      showSpinner={this.props.showSpinner}
      payWithToken={handleRequest}
      message={this.state.message}
      callbackMap={this.callbackMap}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add card</Text>
          <RequestProvider
            requestProxy={addCard}
            render={this.renderRequestProvider}
          />
        </View>
      </View>
    );
  }
}

export const AddCard = SpinnerProvider(WrappedAddCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontWeight: "bold",
    fontSize: 20
  },
  modalContent: {
    height: 300,
    padding: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "rgba(0, 0, 0, 0.5)"
  }
});
