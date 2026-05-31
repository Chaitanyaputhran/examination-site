# Examination Portal - Full Stack Application

A comprehensive online examination system built with **Spring Boot** (Backend) and **React** (Frontend) with MySQL database.

## Features

### Admin Module
- ✅ **User Management**: Create, view, update, and delete users (admins and students)
- ✅ **Subject Management**: Manage exam subjects and topics
- ✅ **Question Bank**: Create and manage questions with multiple-choice options
- ✅ **Test Management**: Create tests, assign questions, set duration and passing marks
- ✅ **Reports & Analytics**: View student-wise and subject-wise performance reports

### Student Module
- ✅ **User Registration/Login**: Secure authentication with JWT tokens
- ✅ **Available Tests**: Browse and select tests to take
- ✅ **Exam Interface**: Take exams with timer, question navigation, and auto-submit
- ✅ **Instant Scoring**: Automatic grading upon submission
- ✅ **Performance Dashboard**: View scores, statistics, and attempt history
- ✅ **Graphical Reports**: Visualize performance with charts (Recharts)
- ✅ **Attempt Statistics**: View attempt count, average, min, and max scores per subject
- ✅ **Email Results**: Send exam scores to registered email address

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Security**: Spring Security + JWT
- **ORM**: Spring Data JPA + Hibernate
- **Database**: MySQL 8.x
- **Email**: Spring Mail (SMTP)
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Notifications**: React Hot Toast

## Project Structure

```
examination-portal/
├── backend/                    # Spring Boot Application
│   ├── src/main/java/com/exam/portal/
│   │   ├── config/            # Security, CORS configuration
│   │   ├── controller/        # REST API endpoints
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── model/             # JPA Entities
│   │   ├── repository/        # Spring Data Repositories
│   │   ├── security/          # JWT utilities
│   │   └── service/           # Business logic
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/                   # React Application
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── context/           # Auth context
│   │   ├── pages/             # Page components
│   │   │   ├── admin/         # Admin pages
│   │   │   └── student/       # Student pages
│   │   ├── services/          # API services
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
└── database/
    └── schema.sql             # Database schema
```

## Prerequisites

- **Java 17** or higher
- **Node.js 18** or higher
- **MySQL 8.0** or higher
- **Maven 3.6** or higher
- **npm** or **yarn**

## Installation & Setup

### 1. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE examination_portal;

# Import schema
mysql -u root -p examination_portal < database/schema.sql
```

The schema includes sample data:
- Default admin user: `admin` / `admin123`
- Sample subjects and questions

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Update application.properties with your MySQL credentials
# Edit src/main/resources/application.properties
# Update the following:
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password

# For email functionality, configure SMTP settings:
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password

# Build and run
mvn clean install
mvn spring-boot:run
```

The backend API will start on `http://localhost:8080/api`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend application will start on `http://localhost:5173`

## Configuration

### Backend Configuration (`application.properties`)

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/examination_portal
spring.datasource.username=root
spring.datasource.password=root

# JWT Secret (Change this in production!)
jwt.secret=MySecretKeyForJWTTokenGenerationExaminationPortal2024SecureKey
jwt.expiration=86400000

# Email Configuration (Gmail SMTP)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

**Note**: For Gmail, you need to generate an "App Password":
1. Go to Google Account Settings
2. Enable 2-Factor Authentication
3. Generate App Password for "Mail"
4. Use that password in the configuration

### Frontend Configuration

