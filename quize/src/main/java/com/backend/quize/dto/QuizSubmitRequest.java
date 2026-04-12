package com.backend.quize.dto;


import lombok.Data;
import java.util.Map;

@Data
public class QuizSubmitRequest {
    private Long materialId;
    // key = questionId, value = selected option ("A","B","C","D")
    private Map<Long, String> answers;
}