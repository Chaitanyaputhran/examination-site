import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import PerformanceReportsComponent from '../../components/student/PerformanceReportsComponent';
import api from '../../services/api';
import toast from 'react-hot-toast';

function PerformanceReports() {
  const navigate = useNavigate();
  const [performance, setPerformance] = useState(null);
  const [subjectPerformance, setSubjectPerformance] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [perfRes, subjectRes, attemptsRes] = await Promise.all([
        api.get('/student/performance'),
        api.get('/student/performance/subjects'),
        api.get('/student/exams/attempts')
      ]);
      setPerformance(perfRes.data);
      setSubjectPerformance(subjectRes.data);
      setAttempts(attemptsRes.data);
    } catch (error) {
      toast.error('Failed to load performance data');
    } finally {
      setLoading(false);
    }
  };

  const handleViewReport = (attemptId) => {
    navigate(`/student/report/${attemptId}`);
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
      <PerformanceReportsComponent
        performance={performance}
        subjectPerformance={subjectPerformance}
        attempts={attempts}
        onViewReport={handleViewReport}
      />
    </Layout>
  );
}

export default PerformanceReports;
