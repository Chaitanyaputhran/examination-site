package com.exam.portal.service;

import com.exam.portal.dto.AnswerRequest;
import com.exam.portal.model.*;
import com.exam.portal.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ExamService {

    @Autowired
    private ExamAttemptRepository examAttemptRepository;

    @Autowired
    private StudentAnswerRepository studentAnswerRepository;

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public ExamAttempt startExam(Long studentId, Long testId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (!"STUDENT".equals(student.getRole())) {
            throw new RuntimeException("Only students can take exams");
        }

        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new RuntimeException("Test not found"));

        if (!test.getIsActive()) {
            throw new RuntimeException("Test is not active");
        }

        Optional<ExamAttempt> existingAttempt = examAttemptRepository
                .findByStudentIdAndTestIdAndStatus(studentId, testId, "IN_PROGRESS");

        if (existingAttempt.isPresent()) {
            throw new RuntimeException("You already have an active exam attempt");
        }

        ExamAttempt attempt = new ExamAttempt();
        attempt.setStudent(student);
        attempt.setTest(test);
        attempt.setStartTime(LocalDateTime.now());
        attempt.setStatus("IN_PROGRESS");
        attempt.setTotalQuestions(test.getQuestions().size());
        attempt.setUnanswered(test.getQuestions().size());
        attempt.setCorrectAnswers(0);
        attempt.setWrongAnswers(0);
        attempt.setScore(BigDecimal.ZERO);

        return examAttemptRepository.save(attempt);
    }

    public StudentAnswer saveAnswer(Long attemptId, AnswerRequest answerRequest) {
        ExamAttempt attempt = examAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Exam attempt not found"));

        if (!"IN_PROGRESS".equals(attempt.getStatus())) {
            throw new RuntimeException("Exam is not in progress");
        }

        Question question = questionRepository.findById(answerRequest.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found"));

        Optional<StudentAnswer> existingAnswer = studentAnswerRepository
                .findByExamAttemptIdAndQuestionId(attemptId, answerRequest.getQuestionId());

        StudentAnswer answer;
        if (existingAnswer.isPresent()) {
            answer = existingAnswer.get();
        } else {
            answer = new StudentAnswer();
            answer.setExamAttempt(attempt);
            answer.setQuestion(question);
        }

        answer.setSelectedOption(answerRequest.getSelectedOption());
        answer.setIsCorrect(answerRequest.getSelectedOption().equals(question.getCorrectOption()));
        answer.setAnsweredAt(LocalDateTime.now());

        return studentAnswerRepository.save(answer);
    }

    public ExamAttempt submitExam(Long attemptId) {
        ExamAttempt attempt = examAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Exam attempt not found"));

        if (!"IN_PROGRESS".equals(attempt.getStatus())) {
            throw new RuntimeException("Exam is not in progress");
        }

        List<StudentAnswer> answers = studentAnswerRepository.findByExamAttemptId(attemptId);

        int correctCount = 0;
        int wrongCount = 0;

        // Calculate marks per question: total marks / number of questions
        int testTotalMarks = attempt.getTest().getTotalMarks();
        int totalQuestions = attempt.getTotalQuestions();
        double marksPerQuestion = totalQuestions > 0 ? (double) testTotalMarks / totalQuestions : 0;

        double totalScore = 0;

        for (StudentAnswer answer : answers) {
            if (answer.getIsCorrect()) {
                correctCount++;
                totalScore += marksPerQuestion;
            } else if (answer.getSelectedOption() != null) {
                wrongCount++;
            }
        }

        int unansweredCount = totalQuestions - answers.size();

        attempt.setCorrectAnswers(correctCount);
        attempt.setWrongAnswers(wrongCount);
        attempt.setUnanswered(unansweredCount);
        attempt.setScore(BigDecimal.valueOf(totalScore));
        attempt.setEndTime(LocalDateTime.now());
        attempt.setStatus("COMPLETED");

        return examAttemptRepository.save(attempt);
    }

    public ExamAttempt getAttemptById(Long attemptId) {
        return examAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Exam attempt not found"));
    }

    public List<ExamAttempt> getStudentAttempts(Long studentId) {
        return examAttemptRepository.findByStudentId(studentId);
    }

    public List<ExamAttempt> getCompletedAttempts(Long studentId) {
        return examAttemptRepository.findCompletedAttemptsByStudent(studentId);
    }

    public List<StudentAnswer> getAttemptAnswers(Long attemptId) {
        return studentAnswerRepository.findByExamAttemptId(attemptId);
    }

    public ExamAttempt getActiveAttempt(Long studentId, Long testId) {
        return examAttemptRepository.findByStudentIdAndTestIdAndStatus(studentId, testId, "IN_PROGRESS")
                .orElse(null);
    }

    public List<ExamAttempt> getAllAttempts() {
        return examAttemptRepository.findAll();
    }

    public ExamAttempt updateAttemptScore(Long attemptId, Double newScore) {
        ExamAttempt attempt = examAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Exam attempt not found"));

        attempt.setScore(BigDecimal.valueOf(newScore));
        return examAttemptRepository.save(attempt);
    }
}
