package com.exam.portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ExamPortalApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExamPortalApplication.class, args);
        System.out.println("\n==========================================");
        System.out.println("Examination Portal Backend Started!");
        System.out.println("API Base URL: http://localhost:8080/api");
        System.out.println("==========================================\n");
    }
}
