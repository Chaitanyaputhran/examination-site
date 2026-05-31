-- Examination Portal Database Schema
-- Drop existing tables if they exist
DROP TABLE IF EXISTS student_answers;
DROP TABLE IF EXISTS exam_attempts;
DROP TABLE IF EXISTS test_questions;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS tests;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS users;

-- Users table (both admin and students)
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'STUDENT')),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Subjects table
CREATE TABLE subjects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_name (name)
);

-- Tests table
CREATE TABLE tests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    subject_id BIGINT NOT NULL,
    duration_minutes INT NOT NULL,
    total_marks INT NOT NULL,
    passing_marks INT NOT NULL,
    created_by BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_subject (subject_id),
    INDEX idx_created_by (created_by),
    INDEX idx_active (is_active)
);

-- Questions table
CREATE TABLE questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    subject_id BIGINT NOT NULL,
    question_text TEXT NOT NULL,
    option1 VARCHAR(500) NOT NULL,
    option2 VARCHAR(500) NOT NULL,
    option3 VARCHAR(500) NOT NULL,
    option4 VARCHAR(500) NOT NULL,
    correct_option INT NOT NULL CHECK (correct_option BETWEEN 1 AND 4),
    marks INT NOT NULL DEFAULT 1,
    difficulty VARCHAR(20) DEFAULT 'MEDIUM' CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    INDEX idx_subject (subject_id),
    INDEX idx_difficulty (difficulty),
    INDEX idx_active (is_active)
);

-- Test Questions mapping (many-to-many)
CREATE TABLE test_questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    test_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    question_order INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_test_question (test_id, question_id),
    INDEX idx_test (test_id),
    INDEX idx_question (question_id)
);

-- Exam Attempts table
CREATE TABLE exam_attempts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    test_id BIGINT NOT NULL,
    start_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP NULL,
    score DECIMAL(5,2) DEFAULT 0,
    total_questions INT DEFAULT 0,
    correct_answers INT DEFAULT 0,
    wrong_answers INT DEFAULT 0,
    unanswered INT DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'IN_PROGRESS' CHECK (status IN ('IN_PROGRESS', 'COMPLETED', 'ABANDONED', 'EXPIRED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE,
    INDEX idx_student (student_id),
    INDEX idx_test (test_id),
    INDEX idx_status (status),
    INDEX idx_start_time (start_time)
);

-- Student Answers table
CREATE TABLE student_answers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    exam_attempt_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    selected_option INT CHECK (selected_option BETWEEN 1 AND 4),
    is_correct BOOLEAN DEFAULT FALSE,
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (exam_attempt_id) REFERENCES exam_attempts(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_attempt_question (exam_attempt_id, question_id),
    INDEX idx_attempt (exam_attempt_id),
    INDEX idx_question (question_id)
);

-- Insert sample data for testing
-- Default Admin User (password: admin123)
INSERT INTO users (username, email, password, role, first_name, last_name)
VALUES ('admin', 'admin@exam.com', '$2a$10$xqJDlLrQXkx8h2rX9kW0JuO0LPKKZzGDa.gSh5H2TqXlV3eBPrI.K', 'ADMIN', 'System', 'Admin');

-- Sample Subjects
INSERT INTO subjects (name, description) VALUES
('Java Programming', 'Core Java concepts and advanced topics'),
('Data Structures', 'Arrays, Lists, Trees, Graphs, Algorithms'),
('Database Management', 'SQL, MySQL, Database Design'),
('Web Development', 'HTML, CSS, JavaScript, React'),
('Python Programming', 'Python basics and advanced concepts');

-- Sample Questions for Java
INSERT INTO questions (subject_id, question_text, option1, option2, option3, option4, correct_option, marks, difficulty) VALUES
(1, 'What is the size of int in Java?', '8 bits', '16 bits', '32 bits', '64 bits', 3, 1, 'EASY'),
(1, 'Which keyword is used to inherit a class in Java?', 'implements', 'extends', 'inherits', 'super', 2, 1, 'EASY'),
(1, 'What is the default value of boolean variable?', 'true', 'false', 'null', '0', 2, 1, 'EASY'),
(1, 'Which collection class allows you to grow or shrink its size?', 'Array', 'ArrayList', 'HashSet', 'HashMap', 2, 1, 'MEDIUM'),
(1, 'What is the return type of hashCode() method?', 'Object', 'int', 'long', 'void', 2, 1, 'MEDIUM');

-- Sample Questions for Data Structures
INSERT INTO questions (subject_id, question_text, option1, option2, option3, option4, correct_option, marks, difficulty) VALUES
(2, 'What is the time complexity of binary search?', 'O(n)', 'O(log n)', 'O(n²)', 'O(1)', 2, 1, 'MEDIUM'),
(2, 'Which data structure uses LIFO?', 'Queue', 'Stack', 'Array', 'Tree', 2, 1, 'EASY'),
(2, 'What is the best case time complexity of Quick Sort?', 'O(n)', 'O(n log n)', 'O(n²)', 'O(log n)', 2, 1, 'HARD'),
(2, 'Which traversal technique uses queue?', 'Inorder', 'Preorder', 'Postorder', 'Level Order', 4, 1, 'MEDIUM'),
(2, 'What is the space complexity of merge sort?', 'O(1)', 'O(log n)', 'O(n)', 'O(n²)', 3, 1, 'MEDIUM');

-- Sample Questions for Database
INSERT INTO questions (subject_id, question_text, option1, option2, option3, option4, correct_option, marks, difficulty) VALUES
(3, 'What does SQL stand for?', 'Structured Query Language', 'Simple Query Language', 'Standard Query Language', 'Structured Question Language', 1, 1, 'EASY'),
(3, 'Which command is used to retrieve data from database?', 'GET', 'SELECT', 'FETCH', 'RETRIEVE', 2, 1, 'EASY'),
(3, 'What is a primary key?', 'Foreign key reference', 'Unique identifier', 'Index field', 'Nullable field', 2, 1, 'EASY'),
(3, 'Which SQL clause is used to filter records?', 'FILTER', 'WHERE', 'HAVING', 'SELECT', 2, 1, 'MEDIUM'),
(3, 'What is normalization in DBMS?', 'Data encryption', 'Organizing data to reduce redundancy', 'Data backup', 'Query optimization', 2, 1, 'MEDIUM');
