package com.exam.portal.controller;

import com.exam.portal.dto.CreateTestRequest;
import com.exam.portal.dto.CreateUserRequest;
import com.exam.portal.dto.QuestionDTO;
import com.exam.portal.dto.UpdateUserRequest;
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
@CrossOrigin(originPatterns = {"http://localhost:*"})
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private SubjectService subjectService;

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

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUserRequest request) {
        try {
            return ResponseEntity.ok(userService.createUserByAdmin(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody UpdateUserRequest request) {
        try {
            return ResponseEntity.ok(userService.updateUserByAdmin(id, request));
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

    // Question Management (questions are managed per-test, not globally)
    // No standalone /admin/questions endpoints

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
    public ResponseEntity<?> createTest(@RequestBody CreateTestRequest request, Authentication authentication) {
        try {
            String username = authentication.getName();
            User admin = userService.getUserByUsername(username);
            return ResponseEntity.ok(testService.createTest(request, admin.getId()));
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

    @PostMapping("/tests/{testId}/questions")
    public ResponseEntity<?> addQuestionToTest(@PathVariable Long testId, @RequestBody QuestionDTO questionDTO) {
        try {
            return ResponseEntity.ok(testService.addQuestionToTest(testId, questionDTO));
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
