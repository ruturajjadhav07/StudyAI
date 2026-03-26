package com.backend.quize.service.aiService;


import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.backend.quize.entities.Flashcard;
import com.backend.quize.entities.Question;
import com.backend.quize.entities.StudyMaterial;
import com.backend.quize.entities.Summary;
import com.backend.quize.repository.FlashcardRepository;
import com.backend.quize.repository.QuestionRepository;
import com.backend.quize.repository.SummaryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiService {

    @Value("${app.gemini.api-key}")
    private String apiKey;

    @Value("${app.gemini.url}")
    private String geminiUrl;

    private final QuestionRepository questionRepository;
    private final FlashcardRepository flashcardRepository;
    private final SummaryRepository summaryRepository;

    private final ObjectMapper mapper = new ObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    //  SUMMARY
    @Transactional
    public Summary generateSummary(StudyMaterial material) {
        log.info("▶ Generating summary for materialId={}", material.getId());

        String prompt = """
                You are an expert educational assistant.
                Summarize the following study material clearly and concisely.
                Structure the summary with:
                1. A brief overview (2-3 sentences)
                2. Key concepts (bullet points starting with -)
                3. Important takeaways (bullet points starting with -)
                Keep the language simple and student-friendly.
                
                Study Material:
                %s
                """.formatted(truncate(material.getRawText(), 3000));

        String summaryText = callGeminiApi(prompt);
        log.info("✅ Summary generated, length={}", summaryText.length());

        summaryRepository.findByStudyMaterialId(material.getId())
                .ifPresent(summaryRepository::delete);

        return summaryRepository.save(
                Summary.builder()
                        .studyMaterial(material)
                        .summaryText(summaryText)
                        .build()
        );
    }

    //  MCQ
    @Transactional
    public List<Question> generateMCQs(StudyMaterial material,
                                       int count,
                                       Question.Difficulty difficulty) {
        log.info("▶ Generating {} MCQs for materialId={}, difficulty={}",
                count, material.getId(), difficulty);

        String prompt = """
                You are an expert exam question creator.
                Generate exactly %d multiple choice questions from the study material below.
                Difficulty level: %s
                
                Rules:
                - Test genuine understanding, NOT just memorization
                - Distractors must be plausible and topic-related
                - Explanation must clearly state WHY the correct answer is right
                
                CRITICAL INSTRUCTION: Return ONLY a valid JSON array.
                Do NOT include any markdown, code blocks, or text before/after the JSON.
                Start your response directly with [ and end with ]
                
                JSON format:
                [
                  {
                    "questionText": "Question here?",
                    "optionA": "First option",
                    "optionB": "Second option",
                    "optionC": "Third option",
                    "optionD": "Fourth option",
                    "correctOption": "A",
                    "explanation": "Why A is correct",
                    "difficulty": "%s"
                  }
                ]
                
                Study Material:
                %s
                """.formatted(count, difficulty.name(), difficulty.name(),
                truncate(material.getRawText(), 3000));

        String jsonResponse = callGeminiApi(prompt);
        log.info("✅ MCQ raw response received, length={}", jsonResponse.length());

        questionRepository.deleteByStudyMaterialId(material.getId());
        return parseMCQResponse(jsonResponse, material);
    }


    //  FLASHCARDS
    @Transactional
    public List<Flashcard> generateFlashcards(StudyMaterial material) {
        log.info("▶ Generating flashcards for materialId={}", material.getId());

        String prompt = """
                You are an expert study card creator.
                Create 10 to 15 flashcards from the study material below.
                
                Rules:
                - Front: A clear, concise question or key term
                - Back: A complete but brief answer or definition
                - Each card should cover ONE concept only
                
                CRITICAL INSTRUCTION: Return ONLY a valid JSON array.
                Do NOT include any markdown, code blocks, or text before/after the JSON.
                Start your response directly with [ and end with ]
                
                JSON format:
                [
                  {
                    "frontText": "What is X?",
                    "backText": "X is..."
                  }
                ]
                
                Study Material:
                %s
                """.formatted(truncate(material.getRawText(), 3000));

        String jsonResponse = callGeminiApi(prompt);
        log.info("✅ Flashcard raw response received, length={}", jsonResponse.length());

        flashcardRepository.deleteByStudyMaterialId(material.getId());
        return parseFlashcardResponse(jsonResponse, material);
    }


    //  GEMINI API CALL
    private String callGeminiApi(String prompt) {
        String url = geminiUrl + "?key=" + apiKey;
        log.info("▶ Calling Gemini API: {}", geminiUrl);

        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> part = new HashMap<>();
        part.put("text", prompt);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(part));

        Map<String, Object> generationConfig = new HashMap<>();
        generationConfig.put("temperature", 0.7);
        generationConfig.put("maxOutputTokens", 4096);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", List.of(content));
        requestBody.put("generationConfig", generationConfig);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response =
                    restTemplate.postForEntity(url, entity, String.class);

            log.info("✅ Gemini HTTP status: {}", response.getStatusCode());

            JsonNode root = mapper.readTree(response.getBody());

            if (root.has("error")) {
                String msg = root.path("error").path("message").asText();
                log.error("❌ Gemini API error: {}", msg);
                throw new RuntimeException("Gemini API error: " + msg);
            }

            JsonNode candidates = root.path("candidates");
            if (candidates.isMissingNode() || candidates.isEmpty()) {
                log.error("❌ No candidates in Gemini response: {}", response.getBody());
                throw new RuntimeException("Gemini returned no candidates");
            }

            String text = candidates.path(0)
                    .path("content")
                    .path("parts")
                    .path(0)
                    .path("text")
                    .asText();

            if (text == null || text.isBlank()) {
                log.error("❌ Empty text from Gemini. Body: {}", response.getBody());
                throw new RuntimeException("Gemini returned empty text");
            }

            return text;

        } catch (HttpClientErrorException e) {
            if (e.getStatusCode().value() == 429) {
                throw new RuntimeException("AI service is busy. Please wait 30 seconds and try again.");
            }
            throw new RuntimeException("Gemini API HTTP " + e.getStatusCode() + ": " + e.getResponseBodyAsString());
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("AI service error: " + e.getMessage());
        }
    }


    //  PARSERS
    private List<Question> parseMCQResponse(String json, StudyMaterial material) {
        try {
            String clean = cleanJson(json);
            log.debug("Parsing MCQ JSON (first 300 chars): {}",
                    clean.substring(0, Math.min(300, clean.length())));

            JsonNode arr = mapper.readTree(clean);
            if (!arr.isArray()) {
                log.error("❌ Expected JSON array, got: {} | raw: {}", arr.getNodeType(), json);
                throw new RuntimeException("AI did not return a JSON array for MCQs");
            }

            List<Question> questions = new ArrayList<>();
            for (JsonNode node : arr) {
                Question.Difficulty diff;
                try {
                    diff = Question.Difficulty.valueOf(
                            node.path("difficulty").asText("MEDIUM").toUpperCase());
                } catch (IllegalArgumentException e) {
                    diff = Question.Difficulty.MEDIUM;
                }

                questions.add(Question.builder()
                        .studyMaterial(material)
                        .questionText(node.path("questionText").asText())
                        .optionA(node.path("optionA").asText())
                        .optionB(node.path("optionB").asText())
                        .optionC(node.path("optionC").asText())
                        .optionD(node.path("optionD").asText())
                        .correctOption(node.path("correctOption").asText().toUpperCase())
                        .explanation(node.path("explanation").asText())
                        .difficulty(diff)
                        .build());
            }

            log.info("✅ Parsed {} MCQ questions", questions.size());
            return questionRepository.saveAll(questions);

        } catch (Exception e) {
            log.error("❌ Failed to parse MCQ JSON. Raw: {}", json, e);
            throw new RuntimeException("Failed to parse MCQ response: " + e.getMessage());
        }
    }

    private List<Flashcard> parseFlashcardResponse(String json, StudyMaterial material) {
        try {
            String clean = cleanJson(json);
            log.debug("Parsing flashcard JSON (first 300 chars): {}",
                    clean.substring(0, Math.min(300, clean.length())));

            JsonNode arr = mapper.readTree(clean);
            if (!arr.isArray()) {
                log.error("❌ Expected JSON array, got: {} | raw: {}", arr.getNodeType(), json);
                throw new RuntimeException("AI did not return a JSON array for flashcards");
            }

            List<Flashcard> cards = new ArrayList<>();
            for (JsonNode node : arr) {
                cards.add(Flashcard.builder()
                        .studyMaterial(material)
                        .frontText(node.path("frontText").asText())
                        .backText(node.path("backText").asText())
                        .build());
            }

            log.info("✅ Parsed {} flashcards", cards.size());
            return flashcardRepository.saveAll(cards);

        } catch (Exception e) {
            log.error("❌ Failed to parse flashcard JSON. Raw: {}", json, e);
            throw new RuntimeException("Failed to parse flashcard response: " + e.getMessage());
        }
    }

    //  HELPERS
    private String cleanJson(String raw) {
        return raw.replaceAll("(?s)```json\\s*", "")
                .replaceAll("(?s)```\\s*", "")
                .trim();
    }

    private String truncate(String text, int maxChars) {
        if (text == null) return "";
        return text.length() > maxChars ? text.substring(0, maxChars) : text;
    }
}