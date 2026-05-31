package com.exam.portal.repository;

import com.exam.portal.model.Question;
import com.exam.portal.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findBySubject(Subject subject);
    List<Question> findBySubjectId(Long subjectId);
    List<Question> findByDifficulty(String difficulty);
    List<Question> findByIsActive(Boolean isActive);
    List<Question> findBySubjectIdAndIsActive(Long subjectId, Boolean isActive);
}
