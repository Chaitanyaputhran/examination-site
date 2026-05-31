package com.exam.portal.repository;

import com.exam.portal.model.StudentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentAnswerRepository extends JpaRepository<StudentAnswer, Long> {
    List<StudentAnswer> findByExamAttemptId(Long attemptId);
    Optional<StudentAnswer> findByExamAttemptIdAndQuestionId(Long attemptId, Long questionId);
    Long countByExamAttemptId(Long attemptId);
}
