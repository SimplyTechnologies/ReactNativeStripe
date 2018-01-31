// @flow
import React, { Component } from "react";
import { Modal } from "react-native";
import * as modals from "AppModals";

type Props = {};

type State = {
  isModalOpen: boolean,
  animationType: string,
  modalType: string,
  modalData: any // TODO: add a shape later
};

export class ModalProvider extends Component<Props, State> {
  state = {
    isModalOpen: false,
    modalType: "",
    modalData: null,
    animationType: "slide"
  };

  getModalComponent = (): any => {
    const { modalType } = this.state;
    return modals[modalType];
  };

  closeModal = (): void =>
    this.setState({ isModalOpen: false, modalType: "", modalData: null });

  openModal = (modalType: string, modalData: any): void =>
    this.setState({ isModalOpen: true, modalType, modalData });

  render() {
    const { animationType, isModalOpen, modalData } = this.state;
    const ModalComponent = this.getModalComponent();
    return (
      <Modal
        visible={isModalOpen}
        animationType={animationType}
        onRequestClose={this.closeModal}
      >
        <ModalComponent data={modalData} />
      </Modal>
    );
  }
}
