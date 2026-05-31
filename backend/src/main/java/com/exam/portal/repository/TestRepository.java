package com.exam.portal.repository;

import com.exam.portal.model.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestRepository extends JpaRepository<Test, Long> {
    List<Test> findBySubjectId(Long subjectId);
    List<Test> findByCreatedById(Long userId);
    List<Test> findByIsActive(Boolean isActive);
    List<Test> findBySubjectIdAndIsActive(Long subjectId, Boolean isActive);
}
