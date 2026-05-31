package com.exam.portal.service;

import com.exam.portal.model.Question;
import com.exam.portal.model.Subject;
import com.exam.portal.model.Test;
import com.exam.portal.model.User;
import com.exam.portal.repository.QuestionRepository;
import com.exam.portal.repository.SubjectRepository;
import com.exam.portal.repository.TestRepository;
import com.exam.portal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class TestService {

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public Test createTest(Test test, Long createdByUserId) {
        Subject subject = subjectRepository.findById(test.getSubject().getId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        User createdBy = userRepository.findById(createdByUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        test.setSubject(subject);
        test.setCreatedBy(createdBy);
        test.setIsActive(true);

        return testRepository.save(test);
    }

    public Test updateTest(Long id, Test testDetails) {
        Test test = testRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test not found"));

        if (testDetails.getTitle() != null) test.setTitle(testDetails.getTitle());
        if (testDetails.getDescription() != null) test.setDescription(testDetails.getDescription());
        if (testDetails.getDurationMinutes() != null) test.setDurationMinutes(testDetails.getDurationMinutes());
        if (testDetails.getTotalMarks() != null) test.setTotalMarks(testDetails.getTotalMarks());
        if (testDetails.getPassingMarks() != null) test.setPassingMarks(testDetails.getPassingMarks());
        if (testDetails.getIsActive() != null) test.setIsActive(testDetails.getIsActive());

        if (testDetails.getSubject() != null && testDetails.getSubject().getId() != null) {
            Subject subject = subjectRepository.findById(testDetails.getSubject().getId())
                    .orElseThrow(() -> new RuntimeException("Subject not found"));
            test.setSubject(subject);
        }

        return testRepository.save(test);
    }

    public void deleteTest(Long id) {
        Test test = testRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test not found"));
        testRepository.delete(test);
    }

    public Test getTestById(Long id) {
        return testRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test not found"));
    }

    public List<Test> getAllTests() {
        return testRepository.findAll();
    }

    public List<Test> getActiveTests() {
        return testRepository.findByIsActive(true);
    }

    public List<Test> getTestsBySubject(Long subjectId) {
        return testRepository.findBySubjectId(subjectId);
    }

    public Test addQuestionToTest(Long testId, Long questionId) {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new RuntimeException("Test not found"));
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        if (test.getQuestions() == null) {
            test.setQuestions(new HashSet<>());
        }
        test.getQuestions().add(question);

        return testRepository.save(test);
    }

    public Test removeQuestionFromTest(Long testId, Long questionId) {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new RuntimeException("Test not found"));
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        if (test.getQuestions() != null) {
            test.getQuestions().remove(question);
        }

        return testRepository.save(test);
    }

    public Test addMultipleQuestionsToTest(Long testId, List<Long> questionIds) {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new RuntimeException("Test not found"));

        if (test.getQuestions() == null) {
            test.setQuestions(new HashSet<>());
        }

        for (Long questionId : questionIds) {
            Question question = questionRepository.findById(questionId)
                    .orElseThrow(() -> new RuntimeException("Question not found: " + questionId));
            test.getQuestions().add(question);
        }

        return testRepository.save(test);
    }

    public Set<Question> getTestQuestions(Long testId) {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new RuntimeException("Test not found"));
        return test.getQuestions();
    }
}
