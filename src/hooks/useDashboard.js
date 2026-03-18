import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../services/userService';
import { useDisclosure } from '@chakra-ui/react';

export const useDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ firstName: '', lastName: '', email: '' });

  const { isOpen: isUserModalOpen, onOpen: onUserModalOpen, onClose: onUserModalClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const { data: apiUsers, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (apiUsers) setUsers(apiUsers);
  }, [apiUsers]);

  const handleViewDetail = (user) => {
    setSelectedUser(user);
    onUserModalOpen();
  };

  const startEditing = (user) => {
    setEditingId(user.id);
    setEditFormData({ firstName: user.firstName, lastName: user.lastName, email: user.email });
  };

  const handleSave = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...editFormData } : u));
    setEditingId(null);
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = (checked) => {
    setSelectedIds(checked ? users.map(u => u.id) : []);
  };

  const handleConfirmDelete = () => {
    setUsers(prev => prev.filter(u => !selectedIds.includes(u.id)));
    setSelectedIds([]);
    onDeleteClose();
  };

  return {
    users,
    isLoading,
    isError,
    selectedIds,
    editingId,
    editFormData,
    setEditFormData,
    selectedUser,
    isUserModalOpen,
    isDeleteOpen,
    actions: {
      onUserModalClose,
      onDeleteOpen,
      onDeleteClose,
      handleViewDetail,
      startEditing,
      cancelEditing: () => setEditingId(null),
      handleSave,
      handleConfirmDelete,
      toggleSelect,
      toggleSelectAll
    }
  };
};