package com.backend.quize.service.authService;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Async
    public void sendWelcome(String toEmail, String name) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("StudyAI Team <ruturajjadhav122@gmail.com>");
            helper.setTo(toEmail);
            helper.setSubject("Welcome to StudyAI – Let's Start Learning! 🚀");

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
                                    <a href="http://localhost:3000" style="background-color: #4A90E2; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Go to Dashboard</a>
                                </div>
                            </div>
                            <div style="background: #f9f9f9; padding: 20px; text-align: center; color: #999; font-size: 12px;">
                                &copy; 2026 StudyAI Team
                            </div>
                        </div>
                    </body>
                    </html>
                    """.formatted(name);

            helper.setText(htmlContent, true);
            javaMailSender.send(message);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Async
    public void sendResetOtp(String toEmail, String otp) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("StudyAI Security <ruturajjadhav122@gmail.com>");
            helper.setTo(toEmail);
            helper.setSubject(otp + " is your StudyAI Reset Code");

            String htmlContent = """
            <div style="font-family: Arial, sans-serif; text-align: caenter; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 500px; margin: auto;">
                <h2 style="color: #4A90E2;">Password Reset Request</h2>
                <p>Use the code below to reset your password. This code expires in 5 minutes.</p>
                <div style="background: #f4f7f9; padding: 20px; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333; border-radius: 5px; margin: 20px 0;">
                    %s
                </div>
                <p style="font-size: 12px; color: #777;">If you didn't request this, you can ignore this email.</p>
            </div>
            """.formatted(otp);

            helper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
