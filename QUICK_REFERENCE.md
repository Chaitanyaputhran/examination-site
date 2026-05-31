# Quick Reference Guide

## 🚀 Quick Start

### Option 1: Automated Setup (MacOS)
```bash
./start.sh
```

### Option 2: Manual Setup

**1. Database**
```bash
mysql -u root -p
CREATE DATABASE examination_portal;
USE examination_portal;
SOURCE database/schema.sql;
```

**2. Backend**
```bash
cd backend
# Update application.properties first!
mvn spring-boot:run
```

**3. Frontend**
```bash
cd frontend
npm install
npm run dev
```

## 📍 Access Points

- **Backend API**: http://localhost:8080/api
- **Frontend**: http://localhost:5173
- **Admin Login**: username: `admin`, password: `admin123`

## 📋 Requirements Checklist

- ✅ **Requirement 1**: Registration/Login Module (Admin & Student)
- ✅ **Requirement 2**: Admin - Students Management
- ✅ **Requirement 3**: Admin - Tests & Questions Management
- ✅ **Requirement 4**: Student - Examination Module with Scoring
- ✅ **Requirement 5**: Performance Module with **GRAPHS** (Recharts)
- ✅ **Requirement 6**: **Attempt Statistics** (Count, Avg, Min, Max scores)
- ✅ **Requirement 7**: **Reports** (Student-wise & Subject-wise)
- ✅ **Requirement 8**: **Email Scores** to student IDs

## 🏗️ Architecture

### Backend Structure
```
backend/src/main/java/com/exam/portal/
├── config/         → Security, CORS
├── controller/     → REST APIs (Auth, Admin, Student)
├── dto/            → Data Transfer Objects
├── model/          → JPA Entities (6 tables)
├── repository/     → Spring Data Repositories
├── security/       → JWT utilities
└── service/        → Business logic (7 services)
```

### Frontend Structure
```
frontend/src/
├── components/     → Reusable components (Layout)
├── context/        → Authentication context
├── pages/
│   ├── admin/     → Admin dashboard & management
│   └── student/   → Student dashboard & exam pages
└── services/       → API service with Axios
```

## 🗄️ Database Tables

1. **users** - Admin and student accounts
2. **subjects** - Exam subjects
3. **questions** - Question bank with 4 options
4. **tests** - Test configurations
5. **test_questions** - Test-Question mapping
6. **exam_attempts** - Student exam sessions
7. **student_answers** - Individual answers

## 🔑 Key Features

### Admin Features
- User CRUD operations
- Subject management
- Question bank (create, edit, delete)
- Test creation with question assignment
- Performance reports (student-wise, subject-wise)

### Student Features
- Browse available tests
- Take exams with timer
- Real-time answer saving
- Instant score calculation
- Performance dashboard with **GRAPHS**
- View attempt history with **statistics**
- Email results

## 📊 Statistics Provided

For each student, per subject:
- **Total attempts count**
- **Average score**
- **Minimum score**
- **Maximum score**
- **Pass/Fail ratio**
- **Score trends over time**

## 📧 Email Configuration

Update in `application.properties`:
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

For Gmail, create App Password at: https://myaccount.google.com/apppasswords

## 🎯 API Endpoints Summary

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Admin
- `/api/admin/users` - User management
- `/api/admin/subjects` - Subject management
- `/api/admin/questions` - Question management
- `/api/admin/tests` - Test management
- `/api/admin/reports/*` - Reports

### Student
- `/api/student/tests` - Available tests
- `/api/student/exams/*` - Exam operations
- `/api/student/performance` - Performance stats
- `/api/student/email-results/{id}` - Email scores

## 🧪 Testing the Application

### Test Admin Flow
1. Login as admin (admin/admin123)
2. Create a subject (e.g., "Mathematics")
3. Add questions to the subject
4. Create a test and add questions
5. View reports

### Test Student Flow
1. Register as student
2. View available tests
3. Start and complete a test
4. View performance dashboard (with graphs)
5. Check statistics (attempts, avg, min, max)
6. Email your results

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| Backend Framework | Spring Boot 3.2 |
| Security | Spring Security + JWT |
| ORM | Spring Data JPA + Hibernate |
| Database | MySQL 8.x |
| Frontend | React 18 + Vite |
| Styling | TailwindCSS |
| Charts | **Recharts** |
| Email | Spring Mail |

## 📝 Important Files

- `README.md` - Complete documentation
- `PROJECT_SUMMARY.md` - Requirements verification
- `database/schema.sql` - Database with sample data
- `backend/pom.xml` - Maven dependencies
- `frontend/package.json` - NPM dependencies
- `application.properties` - Backend configuration

## 🐛 Common Issues

**Backend won't start?**
- Check MySQL is running
- Verify database credentials
- Ensure port 8080 is free

**Frontend errors?**
- Run `npm install` in frontend folder
- Check backend is running
- Clear browser cache

**Email not working?**
- Use Gmail App Password
- Check SMTP settings
- Verify firewall settings

## 📦 Project Files Count

- **33** Java files (complete backend)
- **16** React/JSX files (complete frontend)
- **7** Database tables with relationships
- **1** Comprehensive database schema with sample data

## ✨ Bonus Features Included

- Responsive UI design
- Toast notifications
- Loading states
- Error handling
- Input validation
- Auto-submit on timer expiry
- Real-time answer saving
- CORS configuration
- Role-based routing

## 🎓 Sample Data Included

The schema includes:
- 1 default admin account
- 5 sample subjects
- 15 sample questions across subjects
- Ready to test immediately!

---

**All requirements satisfied! Ready for deployment and demonstration.** 🎉
