package com.backend.quize.dto;

import com.backend.quize.entity.Question;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuestionResponse {
    private Long id;
    private String questionText;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctOption;
    private String explanation;
    private Question.Difficulty difficulty;
}