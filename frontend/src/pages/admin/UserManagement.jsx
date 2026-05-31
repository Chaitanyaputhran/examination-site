import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import UserManagementComponent from '../../components/admin/UserManagementComponent';
import api from '../../services/api';
import toast from 'react-hot-toast';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('ALL');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await api.delete(`/admin/users/${id}`);
      toast.success('User deleted successfully');
      loadUsers();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  if (loading) return <Layout role="ADMIN"><div>Loading...</div></Layout>;

  return (
    <Layout role="ADMIN">
      <UserManagementComponent
        users={users}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        onDelete={handleDelete}
      />
    </Layout>
  );
}

export default UserManagement;
