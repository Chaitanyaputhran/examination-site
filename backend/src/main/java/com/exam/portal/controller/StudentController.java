package com.exam.portal.controller;

import com.exam.portal.dto.AnswerRequest;
import com.exam.portal.dto.SubmitExamRequest;
import com.exam.portal.model.ExamAttempt;
import com.exam.portal.model.Question;
import com.exam.portal.model.StudentAnswer;
import com.exam.portal.model.Test;
import com.exam.portal.model.User;
import com.exam.portal.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/student")
@PreAuthorize("hasRole('STUDENT')")
@CrossOrigin(originPatterns = {"http://localhost:*"})
public class StudentController {

    @Autowired
    private TestService testService;

    @Autowired
    private ExamService examService;

    @Autowired
    private UserService userService;

    @Autowired
    private ReportService reportService;

    @Autowired
    private EmailService emailService;

    @GetMapping("/tests")
    public ResponseEntity<List<Test>> getAvailableTests() {
        return ResponseEntity.ok(testService.getActiveTests());
    }

    @GetMapping("/tests/{id}")
    public ResponseEntity<?> getTestById(@PathVariable Long id) {
        try {
            Test test = testService.getTestById(id);
            return ResponseEntity.ok(test);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/exams/start/{testId}")
    public ResponseEntity<?> startExam(@PathVariable Long testId, Authentication authentication) {
        try {
            String username = authentication.getName();
            User student = userService.getUserByUsername(username);
            ExamAttempt attempt = examService.startExam(student.getId(), testId);
            return ResponseEntity.ok(attempt);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/exams/active/{testId}")
    public ResponseEntity<?> getActiveAttempt(@PathVariable Long testId, Authentication authentication) {
        try {
            String username = authentication.getName();
            User student = userService.getUserByUsername(username);
            ExamAttempt attempt = examService.getActiveAttempt(student.getId(), testId);
            return ResponseEntity.ok(attempt);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/exams/{attemptId}/questions")
    public ResponseEntity<?> getExamQuestions(@PathVariable Long attemptId) {
        try {
            ExamAttempt attempt = examService.getAttemptById(attemptId);
            List<Question> questions = attempt.getTest().getQuestions();

            List<Map<String, Object>> questionList = questions.stream().map(q -> {
                Map<String, Object> qMap = Map.of(
                    "id", q.getId(),
                    "questionText", q.getQuestionText(),
                    "option1", q.getOption1(),
                    "option2", q.getOption2(),
                    "option3", q.getOption3(),
                    "option4", q.getOption4(),
                    "marks", q.getMarks()
                );
                return qMap;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(questionList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/exams/answer")
    public ResponseEntity<?> saveAnswer(@RequestBody AnswerRequest answerRequest,
                                       @RequestParam Long attemptId) {
        try {
            StudentAnswer answer = examService.saveAnswer(attemptId, answerRequest);
            return ResponseEntity.ok(answer);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/exams/submit")
    public ResponseEntity<?> submitExam(@RequestBody SubmitExamRequest request) {
        try {
            for (AnswerRequest answer : request.getAnswers()) {
                examService.saveAnswer(request.getAttemptId(), answer);
            }

            ExamAttempt result = examService.submitExam(request.getAttemptId());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/exams/attempts")
    public ResponseEntity<?> getMyAttempts(Authentication authentication) {
        try {
            String username = authentication.getName();
            User student = userService.getUserByUsername(username);
            List<ExamAttempt> attempts = examService.getCompletedAttempts(student.getId());
            return ResponseEntity.ok(attempts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/exams/attempts/{attemptId}")
    public ResponseEntity<?> getAttemptDetails(@PathVariable Long attemptId) {
        try {
            ExamAttempt attempt = examService.getAttemptById(attemptId);
            List<StudentAnswer> answers = examService.getAttemptAnswers(attemptId);

            Map<String, Object> result = Map.of(
                "attempt", attempt,
                "answers", answers
            );
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/exams/{attemptId}/answers")
    public ResponseEntity<?> getAttemptAnswers(@PathVariable Long attemptId) {
        try {
            List<StudentAnswer> answers = examService.getAttemptAnswers(attemptId);
            return ResponseEntity.ok(answers);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/performance")
    public ResponseEntity<?> getMyPerformance(Authentication authentication) {
        try {
            String username = authentication.getName();
            User student = userService.getUserByUsername(username);
            Map<String, Object> performance = reportService.getStudentPerformance(student.getId());
            return ResponseEntity.ok(performance);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/performance/subjects")
    public ResponseEntity<?> getSubjectWisePerformance(Authentication authentication) {
        try {
            String username = authentication.getName();
            User student = userService.getUserByUsername(username);
            Map<String, Object> performance = reportService.getSubjectWisePerformance(student.getId());
            return ResponseEntity.ok(performance);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/performance/test/{testId}")
    public ResponseEntity<?> getTestHistory(@PathVariable Long testId, Authentication authentication) {
        try {
            String username = authentication.getName();
            User student = userService.getUserByUsername(username);
            List<Map<String, Object>> history = reportService.getTestHistory(student.getId(), testId);
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/email-results/{attemptId}")
    public ResponseEntity<?> emailResults(@PathVariable Long attemptId, Authentication authentication) {
        try {
            String username = authentication.getName();
            User student = userService.getUserByUsername(username);
            ExamAttempt attempt = examService.getAttemptById(attemptId);

            if (!attempt.getStudent().getId().equals(student.getId())) {
                return ResponseEntity.badRequest().body("Unauthorized access");
            }

            emailService.sendExamResult(student.getEmail(), attempt);
            return ResponseEntity.ok("Email sent successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        try {
            String username = authentication.getName();
            User student = userService.getUserByUsername(username);
            return ResponseEntity.ok(student);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
