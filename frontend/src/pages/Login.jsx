import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginComponent from '../components/auth/LoginComponent';
import toast from 'react-hot-toast';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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
      const user = await login(formData);
      toast.success('Login successful!');
      navigate(user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard');
    } catch (error) {
      toast.error(error.response?.data || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginComponent
      formData={formData}
      loading={loading}
      onSubmit={handleSubmit}
      onChange={handleChange}
    />
  );
}

export default Login;
