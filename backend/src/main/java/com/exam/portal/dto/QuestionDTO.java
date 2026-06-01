package com.exam.portal.dto;

import lombok.Data;

@Data
public class QuestionDTO {
    private String questionText;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private Integer correctOption;
    private Double marks;
    private String difficulty;
}
