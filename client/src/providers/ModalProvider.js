// @flow
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import * as modals from "AppModals";

type Props = {};

type State = {
  isModalOpen: boolean,
  animationType: string,
  modalType: string,
  modalData: any // TODO: add a shape later
};

const InvisibleModalComponent = () => <View />;

export const ModalProvider = (WrappedComponent: any): any => {
  class Wrapper extends Component<Props, State> {
    state = {
      isModalOpen: false,
      modalType: "",
      modalData: null,
      animationType: "slide"
    };
    DEFAULT_MODAL_COMPONENT = <View />;

    getModalComponent = (): any => {
      const { modalType } = this.state;
      if (modalType.length !== 0) {
        return modals[modalType];
      }
      return InvisibleModalComponent;
    };

    closeModal = (): void =>
      this.setState({ isModalOpen: false, modalType: "", modalData: null });

    openModal = (modalType: string, modalData: any): void =>
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
            <ModalComponent data={modalData} />
          </Modal>
        </View>
      );
    }
  }
  return Wrapper;
};

const styles = StyleSheet.create({});
