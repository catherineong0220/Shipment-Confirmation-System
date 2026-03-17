import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, Button, Text, Icon
} from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, count }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" alignItems="center">
          <Icon as={WarningIcon} color="red.500" mr={2} />
          Confirm Deletion
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete the selected <strong>{count}</strong> user(s)? This action cannot be undone.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={onConfirm}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeleteModal;