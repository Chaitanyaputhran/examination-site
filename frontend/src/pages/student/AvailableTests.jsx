import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import AvailableTestsComponent from '../../components/student/AvailableTestsComponent';
import api from '../../services/api';
import toast from 'react-hot-toast';

function AvailableTests() {
  const [tests, setTests] = useState([]);
  const [completedTestIds, setCompletedTestIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      const [testsRes, attemptsRes] = await Promise.all([
        api.get('/student/tests'),
        api.get('/student/exams/attempts')
      ]);
      setTests(testsRes.data);
      const ids = new Set(attemptsRes.data.map(a => a.test.id));
      setCompletedTestIds(ids);
    } catch (error) {
      toast.error('Failed to load tests');
    } finally {
      setLoading(false);
    }
  };

  const handleStartTest = async (testId) => {
    try {
      const response = await api.post(`/student/exams/start/${testId}`);
      toast.success('Test started! Good luck!');
      navigate(`/student/exam/${testId}`, { state: { attemptId: response.data.id } });
    } catch (error) {
      toast.error(error.response?.data || 'Failed to start test');
    }
  };

  if (loading) {
    return (
      <Layout role="STUDENT">
        <div className="px-4 py-6">
          <div className="text-center">Loading tests...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout role="STUDENT">
      <AvailableTestsComponent tests={tests} completedTestIds={completedTestIds} onStartTest={handleStartTest} />
    </Layout>
  );
}

export default AvailableTests;
