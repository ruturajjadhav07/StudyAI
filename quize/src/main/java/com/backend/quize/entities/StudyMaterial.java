package com.backend.quize.entities;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "study_material")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "LONGTEXT")
    private String rawText;

    @Enumerated(EnumType.STRING)
    private SourceType sourceType;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonIgnore
    @OneToOne(mappedBy = "studyMaterial", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Summary summary;

    @JsonIgnore
    @OneToMany(mappedBy = "studyMaterial", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Question> questions;

    @JsonIgnore
    @OneToMany(mappedBy = "studyMaterial", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Flashcard> flashcards;

    public enum SourceType {TEXT, PDF, TOPIC}

}
