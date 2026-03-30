package com.backend.quize.service.authService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailService {

    @Value("${brevo.api.key}")
    private String brevoApiKey;

    @Value("${app.mail.from}")
    private String fromEmail;

    private final RestTemplate restTemplate;

    @Async
    public void sendWelcome(String toEmail, String name) {
        try {
            String htmlContent = """
                    <!DOCTYPE html>
                    <html>
                    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f9; margin: 0; padding: 20px;">
                        <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                            <div style="background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); padding: 30px; text-align: center; color: white;">
                                <h1 style="margin: 0; font-size: 28px;">Welcome to StudyAI!</h1>
                                <p style="font-size: 16px; opacity: 0.9;">Your journey to smarter learning starts here.</p>
                            </div>
                            <div style="padding: 30px; color: #333; line-height: 1.6;">
                                <h2 style="color: #4A90E2;">Hi %s,</h2>
                                <p>We're thrilled to have you join the <b>StudyAI</b> community!</p>
                    
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="https://study-ai-lime-three.vercel.app" style="background-color: #4A90E2; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Go to Dashboard</a>
                                </div>
                            </div>
                            <div style="background: #f9f9f9; padding: 20px; text-align: center; color: #999; font-size: 12px;">
                                &copy; 2026 StudyAI Team
                            </div>
                        </div>
                    </body>
                    </html>
                    """.formatted(name);

            sendBrevoEmail(toEmail, "Welcome to StudyAI – Let's Start Learning! 🚀", htmlContent);

        } catch (Exception e) {
            System.err.println("Failed to send welcome email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Async
    public void sendResetOtp(String toEmail, String otp) {
        try {
            String htmlContent = """
                    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 500px; margin: auto;">
                        <h2 style="color: #4A90E2;">Password Reset Request</h2>
                        <p>Use the code below to reset your password. This code expires in 5 minutes.</p>
                        <div style="background: #f4f7f9; padding: 20px; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333; border-radius: 5px; margin: 20px 0;">
                            %s
                        </div>
                        <p style="font-size: 12px; color: #777;">If you didn't request this, you can ignore this email.</p>
                    </div>
                    """.formatted(otp);

            sendBrevoEmail(toEmail, "Your StudyAI Password Reset Code", htmlContent);

        } catch (Exception e) {
            System.err.println("Failed to send OTP email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private void sendBrevoEmail(String toEmail, String subject, String htmlContent) {
        try {
            String url = "https://api.brevo.com/v3/smtp/email";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("api-key", brevoApiKey);

            Map<String, Object> body = Map.of(
                    "sender", Map.of(
                            "name", "StudyAI Team",
                            "email", fromEmail
                    ),
                    "to", List.of(Map.of("email", toEmail)),
                    "subject", subject,
                    "htmlContent", htmlContent
            );

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
            restTemplate.postForEntity(url, request, String.class);

            System.out.println("Email sent successfully to: " + toEmail);

        } catch (Exception e) {
            System.err.println("Brevo API error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
