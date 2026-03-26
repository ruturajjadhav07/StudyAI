package com.backend.quize.controllers;


import com.backend.quize.dtos.ApiResponse;
import com.backend.quize.entities.*;
import com.backend.quize.repository.FlashcardRepository;
import com.backend.quize.repository.SummaryRepository;
import com.backend.quize.service.aiService.AiService;
import com.backend.quize.service.studyMaterial.StudyMaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    @Value("${app.gemini.api-key}")
    private String apiKey;

    private final AiService              aiService;
    private final StudyMaterialService   materialService;
    private final SummaryRepository summaryRepository;
    private final FlashcardRepository flashcardRepository;

    @GetMapping("/study-data/{materialId}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getStudyData(
            @PathVariable Long materialId) {
        Map<String, Object> data = new HashMap<>();

        summaryRepository.findByStudyMaterialId(materialId)
                .ifPresent(s -> data.put("summary", s));

        List<Flashcard> flashcards = flashcardRepository.findByStudyMaterialId(materialId);
        data.put("flashcards", flashcards);

        return ResponseEntity.ok(ApiResponse.success(data, "Study data fetched"));
    }

    @PostMapping("/summarize/{materialId}")
    public ResponseEntity<ApiResponse<Summary>> summarize(
            @PathVariable Long materialId) {
        StudyMaterial material = materialService.getById(materialId);
        Summary summary = aiService.generateSummary(material);
        return ResponseEntity.ok(ApiResponse.success(summary, "Summary generated"));
    }

    @PostMapping("/generate-mcq/{materialId}")
    public ResponseEntity<ApiResponse<List<Question>>> generateMCQ(
            @PathVariable Long materialId,
            @RequestParam(defaultValue = "10") int count,
            @RequestParam(defaultValue = "MEDIUM") String difficulty) {
        StudyMaterial material = materialService.getById(materialId);
        List<Question> questions = aiService.generateMCQs(
                material, count, Question.Difficulty.valueOf(difficulty.toUpperCase()));
        return ResponseEntity.ok(ApiResponse.success(questions, "MCQs generated"));
    }

    @PostMapping("/generate-flashcards/{materialId}")
    public ResponseEntity<ApiResponse<List<Flashcard>>> generateFlashcards(
            @PathVariable Long materialId) {
        StudyMaterial material = materialService.getById(materialId);
        List<Flashcard> flashcards = aiService.generateFlashcards(material);
        return ResponseEntity.ok(ApiResponse.success(flashcards, "Flashcards generated"));
    }

}