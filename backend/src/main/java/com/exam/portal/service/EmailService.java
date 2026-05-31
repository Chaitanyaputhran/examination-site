package com.exam.portal.service;

import com.exam.portal.model.ExamAttempt;
import com.exam.portal.model.StudentAnswer;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ExamService examService;

    @Value("${app.from-email}")
    private String fromEmail;

    @Value("${app.name}")
    private String appName;

    public void sendExamResult(String toEmail, ExamAttempt attempt) {
        try {
            System.out.println("=== Email Send Attempt ===");
            System.out.println("To: " + toEmail);
            System.out.println("From: " + fromEmail);
            System.out.println("Subject: Exam Results - " + attempt.getTest().getTitle());

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Exam Results - " + attempt.getTest().getTitle());
            helper.setText(buildEmailBody(attempt));

            System.out.println("Generating PDF report...");
            // Generate PDF and attach
            byte[] pdfBytes = generateExamReportPdf(attempt);
            ByteArrayResource pdfResource = new ByteArrayResource(pdfBytes);
            helper.addAttachment("Exam_Report_" + attempt.getId() + ".pdf", pdfResource);

            System.out.println("Sending email...");
            mailSender.send(message);
            System.out.println("Email sent successfully!");
        } catch (Exception e) {
            System.err.println("Email send failed: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }

    private byte[] generateExamReportPdf(ExamAttempt attempt) {
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            // Title
            Paragraph title = new Paragraph("EXAMINATION REPORT")
                    .setFontSize(24)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginBottom(20);
            document.add(title);

            // Test Details
            document.add(new Paragraph("Test: " + attempt.getTest().getTitle()).setBold().setFontSize(14));
            document.add(new Paragraph("Subject: " + attempt.getTest().getSubject().getName()).setFontSize(12));
            document.add(new Paragraph("Student: " + attempt.getStudent().getFullName()).setFontSize(12));
            document.add(new Paragraph("Date: " + attempt.getCreatedAt().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm"))).setFontSize(12));
            document.add(new Paragraph("\n"));

            // Score Summary Table
            float[] columnWidths = {1, 1, 1, 1};
            Table scoreTable = new Table(UnitValue.createPercentArray(columnWidths));
            scoreTable.setWidth(UnitValue.createPercentValue(100));

            // Header
            scoreTable.addHeaderCell(createHeaderCell("Total Score"));
            scoreTable.addHeaderCell(createHeaderCell("Percentage"));
            scoreTable.addHeaderCell(createHeaderCell("Result"));
            scoreTable.addHeaderCell(createHeaderCell("Passing Marks"));

            // Calculate marks per question
            double marksPerQuestion = attempt.getTotalQuestions() > 0
                ? (double) attempt.getTest().getTotalMarks() / attempt.getTotalQuestions()
                : 0;

            // Data
            scoreTable.addCell(createCell(attempt.getScore() + " / " + attempt.getTest().getTotalMarks()));
            scoreTable.addCell(createCell(String.format("%.2f%%", attempt.getPercentage())));
            Cell resultCell = createCell(attempt.isPassed() ? "PASSED" : "FAILED");
            resultCell.setBackgroundColor(attempt.isPassed()
                ? new DeviceRgb(220, 252, 231)
                : new DeviceRgb(254, 226, 226));
            scoreTable.addCell(resultCell);
            scoreTable.addCell(createCell(String.valueOf(attempt.getTest().getPassingMarks())));

            document.add(scoreTable);
            document.add(new Paragraph("\n"));

            // Statistics Table
            float[] statColumns = {1, 1, 1, 1};
            Table statsTable = new Table(UnitValue.createPercentArray(statColumns));
            statsTable.setWidth(UnitValue.createPercentValue(100));

            statsTable.addHeaderCell(createHeaderCell("Total Questions"));
            statsTable.addHeaderCell(createHeaderCell("Correct"));
            statsTable.addHeaderCell(createHeaderCell("Wrong"));
            statsTable.addHeaderCell(createHeaderCell("Unanswered"));

            statsTable.addCell(createCell(String.valueOf(attempt.getTotalQuestions())));
            statsTable.addCell(createCell(String.valueOf(attempt.getCorrectAnswers())));
            statsTable.addCell(createCell(String.valueOf(attempt.getWrongAnswers())));
            statsTable.addCell(createCell(String.valueOf(attempt.getUnanswered())));

            document.add(statsTable);
            document.add(new Paragraph("\n"));

            // Marks Distribution Info
            document.add(new Paragraph("Marks Distribution: Each question worth " +
                String.format("%.2f", marksPerQuestion) + " marks")
                .setFontSize(12)
                .setBold()
                .setBackgroundColor(new DeviceRgb(224, 242, 254))
                .setPadding(10));
            document.add(new Paragraph("\n"));

            // Question-wise Analysis
            document.add(new Paragraph("DETAILED ANALYSIS").setBold().setFontSize(16).setMarginBottom(10));

            List<StudentAnswer> answers = examService.getAttemptAnswers(attempt.getId());
            int questionNumber = 1;

            for (StudentAnswer answer : answers) {
                // Question box
                Paragraph questionPara = new Paragraph("Q" + questionNumber + ". " + answer.getQuestion().getQuestionText())
                        .setBold()
                        .setFontSize(11)
                        .setBackgroundColor(new DeviceRgb(249, 250, 251))
                        .setPadding(8);
                document.add(questionPara);

                // Answer details
                String studentAnswer = answer.getSelectedOption() != null
                    ? (char)('A' + answer.getSelectedOption() - 1) + ". " + answer.getQuestion().getOptionByNumber(answer.getSelectedOption())
                    : "Not Answered";
                String correctAnswer = (char)('A' + answer.getQuestion().getCorrectOption() - 1) + ". " +
                    answer.getQuestion().getOptionByNumber(answer.getQuestion().getCorrectOption());

                document.add(new Paragraph("Your Answer: " + studentAnswer)
                        .setFontSize(10)
                        .setMarginLeft(15));
                document.add(new Paragraph("Correct Answer: " + correctAnswer)
                        .setFontSize(10)
                        .setBold()
                        .setMarginLeft(15));

                Paragraph resultPara = new Paragraph(answer.getIsCorrect() ? "✓ Correct" : "✗ Wrong")
                        .setFontSize(10)
                        .setBold()
                        .setMarginLeft(15)
                        .setFontColor(answer.getIsCorrect() ? ColorConstants.GREEN : ColorConstants.RED);
                document.add(resultPara);

                document.add(new Paragraph("Marks: " + (answer.getIsCorrect() ? String.format("%.2f", marksPerQuestion) : "0") + " / " + String.format("%.2f", marksPerQuestion))
                        .setFontSize(10)
                        .setMarginLeft(15)
                        .setMarginBottom(15));

                questionNumber++;
            }

            // Footer
            document.add(new Paragraph("\n\n"));
            document.add(new Paragraph("This is a computer-generated report.")
                    .setFontSize(9)
                    .setTextAlignment(TextAlignment.CENTER)
                    .setItalic());
            document.add(new Paragraph(appName)
                    .setFontSize(9)
                    .setTextAlignment(TextAlignment.CENTER)
                    .setBold());

            document.close();
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate PDF: " + e.getMessage());
        }
    }

    private Cell createHeaderCell(String text) {
        return new Cell()
                .add(new Paragraph(text).setBold())
                .setBackgroundColor(new DeviceRgb(59, 130, 246))
                .setFontColor(ColorConstants.WHITE)
                .setTextAlignment(TextAlignment.CENTER)
                .setPadding(8);
    }

    private Cell createCell(String text) {
        return new Cell()
                .add(new Paragraph(text))
                .setTextAlignment(TextAlignment.CENTER)
                .setPadding(8);
    }

    private String buildEmailBody(ExamAttempt attempt) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");

        StringBuilder body = new StringBuilder();
        body.append("Dear ").append(attempt.getStudent().getFullName()).append(",\n\n");
        body.append("Your exam results for ").append(attempt.getTest().getTitle()).append(" are ready.\n\n");
        body.append("=== EXAM DETAILS ===\n");
        body.append("Subject: ").append(attempt.getTest().getSubject().getName()).append("\n");
        body.append("Date: ").append(attempt.getCreatedAt().format(formatter)).append("\n\n");
        body.append("=== PERFORMANCE ===\n");
        body.append("Score: ").append(attempt.getScore()).append(" / ").append(attempt.getTest().getTotalMarks()).append("\n");
        body.append("Percentage: ").append(String.format("%.2f", attempt.getPercentage())).append("%\n");
        body.append("Result: ").append(attempt.isPassed() ? "PASSED" : "FAILED").append("\n\n");
        body.append("=== STATISTICS ===\n");
        body.append("Total Questions: ").append(attempt.getTotalQuestions()).append("\n");
        body.append("Correct Answers: ").append(attempt.getCorrectAnswers()).append("\n");
        body.append("Wrong Answers: ").append(attempt.getWrongAnswers()).append("\n");
        body.append("Unanswered: ").append(attempt.getUnanswered()).append("\n\n");
        body.append("Keep up the good work!\n\n");
        body.append("Best Regards,\n");
        body.append(appName).append(" Team");

        return body.toString();
    }

    public void sendWelcomeEmail(String toEmail, String username) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Welcome to " + appName);
            message.setText("Dear " + username + ",\n\n" +
                    "Welcome to " + appName + "!\n\n" +
                    "Your account has been successfully created. You can now login and start taking exams.\n\n" +
                    "Best Regards,\n" +
                    appName + " Team");

            mailSender.send(message);
        } catch (Exception e) {
            // Don't throw exception for welcome email failure
            System.err.println("Failed to send welcome email: " + e.getMessage());
        }
    }
}
