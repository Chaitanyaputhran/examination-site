import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import TestManagementComponent from '../../components/admin/TestManagementComponent';
import api from '../../services/api';
import toast from 'react-hot-toast';

function TestManagement() {
  const [tests, setTests] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showQuestionSelector, setShowQuestionSelector] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subjectId: '',
    durationMinutes: '30',
    totalMarks: '100',
    passingMarks: '40'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [testsRes, subjectsRes, questionsRes] = await Promise.all([
        api.get('/admin/tests'),
        api.get('/admin/subjects'),
        api.get('/admin/questions')
      ]);
      setTests(testsRes.data);
      setSubjects(subjectsRes.data);
      setQuestions(questionsRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const createTest = async (payload) => {
    const response = await api.post('/admin/tests', payload);
    toast.success('Test created successfully');
    return response.data;
  };

  const addQuestionsToTest = async (testId, questionIds) => {
    await api.post(`/admin/tests/${testId}/questions`, questionIds);
    toast.success(`${questionIds.length} questions added to test`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        subject: { id: parseInt(formData.subjectId) },
        durationMinutes: parseInt(formData.durationMinutes),
        totalMarks: parseInt(formData.totalMarks),
        passingMarks: parseInt(formData.passingMarks)
      };

      const newTest = await createTest(payload);
      setSelectedTest(newTest);
      setShowForm(false);
      setShowQuestionSelector(true);
      loadData();
    } catch (error) {
      toast.error(error.response?.data || 'Failed to create test');
    }
  };

  const handleAddQuestions = async () => {
    if (selectedQuestions.length === 0) {
      toast.error('Please select at least one question');
      return;
    }

    try {
      await addQuestionsToTest(selectedTest.id, selectedQuestions);
      setShowQuestionSelector(false);
      setSelectedQuestions([]);
      setSelectedTest(null);
      loadData();
    } catch (error) {
      toast.error('Failed to add questions');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this test?')) return;

    try {
      await api.delete(`/admin/tests/${id}`);
      toast.success('Test deleted successfully');
      loadData();
    } catch (error) {
      toast.error('Failed to delete test');
    }
  };

  const handleManageQuestions = (test) => {
    setSelectedTest(test);
    setShowQuestionSelector(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      title: '',
      description: '',
      subjectId: '',
      durationMinutes: '30',
      totalMarks: '100',
      passingMarks: '40'
    });
  };

  const toggleQuestionSelection = (questionId) => {
    setSelectedQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleCancelQuestionSelector = () => {
    setShowQuestionSelector(false);
    setSelectedQuestions([]);
    setSelectedTest(null);
  };

  if (loading) return <Layout role="ADMIN"><div className="p-6">Loading...</div></Layout>;

  return (
    <Layout role="ADMIN">
      <TestManagementComponent
        tests={tests}
        subjects={subjects}
        questions={questions}
        showForm={showForm}
        showQuestionSelector={showQuestionSelector}
        selectedTest={selectedTest}
        selectedQuestions={selectedQuestions}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleSubmit}
        onAddQuestions={handleAddQuestions}
        onDelete={handleDelete}
        onCancel={handleCancel}
        onManageQuestions={handleManageQuestions}
        onToggleQuestionSelection={toggleQuestionSelection}
        onShowForm={() => setShowForm(true)}
        onCancelQuestionSelector={handleCancelQuestionSelector}
      />
    </Layout>
  );
}

export default TestManagement;
