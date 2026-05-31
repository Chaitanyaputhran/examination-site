package com.exam.portal.service;

import com.exam.portal.model.Question;
import com.exam.portal.model.Subject;
import com.exam.portal.repository.QuestionRepository;
import com.exam.portal.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    public Question createQuestion(Question question) {
        if (question.getSubject() == null || question.getSubject().getId() == null) {
            throw new RuntimeException("Subject is required");
        }
        Subject subject = subjectRepository.findById(question.getSubject().getId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        question.setSubject(subject);
        return questionRepository.save(question);
    }

    public Question updateQuestion(Long id, Question questionDetails) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        if (questionDetails.getQuestionText() != null) {
            question.setQuestionText(questionDetails.getQuestionText());
        }
        if (questionDetails.getOption1() != null) question.setOption1(questionDetails.getOption1());
        if (questionDetails.getOption2() != null) question.setOption2(questionDetails.getOption2());
        if (questionDetails.getOption3() != null) question.setOption3(questionDetails.getOption3());
        if (questionDetails.getOption4() != null) question.setOption4(questionDetails.getOption4());
        if (questionDetails.getCorrectOption() != null) question.setCorrectOption(questionDetails.getCorrectOption());
        if (questionDetails.getMarks() != null) question.setMarks(questionDetails.getMarks());
        if (questionDetails.getDifficulty() != null) question.setDifficulty(questionDetails.getDifficulty());
        if (questionDetails.getIsActive() != null) question.setIsActive(questionDetails.getIsActive());

        if (questionDetails.getSubject() != null && questionDetails.getSubject().getId() != null) {
            Subject subject = subjectRepository.findById(questionDetails.getSubject().getId())
                    .orElseThrow(() -> new RuntimeException("Subject not found"));
            question.setSubject(subject);
        }

        return questionRepository.save(question);
    }

    public void deleteQuestion(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        questionRepository.delete(question);
    }

    public Question getQuestionById(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public List<Question> getQuestionsBySubject(Long subjectId) {
        return questionRepository.findBySubjectId(subjectId);
    }

    public List<Question> getActiveQuestions() {
        return questionRepository.findByIsActive(true);
    }

    public List<Question> getQuestionsBySubjectAndActive(Long subjectId) {
        return questionRepository.findBySubjectIdAndIsActive(subjectId, true);
    }
}
