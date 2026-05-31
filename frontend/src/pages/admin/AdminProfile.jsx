import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import AdminProfileComponent from '../../components/admin/AdminProfileComponent';
import api from '../../services/api';
import toast from 'react-hot-toast';

function AdminProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/admin/profile');
      setProfile(response.data);
    } catch (error) {
      toast.error('Failed to load profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Layout role="ADMIN">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-xl text-gray-600">Loading profile...</div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout role="ADMIN">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-xl text-red-600">Failed to load profile</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout role="ADMIN">
      <AdminProfileComponent profile={profile} formatDate={formatDate} />
    </Layout>
  );
}

export default AdminProfile;
