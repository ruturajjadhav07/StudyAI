package com.backend.quize.controllers;

import com.backend.quize.dto.QuizSubmitRequest;
import com.backend.quize.dto.ApiResponse;
import com.backend.quize.dto.QuizResultResponse;
import com.backend.quize.entity.Question;
import com.backend.quize.security.UserDetailsImpl;
import com.backend.quize.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @GetMapping("/{materialId}")
    public ResponseEntity<ApiResponse<List<Question>>> getQuiz(
            @PathVariable Long materialId) {
        List<Question> questions = quizService.getQuestionsForMaterial(materialId);
        return ResponseEntity.ok(ApiResponse.success(questions, "Questions fetched"));
    }

    @PostMapping("/submit")
    public ResponseEntity<ApiResponse<QuizResultResponse>> submitQuiz(
            @RequestBody QuizSubmitRequest request,
            @AuthenticationPrincipal UserDetailsImpl user) {
        QuizResultResponse result = quizService.submitQuiz(user.getId(), request);
        return ResponseEntity.ok(ApiResponse.success(result, "Quiz submitted"));
    }
}