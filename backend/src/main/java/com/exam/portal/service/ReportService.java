package com.exam.portal.service;

import com.exam.portal.model.ExamAttempt;
import com.exam.portal.model.Subject;
import com.exam.portal.repository.ExamAttemptRepository;
import com.exam.portal.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReportService {

    @Autowired
    private ExamAttemptRepository examAttemptRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    public Map<String, Object> getStudentPerformance(Long studentId) {
        List<ExamAttempt> attempts = examAttemptRepository.findCompletedAttemptsByStudent(studentId);

        Map<String, Object> performance = new HashMap<>();
        performance.put("totalAttempts", attempts.size());

        if (attempts.isEmpty()) {
            performance.put("averageScore", 0.0);
            performance.put("highestScore", 0.0);
            performance.put("lowestScore", 0.0);
            performance.put("passedCount", 0);
            performance.put("failedCount", 0);
            return performance;
        }

        double avgScore = attempts.stream()
                .mapToDouble(a -> a.getScore().doubleValue())
                .average()
                .orElse(0.0);

        double highestScore = attempts.stream()
                .mapToDouble(a -> a.getScore().doubleValue())
                .max()
                .orElse(0.0);

        double lowestScore = attempts.stream()
                .mapToDouble(a -> a.getScore().doubleValue())
                .min()
                .orElse(0.0);

        long passedCount = attempts.stream().filter(ExamAttempt::isPassed).count();
        long failedCount = attempts.size() - passedCount;

        performance.put("averageScore", avgScore);
        performance.put("highestScore", highestScore);
        performance.put("lowestScore", lowestScore);
        performance.put("passedCount", passedCount);
        performance.put("failedCount", failedCount);
        performance.put("recentAttempts", attempts.stream().limit(10).collect(Collectors.toList()));

        return performance;
    }

    public Map<String, Object> getSubjectWisePerformance(Long studentId) {
        List<ExamAttempt> attempts = examAttemptRepository.findCompletedAttemptsByStudent(studentId);
        List<Subject> subjects = subjectRepository.findByIsActive(true);

        Map<String, Object> subjectPerformance = new HashMap<>();

        for (Subject subject : subjects) {
            List<ExamAttempt> subjectAttempts = attempts.stream()
                    .filter(a -> a.getTest().getSubject().getId().equals(subject.getId()))
                    .collect(Collectors.toList());

            if (!subjectAttempts.isEmpty()) {
                Map<String, Object> stats = new HashMap<>();
                stats.put("subjectName", subject.getName());
                stats.put("attemptCount", subjectAttempts.size());

                double avg = subjectAttempts.stream()
                        .mapToDouble(a -> a.getScore().doubleValue())
                        .average()
                        .orElse(0.0);

                double min = subjectAttempts.stream()
                        .mapToDouble(a -> a.getScore().doubleValue())
                        .min()
                        .orElse(0.0);

                double max = subjectAttempts.stream()
                        .mapToDouble(a -> a.getScore().doubleValue())
                        .max()
                        .orElse(0.0);

                stats.put("averageScore", avg);
                stats.put("minScore", min);
                stats.put("maxScore", max);

                subjectPerformance.put(subject.getName(), stats);
            }
        }

        return subjectPerformance;
    }

    public List<Map<String, Object>> getTestHistory(Long studentId, Long testId) {
        List<ExamAttempt> attempts = examAttemptRepository.findByStudentIdAndTestId(studentId, testId)
                .stream()
                .filter(a -> "COMPLETED".equals(a.getStatus()))
                .sorted(Comparator.comparing(ExamAttempt::getCreatedAt).reversed())
                .collect(Collectors.toList());

        return attempts.stream().map(attempt -> {
            Map<String, Object> attemptData = new HashMap<>();
            attemptData.put("attemptId", attempt.getId());
            attemptData.put("attemptNumber", attempts.indexOf(attempt) + 1);
            attemptData.put("score", attempt.getScore());
            attemptData.put("percentage", attempt.getPercentage());
            attemptData.put("passed", attempt.isPassed());
            attemptData.put("correctAnswers", attempt.getCorrectAnswers());
            attemptData.put("wrongAnswers", attempt.getWrongAnswers());
            attemptData.put("unanswered", attempt.getUnanswered());
            attemptData.put("date", attempt.getCreatedAt());
            return attemptData;
        }).collect(Collectors.toList());
    }

    public Map<String, Object> getAllStudentsReport() {
        List<ExamAttempt> allAttempts = examAttemptRepository.findByStatus("COMPLETED");

        Map<Long, List<ExamAttempt>> studentAttempts = allAttempts.stream()
                .collect(Collectors.groupingBy(a -> a.getStudent().getId()));

        List<Map<String, Object>> studentReports = new ArrayList<>();

        for (Map.Entry<Long, List<ExamAttempt>> entry : studentAttempts.entrySet()) {
            List<ExamAttempt> attempts = entry.getValue();
            if (!attempts.isEmpty()) {
                Map<String, Object> report = new HashMap<>();
                report.put("studentId", entry.getKey());
                report.put("studentName", attempts.get(0).getStudent().getFullName());
                report.put("totalAttempts", attempts.size());

                double avgScore = attempts.stream()
                        .mapToDouble(a -> a.getScore().doubleValue())
                        .average()
                        .orElse(0.0);

                report.put("averageScore", avgScore);
                report.put("passedCount", attempts.stream().filter(ExamAttempt::isPassed).count());

                studentReports.add(report);
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("totalStudents", studentReports.size());
        result.put("students", studentReports);

        return result;
    }

    public Map<String, Object> getSubjectWiseReport() {
        List<ExamAttempt> allAttempts = examAttemptRepository.findByStatus("COMPLETED");

        Map<Long, List<ExamAttempt>> subjectAttempts = allAttempts.stream()
                .collect(Collectors.groupingBy(a -> a.getTest().getSubject().getId()));

        List<Map<String, Object>> subjectReports = new ArrayList<>();

        for (Map.Entry<Long, List<ExamAttempt>> entry : subjectAttempts.entrySet()) {
            List<ExamAttempt> attempts = entry.getValue();
            if (!attempts.isEmpty()) {
                Map<String, Object> report = new HashMap<>();
                report.put("subjectId", entry.getKey());
                report.put("subjectName", attempts.get(0).getTest().getSubject().getName());
                report.put("totalAttempts", attempts.size());

                double avgScore = attempts.stream()
                        .mapToDouble(a -> a.getScore().doubleValue())
                        .average()
                        .orElse(0.0);

                report.put("averageScore", avgScore);

                Set<Long> uniqueStudents = attempts.stream()
                        .map(a -> a.getStudent().getId())
                        .collect(Collectors.toSet());

                report.put("uniqueStudents", uniqueStudents.size());

                subjectReports.add(report);
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("totalSubjects", subjectReports.size());
        result.put("subjects", subjectReports);

        return result;
    }
}
