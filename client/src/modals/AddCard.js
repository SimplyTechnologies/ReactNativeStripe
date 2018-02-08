// @flow
import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { PaymentForm } from "AppComponents";
import { RequestProvider } from "AppProviders";
import { addCard } from "AppProxies";
import { ResponseStatuses } from "AppConstants";
import type { Card } from "AppTypes";

type Props = {
  data: Object,
  closeModal: Function
};

type State = {
  message: string
};

const { STATUS_OK } = ResponseStatuses;

export class AddCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      message: ""
    };
    this.callbackMap = {};
    this.initializeCallbackMap();
  }

  initializeCallbackMap = () => {
    const { closeModal, data: { setNewCard } } = this.props;
    const handleOk = (card: Card) => {
      setNewCard(card);
      closeModal();
    };
    this.callbackMap = {
      [STATUS_OK]: handleOk
    };
  };

  renderRequestProvider = (handleRequest: Function) => (
    <PaymentForm
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
