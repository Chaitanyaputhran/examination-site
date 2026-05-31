import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import AdminReportsComponent from '../../components/admin/AdminReportsComponent';
import api from '../../services/api';
import toast from 'react-hot-toast';

function AdminReports() {
  const [studentReport, setStudentReport] = useState(null);
  const [subjectReport, setSubjectReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('students');

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const [studentsRes, subjectsRes] = await Promise.all([
        api.get('/admin/reports/students'),
        api.get('/admin/reports/subjects')
      ]);
      setStudentReport(studentsRes.data);
      setSubjectReport(subjectsRes.data);
    } catch (error) {
      toast.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Layout role="ADMIN"><div className="p-6">Loading...</div></Layout>;

  return (
    <Layout role="ADMIN">
      <AdminReportsComponent
        studentReport={studentReport}
        subjectReport={subjectReport}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </Layout>
  );
}

export default AdminReports;
