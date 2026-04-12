package com.backend.quize.service;


import com.backend.quize.entity.StudyMaterial;
import com.backend.quize.entity.User;
import com.backend.quize.repository.StudyMaterialRepository;
import com.backend.quize.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudyMaterialService {
    private final StudyMaterialRepository materialRepository;
    private final UserRepository userRepository;

    @Transactional
    public StudyMaterial saveTextMaterial(Long userId, String title, String text) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudyMaterial material = StudyMaterial.builder()
                .user(user)
                .title(title)
                .rawText(text)
                .sourceType(StudyMaterial.SourceType.TEXT)
                .build();

        return materialRepository.save(material);
    }

    @Transactional
    public StudyMaterial savePdfMaterial(Long userId, String title,
                                         MultipartFile file) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PDDocument doc = PDDocument.load(file.getInputStream());
        PDFTextStripper stripper = new PDFTextStripper();
        String text = stripper.getText(doc);
        doc.close();

        if (text == null || text.isBlank()) {
            throw new RuntimeException("Could not extract text from PDF");
        }

        StudyMaterial material = StudyMaterial.builder()
                .user(user)
                .title(title)
                .rawText(text)
                .sourceType(StudyMaterial.SourceType.PDF)
                .build();

        return materialRepository.save(material);
    }

    @Transactional
    public StudyMaterial getById(Long id) {
        return materialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material not found"));
    }

    @Transactional
    public List<StudyMaterial> getUserMaterials(Long userId) {
        return materialRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
}