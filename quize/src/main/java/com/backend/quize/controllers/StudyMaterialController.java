package com.backend.quize.controllers;

import com.backend.quize.dtos.studyMaterial.StudyMaterialRequest;
import com.backend.quize.dtos.ApiResponse;
import com.backend.quize.entities.StudyMaterial;
import com.backend.quize.security.UserDetailsImpl;
import com.backend.quize.service.studyMaterial.StudyMaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/material")
@RequiredArgsConstructor
public class StudyMaterialController {

    private final StudyMaterialService materialService;

    @PostMapping("/text")
    public ResponseEntity<ApiResponse<StudyMaterial>> uploadText(
            @RequestBody StudyMaterialRequest request,
            @AuthenticationPrincipal UserDetailsImpl user) {
        StudyMaterial material = materialService.saveTextMaterial(
                user.getId(), request.getTitle(), request.getRawText());
        return ResponseEntity.ok(ApiResponse.success(material, "Material saved"));
    }

    @PostMapping("/pdf")
    public ResponseEntity<ApiResponse<StudyMaterial>> uploadPdf(
            @RequestParam("title") String title,
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal UserDetailsImpl user) throws Exception {
        StudyMaterial material = materialService.savePdfMaterial(
                user.getId(), title, file);
        return ResponseEntity.ok(ApiResponse.success(material, "PDF uploaded"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StudyMaterial>> getMaterial(@PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.success(materialService.getById(id), "Success"));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<StudyMaterial>>> getMyMaterials(
            @AuthenticationPrincipal UserDetailsImpl user) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        materialService.getUserMaterials(user.getId()), "Success"));
    }
}