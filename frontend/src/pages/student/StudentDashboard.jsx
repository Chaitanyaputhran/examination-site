import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import StudentDashboardComponent from '../../components/student/StudentDashboardComponent';
import api from '../../services/api';

function StudentDashboard() {
  const [stats, setStats] = useState({
    totalAttempts: 0,
    averageScore: 0,
    highestScore: 0,
    lowestScore: 0,
    passedCount: 0,
    failedCount: 0,
    recentAttempts: []
  });
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [performanceRes, testsRes] = await Promise.all([
        api.get('/student/performance'),
        api.get('/student/tests')
      ]);
      setStats(performanceRes.data);
      setTests(testsRes.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout role="STUDENT">
        <div className="px-4 py-6">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout role="STUDENT">
      <StudentDashboardComponent stats={stats} tests={tests} />
    </Layout>
  );
}

export default StudentDashboard;
