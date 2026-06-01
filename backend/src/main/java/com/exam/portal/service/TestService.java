package com.exam.portal.service;

import com.exam.portal.dto.CreateTestRequest;
import com.exam.portal.dto.QuestionDTO;
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

import java.util.List;

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

    public Test createTest(CreateTestRequest request, Long createdByUserId) {
        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        User createdBy = userRepository.findById(createdByUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Test test = new Test();
        test.setTitle(request.getTitle());
        test.setDescription(request.getDescription());
        test.setSubject(subject);
        test.setDurationMinutes(request.getDurationMinutes());
        test.setTotalMarks(request.getTotalMarks());
        test.setPassingMarks(request.getPassingMarks());
        test.setCreatedBy(createdBy);
        test.setIsActive(true);

        if (request.getQuestions() != null) {
            for (QuestionDTO dto : request.getQuestions()) {
                Question q = new Question();
                q.setQuestionText(dto.getQuestionText());
                q.setOption1(dto.getOption1());
                q.setOption2(dto.getOption2());
                q.setOption3(dto.getOption3());
                q.setOption4(dto.getOption4());
                q.setCorrectOption(dto.getCorrectOption());
                q.setMarks(dto.getMarks() != null ? dto.getMarks() : 1.0);
                q.setDifficulty(dto.getDifficulty() != null ? dto.getDifficulty() : "MEDIUM");
                q.setSubject(subject);
                q.setTest(test);
                q.setIsActive(true);
                test.getQuestions().add(q);
            }
        }

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

    public Test addQuestionToTest(Long testId, QuestionDTO dto) {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new RuntimeException("Test not found"));

        Question q = new Question();
        q.setQuestionText(dto.getQuestionText());
        q.setOption1(dto.getOption1());
        q.setOption2(dto.getOption2());
        q.setOption3(dto.getOption3());
        q.setOption4(dto.getOption4());
        q.setCorrectOption(dto.getCorrectOption());
        q.setMarks(dto.getMarks() != null ? dto.getMarks() : 1.0);
        q.setDifficulty(dto.getDifficulty() != null ? dto.getDifficulty() : "MEDIUM");
        q.setSubject(test.getSubject());
        q.setTest(test);
        q.setIsActive(true);
        test.getQuestions().add(q);

        return testRepository.save(test);
    }

    public Test removeQuestionFromTest(Long testId, Long questionId) {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new RuntimeException("Test not found"));
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        test.getQuestions().remove(question);

        return testRepository.save(test);
    }

    public List<Question> getTestQuestions(Long testId) {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new RuntimeException("Test not found"));
        return test.getQuestions();
    }
}
