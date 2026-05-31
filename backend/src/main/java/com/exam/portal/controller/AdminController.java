package com.exam.portal.controller;

import com.exam.portal.model.*;
import com.exam.portal.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private TestService testService;

    @Autowired
    private ReportService reportService;

    @Autowired
    private ExamService examService;

    // User Management
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(userService.getUserById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/users/role/{role}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable String role) {
        return ResponseEntity.ok(userService.getUsersByRole(role));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.updateUser(id, user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Subject Management
    @GetMapping("/subjects")
    public ResponseEntity<List<Subject>> getAllSubjects() {
        return ResponseEntity.ok(subjectService.getAllSubjects());
    }

    @GetMapping("/subjects/{id}")
    public ResponseEntity<?> getSubjectById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(subjectService.getSubjectById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/subjects")
    public ResponseEntity<?> createSubject(@Valid @RequestBody Subject subject) {
        try {
            return ResponseEntity.ok(subjectService.createSubject(subject));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/subjects/{id}")
    public ResponseEntity<?> updateSubject(@PathVariable Long id, @RequestBody Subject subject) {
        try {
            return ResponseEntity.ok(subjectService.updateSubject(id, subject));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/subjects/{id}")
    public ResponseEntity<?> deleteSubject(@PathVariable Long id) {
        try {
            subjectService.deleteSubject(id);
            return ResponseEntity.ok("Subject deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Question Management
    @GetMapping("/questions")
    public ResponseEntity<List<Question>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @GetMapping("/questions/{id}")
    public ResponseEntity<?> getQuestionById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(questionService.getQuestionById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/questions/subject/{subjectId}")
    public ResponseEntity<List<Question>> getQuestionsBySubject(@PathVariable Long subjectId) {
        return ResponseEntity.ok(questionService.getQuestionsBySubject(subjectId));
    }

    @PostMapping("/questions")
    public ResponseEntity<?> createQuestion(@Valid @RequestBody Question question) {
        try {
            return ResponseEntity.ok(questionService.createQuestion(question));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/questions/{id}")
    public ResponseEntity<?> updateQuestion(@PathVariable Long id, @RequestBody Question question) {
        try {
            return ResponseEntity.ok(questionService.updateQuestion(id, question));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/questions/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        try {
            questionService.deleteQuestion(id);
            return ResponseEntity.ok("Question deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Test Management
    @GetMapping("/tests")
    public ResponseEntity<List<Test>> getAllTests() {
        return ResponseEntity.ok(testService.getAllTests());
    }

    @GetMapping("/tests/{id}")
    public ResponseEntity<?> getTestById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(testService.getTestById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/tests")
    public ResponseEntity<?> createTest(@Valid @RequestBody Test test, Authentication authentication) {
        try {
            String username = authentication.getName();
            User admin = userService.getUserByUsername(username);
            return ResponseEntity.ok(testService.createTest(test, admin.getId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/tests/{id}")
    public ResponseEntity<?> updateTest(@PathVariable Long id, @RequestBody Test test) {
        try {
            return ResponseEntity.ok(testService.updateTest(id, test));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/tests/{id}")
    public ResponseEntity<?> deleteTest(@PathVariable Long id) {
        try {
            testService.deleteTest(id);
            return ResponseEntity.ok("Test deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/tests/{testId}/questions/{questionId}")
    public ResponseEntity<?> addQuestionToTest(@PathVariable Long testId, @PathVariable Long questionId) {
        try {
            return ResponseEntity.ok(testService.addQuestionToTest(testId, questionId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/tests/{testId}/questions/{questionId}")
    public ResponseEntity<?> removeQuestionFromTest(@PathVariable Long testId, @PathVariable Long questionId) {
        try {
            return ResponseEntity.ok(testService.removeQuestionFromTest(testId, questionId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/tests/{testId}/questions")
    public ResponseEntity<?> addMultipleQuestions(@PathVariable Long testId, @RequestBody List<Long> questionIds) {
        try {
            return ResponseEntity.ok(testService.addMultipleQuestionsToTest(testId, questionIds));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Reports
    @GetMapping("/reports/students")
    public ResponseEntity<Map<String, Object>> getAllStudentsReport() {
        return ResponseEntity.ok(reportService.getAllStudentsReport());
    }

    @GetMapping("/reports/subjects")
    public ResponseEntity<Map<String, Object>> getSubjectWiseReport() {
        return ResponseEntity.ok(reportService.getSubjectWiseReport());
    }

    // Exam Attempts Management
    @GetMapping("/attempts")
    public ResponseEntity<?> getAllAttempts() {
        try {
            return ResponseEntity.ok(examService.getAllAttempts());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/attempts/{id}")
    public ResponseEntity<?> getAttemptById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(examService.getAttemptById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/attempts/{id}/score")
    public ResponseEntity<?> updateAttemptScore(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        try {
            Double newScore = Double.valueOf(payload.get("score").toString());
            return ResponseEntity.ok(examService.updateAttemptScore(id, newScore));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        try {
            String username = authentication.getName();
            User admin = userService.getUserByUsername(username);
            return ResponseEntity.ok(admin);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
