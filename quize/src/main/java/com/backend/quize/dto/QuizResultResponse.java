package com.backend.quize.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class QuizResultResponse {
    private int score;
    private int total;
    private double percentage;
    private String grade;
    private List<QuestionResultDto> results;

    @Data
    @Builder
    public static class QuestionResultDto {
        private Long questionId;
        private String questionText;
        private String selectedOption;
        private String correctOption;
        private boolean isCorrect;
        private String explanation;
    }
}
