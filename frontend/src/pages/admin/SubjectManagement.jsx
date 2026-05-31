import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import SubjectManagementComponent from '../../components/admin/SubjectManagementComponent';
import api from '../../services/api';
import toast from 'react-hot-toast';

function SubjectManagement() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const response = await api.get('/admin/subjects');
      setSubjects(response.data);
    } catch (error) {
      toast.error('Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  const createSubject = async (data) => {
    await api.post('/admin/subjects', data);
    toast.success('Subject created successfully');
  };

  const updateSubject = async (id, data) => {
    await api.put(`/admin/subjects/${id}`, data);
    toast.success('Subject updated successfully');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSubject) {
        await updateSubject(editingSubject.id, formData);
      } else {
        await createSubject(formData);
      }
      setShowForm(false);
      setFormData({ name: '', description: '' });
      setEditingSubject(null);
      loadSubjects();
    } catch (error) {
      toast.error(error.response?.data || 'Failed to save subject');
    }
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      description: subject.description || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subject?')) return;

    try {
      await api.delete(`/admin/subjects/${id}`);
      toast.success('Subject deleted successfully');
      loadSubjects();
    } catch (error) {
      toast.error('Failed to delete subject');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({ name: '', description: '' });
    setEditingSubject(null);
  };

  if (loading) return <Layout role="ADMIN"><div className="p-6">Loading...</div></Layout>;

  return (
    <Layout role="ADMIN">
      <SubjectManagementComponent
        subjects={subjects}
        showForm={showForm}
        editingSubject={editingSubject}
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

export default SubjectManagement;
