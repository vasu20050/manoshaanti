# Railway Deployment Guide

## Mental Wellness Platform - Deploy with Railway

This guide will help you deploy your Mental Wellness Platform to Railway with HTML/CSS/JS frontend and Node.js backend.

---

## Prerequisites

Before starting, ensure you have:
- A GitHub account with your project repository
- A Railway account (sign up at https://railway.app)
- Git installed on your machine
- Node.js 18+ installed locally

---

## Step 1: Prepare Your Project

### 1.1 Initialize Git Repository
```bash
cd c:\Users\meapu\OneDrive\Desktop\mentelwll2.o
git init
git add .
git commit -m "Initial commit: Mental Wellness Platform"
```

### 1.2 Create GitHub Repository
1. Go to [GitHub](https://github.com/new) and create a new repository
2. Name it `mental-wellness-platform`
3. Follow the instructions to push your local code to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/mental-wellness-platform.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy on Railway

### 2.1 Connect Railway to GitHub
1. Visit [railway.app](https://railway.app)
2. Log in or create an account
3. Click "**New Project**"
4. Select "**Deploy from GitHub**"
5. Authorize Railway to access your GitHub account
6. Select your `mental-wellness-platform` repository

### 2.2 Configure Railway Project
1. Railway will automatically detect the project
2. Click on the detected service to configure settings
3. In the **Variables** tab, add these environment variables:
   - `PORT`: 5000
   - `NODE_ENV`: production
   - `JWT_SECRET`: (generate a random string, e.g., using `openssl rand -hex 32`)
   - `FRONTEND_URL`: (will be your Railway URL, add after deployment gets domain)

### 2.3 Deploy
1. Click the **"Deploy"** button
2. Railway will:
   - Build the Node.js backend
   - Start the server
   - Assign a public URL to your application
3. Monitor deployment in the **Deployments** tab

---

## Step 3: Verify Deployment

### 3.1 Access Your Application
1. Go to the **Settings** tab in your Railway project
2. Find the **Public URL** (looks like: `https://yourdomain.railway.app`)
3. Open it in your browser
4. You should see the Mental Wellness Platform login page

### 3.2 Test Health Check
```bash
curl https://yourdomain.railway.app/api/health
```

You should get:
```json
{"status":"OK","message":"Mental Wellness API is running"}
```

### 3.3 Test Functionality
1. Sign up with a test account
2. Test the chat feature
3. Try the assessment tool
4. Check mood tracking

---

## Step 4: Configure Production Settings

### 4.1 Update Environment Variables

In Railway Dashboard:
1. Go to your project's **Variables** tab
2. Update `FRONTEND_URL` with your public Railway URL
3. Consider using a strong, random `JWT_SECRET`

### 4.2 Generate Secure JWT Secret
Run this command locally:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and update `JWT_SECRET` in Railway Variables.

---

## Step 5: Enable Auto-Deployments (Optional)

1. In Railway dashboard, go to **Settings**
2. Enable **"Auto-deploy"** on push to main branch
3. Now every time you push to GitHub, Railway automatically redeploys

---

## Step 6: Monitor Your Application

### 6.1 View Logs
1. In Railway dashboard, click on your service
2. Go to the **Deployments** tab
3. Click on the active deployment to see real-time logs

### 6.2 Monitor Performance
1. Click on the **Monitoring** tab
2. View CPU, memory, and network usage
3. Monitor application health

---

## Troubleshooting

### Issue: Deployment Fails
**Solution:**
```bash
# Check that your Procfile is correct
cat Procfile

# Verify package.json in backend folder
cat backend/package.json

# Check that server.js exists
ls -la backend/server.js
```

### Issue: "Port already in use"
Railway automatically assigns PORT via environment variable. Make sure your server uses `process.env.PORT || 5000`.

### Issue: Frontend not loading
1. Verify frontend files are in `frontend/` folder
2. Check that `backend/server.js` serves static files from `../frontend`
3. Restart the deployment

### Issue: API calls returning 404
1. Check Frontend URL is correct in browser
2. Verify backend is running: `curl https://yourdomain.railway.app/api/health`
3. Check browser console for error messages

---

## Post-Deployment: Next Steps

### 1. Database Integration
Replace in-memory storage with a real database:
- **MongoDB**: Easy to integrate, free tier available
- **PostgreSQL**: More robust, use with Railway's database service
- Connection string should be stored in Railroad Variables

### 2. AI Integration
Replace the demo chatbot with:
- **Google Vertex AI**: Use Gemini API
- **OpenAI**: Use GPT models
- Add API key to Railway Variables

### 3. Custom Domain
1. In Railway Settings, go to **Domain**
2. Add your custom domain
3. Follow DNS configuration instructions

### 4. SSL/TLS
Railway provides free SSL certificates automatically.

### 5. Backup Strategy
Set up database backups if using Railway's database service.

---

## Useful Railway Commands

### List Projects
```bash
npm install -g @railway/cli
railway list
```

### Deploy from Command Line
```bash
railway login
railway link  # Select your project
railway up
```

### View Logs
```bash
railway logs
```

---

## Cost Estimation

**Railway Pricing:**
- 0-500 hours: Free
- After 500 hours: ~$5 per 1,000 compute hours
- Free tier typically covers small to medium projects

---

## Security Best Practices

1. ✅ Change `JWT_SECRET` from default
2. ✅ Use HTTPS (Railway provides free SSL)
3. ✅ Don't commit `.env` file
4. ✅ Regularly update dependencies: `npm audit fix`
5. ✅ Monitor logs for suspicious activity
6. ✅ Consider adding rate limiting for API endpoints

---

## Support Resources

- Railway Docs: https://docs.railway.app
- Discord Community: https://discord.gg/railway
- Email Support: support@railway.app

---

## FAQ

**Q: Can I use a free database on Railway?**  
A: Yes, Railway offers free PostgreSQL and MySQL databases.

**Q: How do I update my code after deployment?**  
A: Push to GitHub, and if auto-deploy is enabled, Railway redeploys automatically.

**Q: Can I run background jobs?**  
A: Yes, use Railway's Cron service or integrate a job queue like Bull.

**Q: How do I add more services (e.g., cache)?**  
A: Click "Add" in your Railway project and select the service.

---

## What's Included

✅ Frontend: HTML/CSS/JavaScript (vanilla)  
✅ Backend: Node.js with Express  
✅ Authentication: JWT-based auth  
✅ Chat API: AI-powered chatbot endpoints  
✅ Assessment API: Mental wellness assessment endpoints  
✅ Static File Serving: Frontend served from backend  
✅ CORS: Enabled for cross-origin requests  
✅ Error Handling: Comprehensive error responses  

---

**Last Updated:** March 13, 2026  
**Platform:** Mental Wellness  
**Version:** 1.0
