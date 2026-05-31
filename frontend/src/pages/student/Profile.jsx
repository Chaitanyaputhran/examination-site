import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';
import ProfileComponent from '../../components/student/ProfileComponent';
import api from '../../services/api';
import toast from 'react-hot-toast';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/student/profile');
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
      <Layout role="STUDENT">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-xl text-gray-600">Loading profile...</div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout role="STUDENT">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-xl text-red-600">Failed to load profile</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout role="STUDENT">
      <ProfileComponent profile={profile} formatDate={formatDate} />
    </Layout>
  );
}

export default Profile;