Update API base URL in `frontend/src/services/api.js` if needed:
```javascript
baseURL: 'http://localhost:8080/api'
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Admin Endpoints
- `GET /api/admin/users` - Get all users
- `POST /api/admin/subjects` - Create subject
- `GET /api/admin/questions` - Get all questions
- `POST /api/admin/questions` - Create question
- `POST /api/admin/tests` - Create test
- `POST /api/admin/tests/{testId}/questions` - Add questions to test
- `GET /api/admin/reports/students` - Student-wise reports
- `GET /api/admin/reports/subjects` - Subject-wise reports

### Student Endpoints
- `GET /api/student/tests` - Get available tests
- `POST /api/student/exams/start/{testId}` - Start exam
- `POST /api/student/exams/answer` - Save answer
- `POST /api/student/exams/submit` - Submit exam
- `GET /api/student/exams/attempts` - Get exam history
- `GET /api/student/performance` - Get performance stats
- `GET /api/student/performance/subjects` - Subject-wise performance
- `POST /api/student/email-results/{attemptId}` - Email exam results

## Default Credentials

After importing the schema, you can login with:

**Admin Account:**
- Username: `admin`
- Password: `admin123`

You can register new students through the registration page.

## Usage Guide

### For Admins

1. **Login** with admin credentials
2. **Manage Users**: Add/remove students and admins
3. **Create Subjects**: Add examination subjects
4. **Add Questions**: Build question bank for each subject
5. **Create Tests**: 
   - Select subject
   - Set duration, total marks, passing marks
   - Add questions from question bank
6. **View Reports**: Analyze student and subject performance

### For Students

1. **Register** or **Login** with student credentials
2. **Browse Tests**: View available tests on dashboard
3. **Take Exam**:
   - Click "Start Exam"
   - Answer questions within time limit
   - Submit before time expires (auto-submit if time runs out)
4. **View Results**: See immediate scores and detailed breakdown
5. **Track Performance**:
   - View attempt history
   - See graphs and statistics
   - Track progress across subjects
6. **Email Results**: Send exam scores to your email

## Features Breakdown

### Exam Taking Flow
1. Student selects a test
2. System creates exam attempt with timer
3. Questions are displayed one at a time (or all at once)
4. Student can navigate between questions
5. Answers are saved in real-time
6. Submit manually or auto-submit on timer expiry
7. Instant score calculation
8. Detailed results with correct/wrong/unanswered count

### Performance Analytics
- **Overall Performance**: Total attempts, average score, highest/lowest scores
- **Subject-wise Analysis**: Performance breakdown by subject
- **Attempt History**: View all past attempts with scores
- **Statistical Data**: Min, max, average scores
- **Visual Graphs**: Bar charts, line charts, pie charts

### Security
- JWT-based authentication
- Role-based access control (ADMIN/STUDENT)
- Password encryption with BCrypt
- Protected API endpoints
- CORS configuration

## Database Schema

### Main Tables
- **users**: Stores admin and student accounts
- **subjects**: Exam subjects
- **questions**: Question bank with options and correct answers
- **tests**: Test configurations
- **test_questions**: Many-to-many mapping
- **exam_attempts**: Student exam sessions
- **student_answers**: Individual answers for each attempt

## Development

### Build for Production

**Backend:**
```bash
cd backend
mvn clean package
java -jar target/examination-portal-1.0.0.jar
```

**Frontend:**
```bash
cd frontend
npm run build
# Deploy the 'dist' folder to your web server
```

### Run Tests

```bash
# Backend tests
cd backend
mvn test

# Frontend tests
cd frontend
npm test
```

## Troubleshooting

### Backend Issues

**Problem**: Application fails to start
- Check MySQL is running
- Verify database credentials in `application.properties`
- Ensure port 8080 is not in use

**Problem**: JWT authentication errors
- Check JWT secret is configured
- Verify token expiration settings

### Frontend Issues

**Problem**: API connection failed
- Verify backend is running on port 8080
- Check CORS configuration in backend
- Ensure proxy settings in `vite.config.js`

**Problem**: Build errors
- Delete `node_modules` and run `npm install` again
- Check Node.js version (should be 18+)

### Email Issues

**Problem**: Emails not sending
- Verify SMTP settings
- For Gmail, use App Password (not regular password)
- Check firewall/antivirus settings

## Future Enhancements

- [ ] Question shuffle for each attempt
- [ ] Negative marking support
- [ ] Timed individual questions
- [ ] Image support in questions
- [ ] Bulk question import (CSV/Excel)
- [ ] Advanced analytics dashboard
- [ ] PDF report generation
- [ ] Multi-language support
- [ ] Mobile app version

## License

This project is created for educational purposes.

## Support

For issues or questions:
- Check the troubleshooting section
- Review API documentation
- Check application logs

## Contributors

Created as part of the Full Stack Application Development project.

---

**Happy Examining! 📝✨**
# examination-site
