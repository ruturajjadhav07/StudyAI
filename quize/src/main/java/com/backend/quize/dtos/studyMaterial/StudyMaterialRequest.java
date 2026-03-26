package com.backend.quize.dtos.studyMaterial;


import com.backend.quize.entities.SourceType;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class StudyMaterialRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String rawText;

    private SourceType sourceType;
}
