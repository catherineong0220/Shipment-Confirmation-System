import React, { useEffect, useState } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, Avatar, Container, Heading,
  Button, Checkbox, Stack, Input, ButtonGroup, Box, useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text, Spinner
} from '@chakra-ui/react';
import { fetchUsers } from '../services/userService';
import { useQuery } from '@tanstack/react-query';
import '../scss/dashboard.scss';
import UserDetailModal from '../components/userModal'
import ConfirmDeleteModal from '../components/deleteModal';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ firstName: '', lastName: '', email: '' });

  // 使用 react-query 获取数据
  const { data: apiUsers, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (apiUsers) setUsers(apiUsers);
  }, [apiUsers]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleViewDetail = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure();

  const handleSave = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, ...editFormData } : u));
    setEditingId(null);
  };

  const handleConfirmDelete = () => {
  // Filter ID
  setUsers(users.filter(u => !selectedIds.includes(u.id))); 
  // 清空选中状态
  setSelectedIds([]); 
  // 关闭弹窗
  onDeleteClose(); 
};

  if (isLoading) return <Box textAlign="center" py={20}><Spinner size="xl" /></Box>;
  if (isError) return <Text color="red.500">Error loading data.</Text>;

  return (
    <Container maxW="container.xl" className="scs-container">
      <Stack direction="row" justify="space-between" mb={6} align="center">
        <Heading size="lg" color="blue.800">Shipment Confirmation System</Heading>
        <Button colorScheme="red" onClick={onDeleteOpen} isDisabled={selectedIds.length === 0}>
          Delete Selected ({selectedIds.length})
        </Button>
      </Stack>

      <Box className="table-wrapper">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th width="60px"><Checkbox colorScheme="whiteAlpha" onChange={(e) => setSelectedIds(e.target.checked ? users.map(u => u.id) : [])} isChecked={selectedIds.length === users.length && users.length > 0} /></Th>
              <Th width="100px">Avatar</Th>
              <Th width="200px">First Name</Th>
              <Th width="200px">Last Name</Th>
              <Th>Email</Th>
              <Th width="180px">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id} className={`${selectedIds.includes(user.id) ? 'selected-row' : ''} ${editingId === user.id ? 'editing-row' : ''}`}>
                <Td><Checkbox isChecked={selectedIds.includes(user.id)} onChange={() => setSelectedIds(prev => prev.includes(user.id) ? prev.filter(i => i !== user.id) : [...prev, user.id])} /></Td>
                <Td><Avatar size="sm" src={user.avatar} cursor="pointer" onClick={() => handleViewDetail(user)} /></Td>

                {editingId === user.id ? (
                  <>
                    <Td><Input className="edit-input" value={editFormData.firstName} onChange={e => setEditFormData({ ...editFormData, firstName: e.target.value })} /></Td>
                    <Td><Input className="edit-input" value={editFormData.lastName} onChange={e => setEditFormData({ ...editFormData, lastName: e.target.value })} /></Td>
                    <Td><Input className="edit-input" value={editFormData.email} onChange={e => setEditFormData({ ...editFormData, email: e.target.value })} /></Td>
                    <Td>
                      <ButtonGroup size="sm">
                        <Button colorScheme="blue" onClick={() => handleSave(user.id)}>Save</Button>
                        <Button variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                      </ButtonGroup>
                    </Td>
                  </>
                ) : (
                  <>
                    <Td cursor="pointer" onClick={() => handleViewDetail(user)}>{user.firstName}</Td>
                    <Td>{user.lastName}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      <Button size="sm" colorScheme="blue" variant="ghost" onClick={() => {
                        setEditingId(user.id);
                        setEditFormData({ firstName: user.firstName, lastName: user.lastName, email: user.email });
                      }}>Edit</Button>
                    </Td>
                  </>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* 删除 Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={handleConfirmDelete}
        count={selectedIds.length}
      />

      {/* 用户 Modal */}
      <UserDetailModal
        isOpen={isOpen}
        onClose={onClose}
        user={selectedUser}
      />
    </Container>
  );
}

export default Dashboard;