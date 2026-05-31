import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/Layout';
import ExamPageComponent from '../../components/student/ExamPageComponent';
import api from '../../services/api';
import toast from 'react-hot-toast';

function ExamPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [attemptId, setAttemptId] = useState(location.state?.attemptId);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState(null);
  const [marksPerQuestion, setMarksPerQuestion] = useState(0);

  useEffect(() => {
    loadExam();
  }, [testId]);

  useEffect(() => {
    if (timeRemaining === null) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const loadExam = async () => {
    try {
      let currentAttemptId = attemptId;

      if (!currentAttemptId) {
        const activeAttempt = await api.get(`/student/exams/active/${testId}`);
        if (activeAttempt.data) {
          currentAttemptId = activeAttempt.data.id;
          setAttemptId(currentAttemptId);
        }
      }

      if (!currentAttemptId) {
        toast.error('No active attempt found');
        navigate('/student/tests');
        return;
      }

      const [attemptRes, questionsRes] = await Promise.all([
        api.get(`/student/exams/attempts/${currentAttemptId}`),
        api.get(`/student/exams/${currentAttemptId}/questions`)
      ]);

      setTest(attemptRes.data.attempt.test);
      setQuestions(questionsRes.data);

      const totalMarks = attemptRes.data.attempt.test.totalMarks;
      const totalQuestions = questionsRes.data.length;
      setMarksPerQuestion(totalQuestions > 0 ? totalMarks / totalQuestions : 0);

      const startTime = new Date(attemptRes.data.attempt.startTime);
      const duration = attemptRes.data.attempt.test.durationMinutes * 60;
      const elapsed = Math.floor((new Date() - startTime) / 1000);
      const remaining = Math.max(0, duration - elapsed);
      setTimeRemaining(remaining);
    } catch (error) {
      toast.error('Failed to load exam');
      navigate('/student/tests');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = async (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });

    try {
      await api.post(`/student/exams/answer?attemptId=${attemptId}`, {
        questionId,
        selectedOption: option
      });
    } catch (error) {
      console.error('Failed to save answer:', error);
    }
  };

  const handleSubmit = async (autoSubmit = false) => {
    try {
      const answerList = Object.entries(answers).map(([questionId, selectedOption]) => ({
        questionId: parseInt(questionId),
        selectedOption
      }));

      await api.post('/student/exams/submit', {
        attemptId,
        answers: answerList
      });

      toast.success(autoSubmit ? 'Time up! Exam auto-submitted' : 'Exam submitted successfully');
      navigate('/student/performance');
    } catch (error) {
      toast.error('Failed to submit exam');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <Layout role="STUDENT">
        <div className="px-4 py-6">Loading exam...</div>
      </Layout>
    );
  }

  return (
    <Layout role="STUDENT">
      <ExamPageComponent
        test={test}
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        answers={answers}
        timeRemaining={timeRemaining}
        marksPerQuestion={marksPerQuestion}
        onAnswerSelect={handleAnswerSelect}
        onSubmit={handleSubmit}
        onNavigate={setCurrentQuestionIndex}
        formatTime={formatTime}
      />
    </Layout>
  );
}

export default ExamPage;
