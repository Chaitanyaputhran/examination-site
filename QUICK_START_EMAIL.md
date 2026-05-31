# 🚀 QUICK START - Email Configuration

## ⚠️ ACTION REQUIRED: 3-Minute Setup

### What You Need to Do RIGHT NOW:

1. **Go to**: https://myaccount.google.com/apppasswords
2. **Login**: sameersaxena0303@gmail.com
3. **Create**: App password for "Examination Portal"
4. **Copy**: The 16-character password (example: abcdefghijklmnop)

### Update Configuration:

**File**: `/Users/I578484/fsad/backend/src/main/resources/application.properties`

**Line 27** - Change this:
```
spring.mail.password=YOUR_APP_PASSWORD_HERE
```

**To this** (with YOUR actual password):
```
spring.mail.password=abcdefghijklmnop
```

### Restart Backend:

```bash
cd /Users/I578484/fsad/backend
kill $(lsof -ti:8080)
mvn spring-boot:run
```

## ✅ What's Already Done:

- ✅ Email sender configured: sameersaxena0303@gmail.com
- ✅ PDF generation implemented
- ✅ Email buttons active in UI
- ✅ Backend endpoints ready
- ✅ Professional PDF reports with:
  - Score breakdown
  - Question analysis
  - Color-coded results
  - Marks distribution

## 📧 How to Test:

1. Login as student
2. Complete a test
3. Go to Performance → View Report
4. Click "📧 Email Results"
5. Check email inbox for PDF

## 🔧 Current Status:

**Backend**: Running on port 8080
**Frontend**: Running on port 5173
**Email Status**: ⚠️ NEEDS APP PASSWORD

**Next Step**: Generate app password and update line 27 in application.properties

---

📖 **Full Documentation**: See EMAIL_PDF_SETUP_COMPLETE.md for detailed instructions
