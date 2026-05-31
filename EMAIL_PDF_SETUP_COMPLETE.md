# Email & PDF Report Functionality - Complete Setup Guide

## What Has Been Implemented

### 1. PDF Report Generation ✅
- **Library Added**: iText 7.2.5 for PDF generation
- **Features**:
  - Professional PDF layout with exam details
  - Score summary table with pass/fail status
  - Statistics breakdown (correct/wrong/unanswered)
  - Question-by-question analysis with:
    - Student's answer vs correct answer
    - Visual indicators (✓ for correct, ✗ for wrong)
    - Marks calculation per question
  - Color-coded sections (green for pass, red for fail)
  - Computer-generated footer

### 2. Email Configuration ✅
- **Sender Email**: sameersaxena0303@gmail.com
- **SMTP**: Gmail SMTP (smtp.gmail.com:587)
- **Attachment**: PDF report attached to every email
- **Subject**: "Exam Results - [Test Title]"

### 3. Email Sending Points
Students can send their test report via email from:
- **Performance Reports page**: Click "View Report" → Click "📧 Email Results" button
- **Test Report page**: Detailed report with email button at the top

Admins can send reports to students from:
- **Exam Attempts page**: Click "📧 Email" button for any student's attempt

## IMPORTANT: Setup Required Before Testing

### ⚠️ YOU MUST CONFIGURE APP PASSWORD ⚠️

The email functionality **WILL NOT WORK** until you complete these steps:

### Step-by-Step Configuration

#### 1. Generate Gmail App Password

1. **Go to Google Account Security**:
   - Visit: https://myaccount.google.com/security
   - Login with sameersaxena0303@gmail.com

2. **Enable 2-Step Verification** (if not already enabled):
   - Find "2-Step Verification" under "How you sign in to Google"
   - Follow the prompts to set it up

3. **Generate App Password**:
   - After 2-Step Verification is enabled
   - Find "App passwords" under "How you sign in to Google"
   - Click "App passwords"
   - Select:
     - App: **Mail**
     - Device: **Other (Custom name)**
     - Name: **Examination Portal**
   - Click **Generate**
   - You'll get a 16-character password like: `abcd efgh ijkl mnop`
   - **COPY THIS PASSWORD IMMEDIATELY** - you can't see it again!

#### 2. Update Backend Configuration

1. **Open this file**:
   ```
   /Users/I578484/fsad/backend/src/main/resources/application.properties
   ```

2. **Find line 27**:
   ```properties
   spring.mail.password=YOUR_APP_PASSWORD_HERE
   ```

3. **Replace with your app password** (remove all spaces):
   ```properties
   spring.mail.password=abcdefghijklmnop
   ```
   (Use your actual 16-character password without spaces)

4. **Save the file**

#### 3. Restart Backend

After updating the password:
```bash
# Stop the current backend (if running)
kill $(lsof -ti:8080)

# Start backend
cd /Users/I578484/fsad/backend
mvn spring-boot:run
```

## Testing the Email Functionality

### As a Student:

1. **Login** as a student account
2. **Take a test** (or use an existing completed test)
3. **Navigate** to Performance Reports
4. **Click** "View Report" button for any test
5. **Click** "📧 Email Results" button
6. **Check** the student's email inbox for the PDF attachment

### As an Admin:

1. **Login** as admin
2. **Navigate** to "Exam Attempts" page
3. **Find** any student's completed attempt
4. **Click** "📧 Email" button
5. The report will be sent to that student's registered email

## Files Modified

### Backend:
1. `/Users/I578484/fsad/backend/pom.xml`
   - Added iText PDF library dependency

2. `/Users/I578484/fsad/backend/src/main/resources/application.properties`
   - Updated email configuration with sameersaxena0303@gmail.com
   - **REQUIRES: App password to be set**

3. `/Users/I578484/fsad/backend/src/main/java/com/exam/portal/service/EmailService.java`
   - Complete rewrite with PDF generation
   - MimeMessage support for attachments
   - Professional PDF layout with tables and colors

4. `/Users/I578484/fsad/backend/src/main/java/com/exam/portal/model/Question.java`
   - Added `getOptionByNumber()` helper method

### Frontend:
- No changes needed - email buttons already exist and working

## Troubleshooting

### Error: "Authentication failed"
**Cause**: App password not configured or incorrect
**Solution**: Follow the app password generation steps above

### Error: "535 Authentication credentials invalid"
**Cause**: Wrong app password
**Solution**: Generate a new app password and update application.properties

### Error: "Failed to send email"
**Cause**: Backend not restarted after configuration
**Solution**: Restart the Spring Boot backend

### Email not received
**Possible causes**:
1. Check spam/junk folder
2. Verify student email address in database is correct
3. Check backend console logs for errors

## Security Notes

⚠️ **IMPORTANT**:
- **NEVER** commit your app password to Git
- **NEVER** share the app password publicly
- The app password gives full access to send emails from your account
- Rotate app passwords periodically
- Use environment variables in production

## Current Status

✅ **Configured**:
- PDF generation library installed
- Email service implemented
- Frontend buttons ready
- Backend endpoints ready

⚠️ **Pending** (YOU MUST DO):
- Generate Gmail app password
- Update application.properties with the password
- Restart backend

Once you complete the pending steps, the email functionality will work perfectly!
