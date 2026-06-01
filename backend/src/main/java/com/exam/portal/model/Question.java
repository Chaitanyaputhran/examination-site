package com.exam.portal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "test_id")
    private Test test;

    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = true)
    private Subject subject;

    @NotBlank(message = "Question text is required")
    @Column(name = "question_text", columnDefinition = "TEXT", nullable = false)
    private String questionText;

    @NotBlank(message = "Option 1 is required")
    @Column(length = 500, nullable = false)
    private String option1;

    @NotBlank(message = "Option 2 is required")
    @Column(length = 500, nullable = false)
    private String option2;

    @NotBlank(message = "Option 3 is required")
    @Column(length = 500, nullable = false)
    private String option3;

    @NotBlank(message = "Option 4 is required")
    @Column(length = 500, nullable = false)
    private String option4;

    @Min(value = 1, message = "Correct option must be between 1 and 4")
    @Max(value = 4, message = "Correct option must be between 1 and 4")
    @Column(name = "correct_option", nullable = false)
    private Integer correctOption;

    @DecimalMin(value = "0.01", message = "Marks must be greater than 0")
    @Column(nullable = false)
    private Double marks = 1.0;

    @Column(length = 20)
    private String difficulty = "MEDIUM"; // EASY, MEDIUM, HARD

    @Column(name = "is_active")
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public String getOptionByNumber(Integer optionNumber) {
        return switch (optionNumber) {
            case 1 -> option1;
            case 2 -> option2;
            case 3 -> option3;
            case 4 -> option4;
            default -> "";
        };
    }
}
