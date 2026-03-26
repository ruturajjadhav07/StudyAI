package com.backend.quize.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.quize.entities.Flashcard;

import java.util.List;

@Repository
public interface FlashcardRepository extends JpaRepository<Flashcard, Long> {
    List<Flashcard> findByStudyMaterialId(Long materialId);

    void deleteByStudyMaterialId(Long materialId);
}
