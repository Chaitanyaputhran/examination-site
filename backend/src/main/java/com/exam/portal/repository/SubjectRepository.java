package com.exam.portal.repository;

import com.exam.portal.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Optional<Subject> findByName(String name);
    List<Subject> findByIsActive(Boolean isActive);
    Boolean existsByName(String name);
}
