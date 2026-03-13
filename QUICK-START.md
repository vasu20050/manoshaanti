# Quick Start Guide

## Mental Wellness Platform - Local Development Setup

Get the Mental Wellness Platform running on your computer in minutes!

---

## System Requirements

- **Node.js**: 18.x or higher ([Download](https://nodejs.org/))
- **npm**: Usually comes with Node.js
- **Git**: For version control
- **OS**: Windows, macOS, or Linux

---

## Installation: 5 Minutes

### Step 1: Navigate to Project
```bash
cd c:\Users\meapu\OneDrive\Desktop\mentelwll2.o
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Create Environment File
```bash
# In the root directory (mentelwll2.o folder)
copy .env.example .env
```

Edit `.env` and update if needed:
```
PORT=5000
NODE_ENV=development
JWT_SECRET=dev-secret-key-change-in-production
FRONTEND_URL=http://localhost:3000
```

### Step 4: Start Backend Server
```bash
cd backend
npm start
```

You should see:
```
🚀 Mental Wellness Backend running on port 5000
Environment: development
```

### Step 5: Open Frontend in Browser
1. Open your browser
2. Go to: **http://localhost:5000**
3. You should see the Mental Wellness login page

---

## Development Mode

### Run Backend in Watch Mode
```bash
cd backend
npm run dev
```

This automatically restarts the server when you make changes.

---

## First Steps

### 1. Create an Account
1. Click **Sign Up** on the login page
2. Enter username: `testuser`
3. Enter password: `password123`
4. Click **Sign Up**

### 2. Explore Features

**Dashboard**
- View your today's mood selector
- Quick access to all features

**Chat Support**
- Start a conversation with the AI chatbot
- Try questions like: "I'm feeling anxious" or "I can't sleep"

**Assessment**
- Answer wellness questions
- Get personalized wellness score

**Mood Tracking**
- Log your daily mood
- Add optional notes
- View history of mood entries

**Resources**
- Find crisis hotlines
- Get self-care tips
- Access mental health articles

---

## Project Structure

```
mentelwll2.o/
├── frontend/                 # Frontend source code
│   ├── index.html           # Main HTML file
│   ├── styles.css           # Styling
│   ├── script.js            # Client-side JavaScript
│   └── ...
├── backend/                  # Backend source code
│   ├── server.js            # Express server
│   ├── package.json         # Backend dependencies
│   └── ...
├── package.json             # Root package config
├── Procfile                 # Railway deployment config
├── railway.json             # Railway settings
├── .env.example             # Environment template
├── .gitignore              # Git ignore config
└── README.md               # Project info
```

---

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login to account

### Chat
- `POST /api/chat/message` - Send chat message (requires auth)
- `GET /api/chat/history` - Get chat history (requires auth)

### Assessment
- `POST /api/assessment/submit` - Submit assessment (requires auth)
- `GET /api/assessment/history` - Get assessment history (requires auth)

### User
- `GET /api/user/profile` - Get user profile (requires auth)

### Health
- `GET /api/health` - Health check (no auth required)

---

## Example API Calls

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Send Chat Message
```bash
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"message":"I am feeling anxious"}'
```

---

## Troubleshooting

### Problem: "Port 5000 already in use"
**Solution:**
```bash
# Windows - Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### Problem: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Problem: Backend starts but frontend blank
**Solution:**
1. Check console for errors (F12)
2. Verify backend is running on port 5000
3. Try refreshing the page

### Problem: Can't login after signup
**Solution:**
1. Check browser console for errors
2. Ensure backend is responding: `curl http://localhost:5000/api/health`
3. Try clearing browser cache (Ctrl+Shift+Delete)

---

## Next Steps

### Customize Your Platform

**Update User Info:**
- Edit `frontend/index.html` - Change title and content
- Edit `frontend/styles.css` - Modify colors and styling
- Edit `frontend/script.js` - Update API behavior

**Add More Features:**
1. More chat topics in `backend/server.js` (`generateAIResponse` function)
2. More assessment questions in `frontend/index.html`
3. More resources in the resources section

**Connect Real AI:**
1. Get API key from OpenAI or Google Vertex AI
2. Store in `.env` file
3. Replace demo response with actual AI call

**Add Database:**
1. Install MongoDB or PostgreSQL
2. Create connection string
3. Update `backend/server.js` to use database instead of in-memory storage

---

## Deployment

See [RAILWAY-DEPLOYMENT.md](./RAILWAY-DEPLOYMENT.md) for complete deployment guide.

**Quick Deploy:**
1. Push to GitHub
2. Connect Railway to your repo
3. Add environment variables
4. Deploy!

---

## Development Tips

### Hot Reload Backend
```bash
npm run dev  # Restarts when files change
```

### Debug API Calls
Open browser console (F12) to see all API requests and responses.

### View Backend Logs
Terminal shows all server logs and errors.

### Reset Data
Data is stored in memory, so restarting the server resets all user data (for development).

---

## Support Files

- **RAILWAY-DEPLOYMENT.md** - Deployment guide
- **.env.example** - Environment variables template
- **Procfile** - Railway configuration
- **railway.json** - Railway settings

---

## Useful Commands

```bash
# Install dependencies
npm install

# Start backend (normal mode)
npm start

# Start backend (watch mode)
npm run dev

# Check health of API
curl http://localhost:5000/api/health

# View all npm scripts
npm run
```

---

## Next: Deploy to Railway

Ready to go live? Follow the [Railway Deployment Guide](./RAILWAY-DEPLOYMENT.md) to deploy your app online in minutes!

---

**Happy Coding! 🧠💚**

For questions, check Railway docs: https://docs.railway.app
