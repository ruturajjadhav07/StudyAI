package com.backend.quize.repository;

import com.backend.quize.entities.Summary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SummaryRepository extends JpaRepository<Summary, Long> {
    Optional<Summary> findByStudyMaterialId(Long materialId);
}

