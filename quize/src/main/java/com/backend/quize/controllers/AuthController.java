package com.backend.quize.controllers;

import com.backend.quize.dtos.user.*;
import com.backend.quize.dtos.ApiResponse;
import com.backend.quize.security.UserDetailsImpl;
import com.backend.quize.service.authService.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Login successful"));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<String>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        authService.sendResetOtp(request.getEmail());
        return ResponseEntity.ok(ApiResponse.success(null, "OTP sent to your email"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<String>> resetPassword(@Valid @RequestBody ResetRequestPassword request) {
        authService.resetPassword(request.getEmail(), request.getOtp(), request.getPassword());
        return ResponseEntity.ok(ApiResponse.success(null, "Password reset successfully"));
    }

    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<String>> changePassword(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody ChangePasswordRequest request) {

        authService.changePassword(userDetails.getId(), request);
        return ResponseEntity.ok(ApiResponse.success(null, "Password changed successfully! 🔐"));
    }

    @DeleteMapping("delete-account")
    public ResponseEntity<?> deleteAccount(@AuthenticationPrincipal UserDetailsImpl userDetails, @Valid @RequestBody DeleteAccountRequest request) {
        authService.deleteAccount(userDetails.getId(), request.getPassword());
        return ResponseEntity.ok(Map.of(
                "message", "Account deleted successfully. We've sent a confirmation email."
        ));
    }
}