# 📚 Examination Portal

A modern, full-stack online examination management system built with **Spring Boot** and **React**. This application provides a comprehensive platform for conducting online tests with separate interfaces for administrators and students.

![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen?style=flat-square&logo=spring)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.6-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🔐 Authentication & Security
- JWT-based stateless authentication
- Role-based access control (Admin & Student)
- BCrypt password encryption
- Secure API endpoints with Spring Security

### 👨‍💼 Admin Features
- **User Management**: Create, update, and delete admin/student accounts
- **Subject Management**: Organize tests by subjects/categories
- **Test Management**: Create tests with customizable parameters
  - Set duration, total marks, and passing criteria
  - Add/remove multiple-choice questions (4 options)
  - Activate/deactivate tests
- **Dashboard Statistics**: View total users, students, admins, subjects, questions, and tests
- **Analytics & Reports**: Subject-wise and student-wise performance tracking

### 🎓 Student Features
- **Browse Tests**: View all available active tests with details
- **Take Exams**: Real-time examination experience
  - Live countdown timer
  - Navigate freely between questions
  - Auto-save answers
  - Auto-submit on timeout
- **Unlimited Retakes**: Retake any test multiple times to improve scores
- **Performance Tracking**: View all exam attempts with detailed scores
- **Analytics Dashboard**: Subject-wise performance analysis
- **Email Reports**: Receive detailed PDF reports via email

## 🛠️ Technology Stack

### Backend
- **Java 17** - Modern LTS version
- **Spring Boot 3.2.0** - Application framework
  - Spring Security - Authentication & authorization
  - Spring Data JPA - Data access layer
  - Spring Mail - Email service
- **MySQL 8.0** - Relational database
- **Maven** - Build tool
- **JWT** - JSON Web Tokens for authentication
- **iText7** - PDF generation
- **Hibernate** - ORM framework

### Frontend
- **React 18.2.0** - UI library
- **Vite 5.0.8** - Build tool and dev server
- **React Router DOM 6.20.0** - Client-side routing
- **Tailwind CSS 3.3.6** - Utility-first CSS framework
- **Axios** - HTTP client
- **Recharts 2.10.3** - Data visualization
- **React Hot Toast** - Toast notifications

## 📁 Project Structure

```
examination-site/
├── backend/                    # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/exam/portal/
│   │       ├── controller/     # REST controllers
│   │       ├── service/        # Business logic
│   │       ├── repository/     # Data access layer
│   │       ├── model/          # JPA entities
│   │       ├── dto/            # Data transfer objects
│   │       ├── security/       # JWT & security config
│   │       └── config/         # Application configuration
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── admin/          # Admin components
│   │   │   └── student/        # Student components
│   │   ├── pages/              # Page components
│   │   │   ├── admin/          # Admin pages
│   │   │   └── student/        # Student pages
│   │   ├── services/           # API service layer
│   │   ├── context/            # React context (Auth)
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── package.json
│   └── tailwind.config.js
│
├── database/
│   └── schema.sql              # Database schema
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- MySQL 8.0 or higher
- Maven 3.6+

### Database Setup

1. Install and start MySQL server

2. Create the database:
```sql
CREATE DATABASE examination_portal;
```

3. Update database credentials in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/examination_portal
spring.datasource.username=root
spring.datasource.password=your_password
```

4. The application will automatically create tables using JPA (Hibernate)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The backend server will start at `http://localhost:8080/api`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start at `http://localhost:5173`

## 🔧 Configuration

### Backend Configuration (`application.properties`)

```properties
# Server
server.port=8080
server.servlet.context-path=/api

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/examination_portal
spring.datasource.username=root
spring.datasource.password=

# JWT
jwt.secret=YourSecretKeyHere
jwt.expiration=86400000

# Email (Optional - for PDF reports)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

### Frontend Configuration

Update API base URL in `frontend/src/services/api.js` if needed:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

## 📊 Database Schema

The application uses 6 main tables:

- **users** - Admin and student accounts
- **subjects** - Subject/category management
- **tests** - Test configuration and metadata
- **questions** - MCQ questions with 4 options
- **exam_attempts** - Student test attempts and scores
- **student_answers** - Individual question responses

## 🔌 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Admin Endpoints
- `GET /admin/users` - Get all users
- `POST /admin/users` - Create user
- `PUT /admin/users/{id}` - Update user
- `DELETE /admin/users/{id}` - Delete user
- `GET /admin/subjects` - Get all subjects
- `POST /admin/subjects` - Create subject
- `GET /admin/tests` - Get all tests
- `POST /admin/tests` - Create test
- `POST /admin/tests/{id}/questions` - Add question to test
- `GET /admin/reports/students` - Get student reports

### Student Endpoints
- `GET /student/tests` - Get available tests
- `POST /student/exams/start/{testId}` - Start exam
- `GET /student/exams/{attemptId}/questions` - Get exam questions
- `POST /student/exams/answer` - Save answer
- `POST /student/exams/submit` - Submit exam
- `GET /student/exams/attempts` - Get all attempts
- `GET /student/performance` - Get performance data
- `POST /student/email-results/{attemptId}` - Email results

## 🎯 Usage

### For Administrators

1. **Login** with admin credentials
2. **Create Subjects** (e.g., Mathematics, Science, History)
3. **Create Tests**:
   - Set test title, description, subject
   - Define duration, total marks, passing marks
4. **Add Questions**:
   - Add MCQ questions with 4 options
   - Specify correct answer and marks
5. **Activate Test** for students
6. **View Reports** and analytics

### For Students

1. **Login** with student credentials
2. **Browse Available Tests**
3. **Start Test**:
   - Review test details
   - Confirm to begin
   - Timer starts automatically
4. **Answer Questions**:
   - Navigate freely between questions
   - Answers are auto-saved
5. **Submit Test**:
   - Submit manually or auto-submit on timeout
6. **View Results**:
   - Instant score calculation
   - Review correct/incorrect answers
   - Email PDF report
7. **Retake Test** if needed (unlimited attempts)

## 🔐 Security Features

- JWT-based authentication (24-hour expiry)
- BCrypt password hashing
- Role-based access control (@PreAuthorize)
- SQL injection prevention (JPA/Hibernate)
- CORS configuration
- XSS protection

## 📧 Email Configuration (Optional)

To enable email reports, configure SMTP settings in `application.properties`:

For Gmail:
1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in `spring.mail.password`

## 🐛 Known Issues & Solutions

### Issue: ERR_INCOMPLETE_CHUNKED_ENCODING
**Solution**: Fixed by adding `@JsonIgnoreProperties` to entity relationships to prevent circular references.

### Issue: Tests not loading
**Solution**: Ensure MySQL is running and database connection is properly configured.

## 🚀 Production Deployment

### Backend
```bash
mvn clean package
java -jar target/examination-portal-1.0.0.jar
```

### Frontend
```bash
npm run build
# Deploy dist/ folder to web server (Nginx, Apache, etc.)
```


