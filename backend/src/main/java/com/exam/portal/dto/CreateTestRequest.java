package com.exam.portal.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreateTestRequest {
    private String title;
    private String description;
    private Long subjectId;
    private Integer durationMinutes;
    private Integer totalMarks;
    private Integer passingMarks;
    private List<QuestionDTO> questions;
}
