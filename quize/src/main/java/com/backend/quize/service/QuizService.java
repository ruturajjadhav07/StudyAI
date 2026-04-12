package com.backend.quize.service;

import com.backend.quize.dto.QuizSubmitRequest;
import com.backend.quize.dto.QuizResultResponse;
import com.backend.quize.entity.*;
import com.backend.quize.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuestionRepository questionRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final StudyMaterialRepository materialRepository;
    private final UserRepository userRepository;

    public List<Question> getQuestionsForMaterial(Long materialId) {
        return questionRepository.findByStudyMaterialId(materialId);
    }

    public QuizResultResponse submitQuiz(Long userId, QuizSubmitRequest request) {
        List<Question> questions =
                questionRepository.findByStudyMaterialId(request.getMaterialId());

        Map<Long, Question> questionMap = questions.stream()
                .collect(Collectors.toMap(Question::getId, q -> q));

        int score = 0;
        List<QuizResultResponse.QuestionResultDto> results = new ArrayList<>();

        for (Map.Entry<Long, String> entry : request.getAnswers().entrySet()) {
            Long questionId = entry.getKey();
            String selected = entry.getValue();
            Question q = questionMap.get(questionId);

            if (q == null) continue;

            boolean correct = q.getCorrectOption().equalsIgnoreCase(selected);
            if (correct) score++;

            results.add(QuizResultResponse.QuestionResultDto.builder()
                    .questionId(questionId)
                    .questionText(q.getQuestionText())
                    .selectedOption(selected)
                    .correctOption(q.getCorrectOption())
                    .isCorrect(correct)
                    .explanation(q.getExplanation())
                    .build());
        }

        int total = questions.size();
        double percentage = total > 0 ? (score * 100.0) / total : 0;

        // Save attempt
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        StudyMaterial material = materialRepository.findById(request.getMaterialId())
                .orElseThrow(() -> new RuntimeException("Material not found"));

        quizAttemptRepository.save(QuizAttempt.builder()
                .user(user)
                .studyMaterial(material)
                .score(score)
                .total(total)
                .build());

        return QuizResultResponse.builder()
                .score(score)
                .total(total)
                .percentage(percentage)
                .grade(calculateGrade(percentage))
                .results(results)
                .build();
    }

    private String calculateGrade(double percentage) {
        if (percentage >= 90) return "A+";
        if (percentage >= 80) return "A";
        if (percentage >= 70) return "B";
        if (percentage >= 60) return "C";
        if (percentage >= 50) return "D";
        return "F";
    }
}