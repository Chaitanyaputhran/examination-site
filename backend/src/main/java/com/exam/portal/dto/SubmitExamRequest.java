package com.exam.portal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitExamRequest {
    private Long attemptId;
    private List<AnswerRequest> answers;
}
