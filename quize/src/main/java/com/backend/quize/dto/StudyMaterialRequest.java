package com.backend.quize.dto;


import com.backend.quize.entity.SourceType;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class StudyMaterialRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String rawText;

    private SourceType sourceType;
}
