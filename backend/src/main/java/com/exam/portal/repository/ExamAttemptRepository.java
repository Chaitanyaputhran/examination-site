package com.exam.portal.repository;

import com.exam.portal.model.ExamAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamAttemptRepository extends JpaRepository<ExamAttempt, Long> {
    List<ExamAttempt> findByStudentId(Long studentId);
    List<ExamAttempt> findByTestId(Long testId);
    List<ExamAttempt> findByStudentIdAndTestId(Long studentId, Long testId);
    List<ExamAttempt> findByStatus(String status);

    Optional<ExamAttempt> findByStudentIdAndTestIdAndStatus(Long studentId, Long testId, String status);

    @Query("SELECT COUNT(e) FROM ExamAttempt e WHERE e.student.id = :studentId AND e.test.id = :testId AND e.status = 'COMPLETED'")
    Long countCompletedAttemptsByStudentAndTest(@Param("studentId") Long studentId, @Param("testId") Long testId);

    @Query("SELECT e FROM ExamAttempt e WHERE e.student.id = :studentId AND e.status = 'COMPLETED' ORDER BY e.createdAt DESC")
    List<ExamAttempt> findCompletedAttemptsByStudent(@Param("studentId") Long studentId);

    @Query("SELECT AVG(e.score) FROM ExamAttempt e WHERE e.student.id = :studentId AND e.test.subject.id = :subjectId AND e.status = 'COMPLETED'")
    Double getAverageScoreBySubject(@Param("studentId") Long studentId, @Param("subjectId") Long subjectId);

    @Query("SELECT MIN(e.score) FROM ExamAttempt e WHERE e.student.id = :studentId AND e.test.subject.id = :subjectId AND e.status = 'COMPLETED'")
    Double getMinScoreBySubject(@Param("studentId") Long studentId, @Param("subjectId") Long subjectId);

    @Query("SELECT MAX(e.score) FROM ExamAttempt e WHERE e.student.id = :studentId AND e.test.subject.id = :subjectId AND e.status = 'COMPLETED'")
    Double getMaxScoreBySubject(@Param("studentId") Long studentId, @Param("subjectId") Long subjectId);
}
