import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import TestManagementComponent from '../../components/admin/TestManagementComponent';
import api from '../../services/api';
import toast from 'react-hot-toast';

const blankQuestion = () => ({
  questionText: '',
  option1: '',
  option2: '',
  option3: '',
  option4: '',
  correctOption: 1,
  difficulty: 'MEDIUM'
});

function TestManagement() {
  const [tests, setTests] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subjectId: '',
    durationMinutes: '30',
    totalMarks: '100',
    passingMarks: '40'
  });
  const [inlineQuestions, setInlineQuestions] = useState([blankQuestion()]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [testsRes, subjectsRes] = await Promise.all([
        api.get('/admin/tests'),
        api.get('/admin/subjects')
      ]);
      setTests(testsRes.data);
      setSubjects(subjectsRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inlineQuestions.length === 0) {
      toast.error('Please add at least one question');
      return;
    }

    try {
      const total = parseInt(formData.totalMarks);
      const count = inlineQuestions.length;
      const marksPerQuestion = parseFloat((total / count).toFixed(2));

      const payload = {
        title: formData.title,
        description: formData.description,
        subjectId: parseInt(formData.subjectId),
        durationMinutes: parseInt(formData.durationMinutes),
        totalMarks: total,
        passingMarks: parseInt(formData.passingMarks),
        questions: inlineQuestions.map(q => ({
          ...q,
          correctOption: parseInt(q.correctOption),
          marks: marksPerQuestion
        }))
      };

      await api.post('/admin/tests', payload);
      toast.success('Test created successfully');
      setShowForm(false);
      resetForm();
      loadData();
    } catch (error) {
      toast.error(error.response?.data || 'Failed to create test');
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

  const handleCancel = () => {
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      subjectId: '',
      durationMinutes: '30',
      totalMarks: '100',
      passingMarks: '40'
    });
    setInlineQuestions([blankQuestion()]);
  };

  const addInlineQuestion = () => {
    setInlineQuestions(prev => [...prev, blankQuestion()]);
  };

  const removeInlineQuestion = (index) => {
    setInlineQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const updateInlineQuestion = (index, field, value) => {
    setInlineQuestions(prev =>
      prev.map((q, i) => i === index ? { ...q, [field]: value } : q)
    );
  };

  if (loading) return <Layout role="ADMIN"><div className="p-6">Loading...</div></Layout>;

  return (
    <Layout role="ADMIN">
      <TestManagementComponent
        tests={tests}
        subjects={subjects}
        showForm={showForm}
        formData={formData}
        inlineQuestions={inlineQuestions}
        onFormDataChange={setFormData}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        onCancel={handleCancel}
        onShowForm={() => setShowForm(true)}
        onAddInlineQuestion={addInlineQuestion}
        onRemoveInlineQuestion={removeInlineQuestion}
        onUpdateInlineQuestion={updateInlineQuestion}
        marksPerQuestion={
          inlineQuestions.length > 0 && formData.totalMarks
            ? parseFloat((parseInt(formData.totalMarks) / inlineQuestions.length).toFixed(2))
            : 0
        }
      />
    </Layout>
  );
}

export default TestManagement;
