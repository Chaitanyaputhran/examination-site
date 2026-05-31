import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RegisterComponent from '../components/auth/RegisterComponent';
import toast from 'react-hot-toast';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'STUDENT',
    firstName: '',
    lastName: '',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await register(formData);
      toast.success('Registration successful!');
      navigate(user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard');
    } catch (error) {
      toast.error(error.response?.data || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterComponent
      formData={formData}
      loading={loading}
      onSubmit={handleSubmit}
      onChange={handleChange}
    />
  );
}

export default Register;
