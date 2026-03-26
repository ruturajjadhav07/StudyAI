package com.backend.quize.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.quize.entities.Question;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByStudyMaterialId(Long materialId);

    void deleteByStudyMaterialId(Long materialId);
}
