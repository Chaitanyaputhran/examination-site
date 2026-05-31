import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import TestReportComponent from '../../components/student/TestReportComponent';
import api from '../../services/api';
import toast from 'react-hot-toast';

function TestReport() {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marksPerQuestion, setMarksPerQuestion] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    loadReport();
  }, [attemptId]);

  const loadReport = async () => {
    try {
      const [attemptRes, answersRes] = await Promise.all([
        api.get(`/student/exams/attempts/${attemptId}`),
        api.get(`/student/exams/${attemptId}/answers`)
      ]);

      setAttempt(attemptRes.data.attempt);
      setAnswers(answersRes.data);

      const totalMarks = attemptRes.data.attempt.test.totalMarks;
      const totalQuestions = attemptRes.data.attempt.totalQuestions;
      setMarksPerQuestion(totalQuestions > 0 ? totalMarks / totalQuestions : 0);
    } catch (error) {
      toast.error('Failed to load report');
      navigate('/student/performance');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailResults = async () => {
    setSendingEmail(true);
    try {
      await api.post(`/student/email-results/${attemptId}`);
      setSendingEmail(false);
      setShowEmailModal(true);
    } catch (error) {
      setSendingEmail(false);
      const errorMessage = error.response?.data || 'Failed to send email. Please check your email configuration.';
      toast.error(errorMessage);
      console.error('Email error:', error);
    }
  };

  if (loading) {
    return (
      <Layout role="STUDENT">
        <div className="px-4 py-6">Loading report...</div>
      </Layout>
    );
  }

  if (!attempt) {
    return (
      <Layout role="STUDENT">
        <div className="px-4 py-6">Report not found</div>
      </Layout>
    );
  }

  return (
    <Layout role="STUDENT">
      <TestReportComponent
        attempt={attempt}
        answers={answers}
        marksPerQuestion={marksPerQuestion}
        showEmailModal={showEmailModal}
        sendingEmail={sendingEmail}
        onEmailResults={handleEmailResults}
        onCloseModal={() => setShowEmailModal(false)}
      />
    </Layout>
  );
}

export default TestReport;
