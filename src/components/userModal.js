import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalBody, ModalCloseButton, Avatar, Text, Box 
} from '@chakra-ui/react';

const UserDetailModal = ({ isOpen, onClose, user }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} textAlign="center">
          <Avatar size="2xl" src={user?.avatar} mb={4} border="4px solid" borderColor="blue.100" />
          <Text fontSize="xl" fontWeight="bold" color="blue.700">
            {user?.firstName} {user?.lastName}
          </Text>
          <Text color="gray.600">{user?.email}</Text>
          <Box mt={6} pt={4} borderTop="1px solid" borderColor="gray.100">
            <Text fontSize="xs" color="gray.400" textTransform="uppercase">External ID</Text>
            <Text fontSize="sm" fontFamily="mono">{user?.id}</Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserDetailModal;