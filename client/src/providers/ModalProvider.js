// @flow
import React, { Component } from "react";
import { Modal, View } from "react-native";
import * as modals from "AppModals";

type Props = {};

type State = {
  isModalOpen: boolean,
  animationType: string,
  modalType: string,
  modalData: any // TODO: add a shape later
};

export const ModalProvider = (WrappedComponent: any): any => {
  class Wrapper extends Component<Props, State> {
    state = {
      isModalOpen: false,
      modalType: "",
      modalData: null,
      animationType: "slide"
    };

    getModalComponent = (): any => {
      const { modalType } = this.state;
      if (modalType.length) {
        return modals[modalType];
      }
      return null;
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
            visible={isModalOpen}
            animationType={animationType}
            onRequestClose={this.closeModal}
          >
            <ModalComponent data={modalData} />
          </Modal>
        </View>
      );
    }
  }
  return Wrapper;
};
