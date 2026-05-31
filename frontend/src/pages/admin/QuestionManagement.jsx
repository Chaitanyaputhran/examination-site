import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import QuestionManagementComponent from '../../components/admin/QuestionManagementComponent';
import api from '../../services/api';
import toast from 'react-hot-toast';

function QuestionManagement() {
  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [formData, setFormData] = useState({
    subjectId: '',
    questionText: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctOption: '1',
    marks: '1',
    difficulty: 'MEDIUM'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [questionsRes, subjectsRes] = await Promise.all([
        api.get('/admin/questions'),
        api.get('/admin/subjects')
      ]);
      setQuestions(questionsRes.data);
      setSubjects(subjectsRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const createQuestion = async (payload) => {
    await api.post('/admin/questions', payload);
    toast.success('Question created successfully');
  };

  const updateQuestion = async (id, payload) => {
    await api.put(`/admin/questions/${id}`, payload);
    toast.success('Question updated successfully');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        subject: { id: parseInt(formData.subjectId) },
        questionText: formData.questionText,
        option1: formData.option1,
        option2: formData.option2,
        option3: formData.option3,
        option4: formData.option4,
        correctOption: parseInt(formData.correctOption),
        marks: parseInt(formData.marks),
        difficulty: formData.difficulty
      };

      if (editingQuestion) {
        await updateQuestion(editingQuestion.id, payload);
      } else {
        await createQuestion(payload);
      }
      handleCancel();
      loadData();
    } catch (error) {
      toast.error(error.response?.data || 'Failed to save question');
    }
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setFormData({
      subjectId: question.subject.id.toString(),
      questionText: question.questionText,
      option1: question.option1,
      option2: question.option2,
      option3: question.option3,
      option4: question.option4,
      correctOption: question.correctOption.toString(),
      marks: question.marks.toString(),
      difficulty: question.difficulty
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;

    try {
      await api.delete(`/admin/questions/${id}`);
      toast.success('Question deleted successfully');
      loadData();
    } catch (error) {
      toast.error('Failed to delete question');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      subjectId: '',
      questionText: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctOption: '1',
      marks: '1',
      difficulty: 'MEDIUM'
    });
    setEditingQuestion(null);
  };

  if (loading) return <Layout role="ADMIN"><div className="p-6">Loading...</div></Layout>;

  return (
    <Layout role="ADMIN">
      <QuestionManagementComponent
        questions={questions}
        subjects={subjects}
        showForm={showForm}
        editingQuestion={editingQuestion}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleSubmit}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCancel={handleCancel}
        onShowForm={() => setShowForm(true)}
      />
    </Layout>
  );
}

export default QuestionManagement;
