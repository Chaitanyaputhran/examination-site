package com.exam.portal.service;

import com.exam.portal.model.Subject;
import com.exam.portal.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    public Subject createSubject(Subject subject) {
        if (subjectRepository.existsByName(subject.getName())) {
            throw new RuntimeException("Subject already exists");
        }
        return subjectRepository.save(subject);
    }

    public Subject updateSubject(Long id, Subject subjectDetails) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        if (subjectDetails.getName() != null && !subjectDetails.getName().equals(subject.getName())) {
            if (subjectRepository.existsByName(subjectDetails.getName())) {
                throw new RuntimeException("Subject name already exists");
            }
            subject.setName(subjectDetails.getName());
        }

        if (subjectDetails.getDescription() != null) {
            subject.setDescription(subjectDetails.getDescription());
        }
        if (subjectDetails.getIsActive() != null) {
            subject.setIsActive(subjectDetails.getIsActive());
        }

        return subjectRepository.save(subject);
    }

    public void deleteSubject(Long id) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        subjectRepository.delete(subject);
    }

    public Subject getSubjectById(Long id) {
        return subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));
    }

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public List<Subject> getActiveSubjects() {
        return subjectRepository.findByIsActive(true);
    }
}
