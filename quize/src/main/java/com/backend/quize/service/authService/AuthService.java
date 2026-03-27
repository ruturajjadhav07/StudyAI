package com.backend.quize.service.authService;

import com.backend.quize.dtos.user.LoginRequest;
import com.backend.quize.dtos.user.RegisterRequest;
import com.backend.quize.dtos.user.AuthResponse;
import com.backend.quize.entities.User;
import com.backend.quize.repository.UserRepository;
import com.backend.quize.security.JwtTokenProvider;
import com.backend.quize.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final EmailService emailService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);

        emailService.sendWelcome(user.getEmail(), user.getName());

        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword())
        );

        String token = jwtTokenProvider.generateToken(auth);
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();

        return AuthResponse.builder()
                .token(token)
                .name(userDetails.getName())
                .email(userDetails.getEmail())
                .userId(userDetails.getId())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword())
        );

        String token = jwtTokenProvider.generateToken(auth);
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();

        return AuthResponse.builder()
                .token(token)
                .name(userDetails.getName())
                .email(userDetails.getEmail())
                .userId(userDetails.getId())
                .build();
    }
}