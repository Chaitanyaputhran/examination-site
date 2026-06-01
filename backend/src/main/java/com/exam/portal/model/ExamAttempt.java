package com.exam.portal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "exam_attempts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne
    @JoinColumn(name = "test_id", nullable = false)
    private Test test;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(precision = 5, scale = 2)
    private BigDecimal score = BigDecimal.ZERO;

    @Column(name = "total_questions")
    private Integer totalQuestions = 0;

    @Column(name = "correct_answers")
    private Integer correctAnswers = 0;

    @Column(name = "wrong_answers")
    private Integer wrongAnswers = 0;

    @Column(name = "unanswered")
    private Integer unanswered = 0;

    @Column(length = 20, nullable = false)
    private String status = "IN_PROGRESS"; // IN_PROGRESS, COMPLETED, ABANDONED, EXPIRED

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public boolean isPassed() {
        if (test != null && score != null) {
            return score.compareTo(BigDecimal.valueOf(test.getPassingMarks())) >= 0;
        }
        return false;
    }

    public Double getPercentage() {
        if (test != null && test.getTotalMarks() != null && test.getTotalMarks() > 0) {
            return (score.doubleValue() / test.getTotalMarks()) * 100;
        }
        return 0.0;
    }
}
