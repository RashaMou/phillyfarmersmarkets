import { InfoOutlineIcon } from '@chakra-ui/icons';
import {


  Modal,
  ModalBody,
  ModalCloseButton, ModalContent,
  ModalHeader, ModalOverlay, useDisclosure
} from "@chakra-ui/react";
import React from 'react';

const InfoModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
        <InfoOutlineIcon w={14} h={14} color="#319795" onClick={onOpen} className="info-icon"/>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>About this app</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <p>
          <span>Philly Farmer's Markets</span> was built by{" "}
          <a href="https://www.rasha.dev">Rasha Moumneh</a> using{" "}
          <i class="fab fa-react"></i> React, Leaflet, and{" "}
          <a href="https://www.opendataphilly.org/">Open Data Philly's</a>{" "}
          farmer's markets ArcGIS API.
        </p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default InfoModal;