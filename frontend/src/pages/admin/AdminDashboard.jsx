import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import AdminDashboardComponent from '../../components/admin/AdminDashboardComponent';
import api from '../../services/api';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalSubjects: 0,
    totalQuestions: 0,
    totalTests: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [users, subjects, tests] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/subjects'),
        api.get('/admin/tests'),
      ]);

      const students = users.data.filter(u => u.role === 'STUDENT');
      const totalQuestions = tests.data.reduce((sum, t) => sum + (t.questionCount ?? 0), 0);

      setStats({
        totalUsers: users.data.length,
        totalStudents: students.length,
        totalSubjects: subjects.data.length,
        totalQuestions,
        totalTests: tests.data.length,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  return (
    <Layout role="ADMIN">
      <AdminDashboardComponent stats={stats} />
    </Layout>
  );
}

export default AdminDashboard;
