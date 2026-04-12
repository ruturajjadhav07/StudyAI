package com.backend.quize.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResetRequestPassword {
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Otp is required")
    private String otp;

    @NotBlank(message = "Password is required")
    private String password;
}