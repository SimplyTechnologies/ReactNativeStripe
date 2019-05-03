// @flow
import React, { Component } from "react";
import type { ComponentType, Node } from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import * as modals from "AppModals";

type Props = {};

type State = {
  isModalOpen: boolean,
  animationType: string,
  modalType: string,
  modalData: ?Object // TODO: add a shape later
};

const InvisibleModalComponent = () => <View />;

export const ModalProvider = (
  WrappedComponent: ComponentType<*>
): ComponentType<*> => {
  class Wrapper extends Component<Props, State> {
    state = {
      isModalOpen: false,
      modalType: "",
      modalData: null,
      animationType: "slide"
    };

    DEFAULT_MODAL_COMPONENT = <View />;

    getModalComponent = (): ComponentType<*> => {
      const { modalType } = this.state;
      if (modalType.length !== 0) {
        return modals[modalType];
      }
      return InvisibleModalComponent;
    };

    closeModal = (): void =>
      this.setState({ isModalOpen: false, modalType: "", modalData: null });

    openModal = (modalType: string, modalData: Object): void =>
      this.setState({ isModalOpen: true, modalType, modalData });

    render() {
      const { animationType, isModalOpen, modalData } = this.state;
      const ModalComponent = this.getModalComponent();
      return (
        <View>
          <WrappedComponent
            closeModal={this.closeModal}
            openModal={this.openModal}
            {...this.props}
          />
          <Modal
            isVisible={isModalOpen}
            onBackdropPress={this.closeModal}
            animationType={animationType}
            transparent
          >
            <ModalComponent data={modalData} closeModal={this.closeModal} />
          </Modal>
        </View>
      );
    }
  }
  return Wrapper;
};

const styles = StyleSheet.create({});
