import React from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, Avatar, Container, Heading,
  Button, Checkbox, Stack, Input, ButtonGroup, Box, Text, Spinner
} from '@chakra-ui/react';
import { useDashboard } from '../hooks/useDashboard';
import UserDetailModal from '../components/userModal';
import ConfirmDeleteModal from '../components/deleteModal';
import '../scss/dashboard.scss';

function Dashboard() {
  const {
    users, isLoading, isError, selectedIds, editingId,
    editFormData, setEditFormData, selectedUser,
    isUserModalOpen, isDeleteOpen, actions
  } = useDashboard();

  if (isLoading) return <Box textAlign="center" py={20}><Spinner size="xl" /></Box>;
  if (isError) return <Text color="red.500">Error loading data.</Text>;

  return (
    <Container maxW="container.xl" className="dashboard">
      <Stack className="dashboard__header" direction="row" justify="space-between" mb={6} align="center">
        <Heading size="lg" className="dashboard__title">Shipment Confirmation System</Heading>
        <Button
          colorScheme="red"
          onClick={actions.onDeleteOpen}
          isDisabled={selectedIds.length === 0}
        >
          Delete Selected ({selectedIds.length})
        </Button>
      </Stack>

      <Box className="dashboard__table-container">
        <Table variant="simple" className="user-table">
          <Thead className="user-table__head">
            <Tr>
              <Th width="60px">
                <Checkbox
                  colorScheme="whiteAlpha"
                  onChange={(e) => actions.toggleSelectAll(e.target.checked)}
                  isChecked={selectedIds.length === users.length && users.length > 0}
                />
              </Th>
              <Th width="100px">Avatar</Th>
              <Th width="200px">First Name</Th>
              <Th width="200px">Last Name</Th>
              <Th>Email</Th>
              <Th width="180px">Action</Th>
            </Tr>
          </Thead>
          <Tbody className="user-table__body">
            {users.map((user) => {
              const isEditing = editingId === user.id;
              const isSelected = selectedIds.includes(user.id);

              return (
                <Tr
                  key={user.id}
                  className={`user-table__row ${isSelected ? 'user-table__row--selected' : ''} ${isEditing ? 'user-table__row--editing' : ''}`}
                >
                  <Td><Checkbox isChecked={isSelected} onChange={() => actions.toggleSelect(user.id)} /></Td>
                  <Td><Avatar size="sm" src={user.avatar} cursor="pointer" onClick={() => actions.handleViewDetail(user)} /></Td>

                  {isEditing ? (
                    <>
                      <Td><Input className="user-table__input" value={editFormData.firstName} onChange={e => setEditFormData({ ...editFormData, firstName: e.target.value })} /></Td>
                      <Td><Input className="user-table__input" value={editFormData.lastName} onChange={e => setEditFormData({ ...editFormData, lastName: e.target.value })} /></Td>
                      <Td><Input className="user-table__input" value={editFormData.email} onChange={e => setEditFormData({ ...editFormData, email: e.target.value })} /></Td>
                      <Td>
                        <ButtonGroup size="sm">
                          <Button colorScheme="blue" onClick={() => actions.handleSave(user.id)}>Save</Button>
                          <Button variant="ghost" onClick={actions.cancelEditing}>Cancel</Button>
                        </ButtonGroup>
                      </Td>
                    </>
                  ) : (
                    <>
                      <Td cursor="pointer" onClick={() => actions.handleViewDetail(user)}>{user.firstName}</Td>
                      <Td>{user.lastName}</Td>
                      <Td>{user.email}</Td>
                      <Td>
                        <Button size="sm" colorScheme="blue" variant="ghost" onClick={() => actions.startEditing(user)}>Edit</Button>
                      </Td>
                    </>
                  )}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={actions.onDeleteClose}
        onConfirm={actions.handleConfirmDelete}
        count={selectedIds.length}
      />

      <UserDetailModal
        isOpen={isUserModalOpen}
        onClose={actions.onUserModalClose}
        user={selectedUser}
      />
    </Container>
  );
}

export default Dashboard;