package com.exam.portal.dto;

import com.exam.portal.model.StudentAnswer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentAnswerDTO {
    private Long id;
    private Long questionId;
    private String questionText;
    private Integer selectedOption;
    private Boolean isCorrect;
    private LocalDateTime answeredAt;

    // Convert StudentAnswer entity to DTO
    public static StudentAnswerDTO fromEntity(StudentAnswer answer) {
        StudentAnswerDTO dto = new StudentAnswerDTO();
        dto.setId(answer.getId());
        dto.setSelectedOption(answer.getSelectedOption());
        dto.setIsCorrect(answer.getIsCorrect());
        dto.setAnsweredAt(answer.getAnsweredAt());

        if (answer.getQuestion() != null) {
            dto.setQuestionId(answer.getQuestion().getId());
            dto.setQuestionText(answer.getQuestion().getQuestionText());
        }

        return dto;
    }
}
