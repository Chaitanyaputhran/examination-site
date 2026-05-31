# Email Configuration Setup Instructions

## Gmail App Password Setup

To enable email functionality with Gmail, you need to generate an App Password:

### Step 1: Enable 2-Step Verification
1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left navigation
3. Under "How you sign in to Google", click on "2-Step Verification"
4. Follow the steps to enable 2-Step Verification if not already enabled

### Step 2: Generate App Password
1. After enabling 2-Step Verification, go back to Security settings
2. Under "How you sign in to Google", click on "App passwords"
3. You may need to sign in again
4. Select "Mail" as the app and "Other" as the device
5. Enter a name like "Examination Portal"
6. Click "Generate"
7. Google will show you a 16-character password (e.g., "abcd efgh ijkl mnop")
8. **Copy this password immediately** - you won't be able to see it again

### Step 3: Update application.properties
1. Open: `/Users/I578484/fsad/backend/src/main/resources/application.properties`
2. Find this line:
   ```
   spring.mail.password=YOUR_APP_PASSWORD_HERE
   ```
3. Replace `YOUR_APP_PASSWORD_HERE` with the 16-character app password you generated
4. Remove any spaces from the password
5. Example:
   ```
   spring.mail.password=abcdefghijklmnop
   ```

### Step 4: Save and Restart
1. Save the application.properties file
2. Restart the Spring Boot backend application
3. The email functionality will now work

## Current Configuration

Email is configured to send from: **sameersaxena0303@gmail.com**

All exam reports will be sent as PDF attachments from this email address.

## Testing Email Functionality

After configuring the app password:
1. Login as a student
2. Take a test
3. Go to Performance Reports
4. Click "View Report" for any completed test
5. Click the "📧 Email Results" button
6. Check the student's email inbox for the PDF report

## Troubleshooting

### "Authentication failed" error
- Double-check the app password is correct
- Make sure there are no spaces in the password
- Verify 2-Step Verification is enabled

### "535 Authentication credentials invalid" error
- The app password might be incorrect
- Generate a new app password and update application.properties

### Email not received
- Check spam/junk folder
- Verify the student's email address is correct in the database
- Check backend logs for error messages

## Security Note

**NEVER commit your app password to version control!**
- Add application.properties to .gitignore if sharing code
- Use environment variables in production
- Rotate app passwords periodically for security
