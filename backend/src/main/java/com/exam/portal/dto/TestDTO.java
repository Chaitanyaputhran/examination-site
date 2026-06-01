package com.exam.portal.dto;

import com.exam.portal.model.Test;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestDTO {
    private Long id;
    private String title;
    private String description;
    private SubjectBasicDTO subject;
    private Integer durationMinutes;
    private Integer totalMarks;
    private Integer passingMarks;
    private Integer questionCount;
    private Boolean isActive;
    private LocalDateTime createdAt;

    // Simple nested DTO for Subject
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SubjectBasicDTO {
        private Long id;
        private String name;
    }

    // Convert Test entity to DTO
    public static TestDTO fromEntity(Test test) {
        TestDTO dto = new TestDTO();
        dto.setId(test.getId());
        dto.setTitle(test.getTitle());
        dto.setDescription(test.getDescription());
        dto.setDurationMinutes(test.getDurationMinutes());
        dto.setTotalMarks(test.getTotalMarks());
        dto.setPassingMarks(test.getPassingMarks());
        dto.setQuestionCount(test.getQuestionCount());
        dto.setIsActive(test.getIsActive());
        dto.setCreatedAt(test.getCreatedAt());

        if (test.getSubject() != null) {
            dto.setSubject(new SubjectBasicDTO(
                test.getSubject().getId(),
                test.getSubject().getName()
            ));
        }

        return dto;
    }
}
