# Mental Wellness Platform

**AI-powered, confidential mental wellness platform for Indian youth**

---

## 🎯 Project Overview

Mental Wellness Platform is a web-based application designed to provide 24/7 mental health support for Indian youth aged 16-25. The platform combines:

- **AI-Powered Chat Support** - Empathetic conversations with intelligent responses
- **Mental Wellness Assessment** - Self-assessment tools and mood tracking
- **Wellness Resources** - Curated content, crisis hotlines, and professional referrals
- **Privacy-First Design** - Confidential, non-judgmental support space

---

## 🏗️ Architecture

### Frontend
- **Technology**: HTML5, CSS3, Vanilla JavaScript
- **Location**: `frontend/` folder
- **Pages**: Login, Dashboard, Chat, Assessment, Mood Tracking, Resources
- **Styling**: Responsive design (mobile, tablet, desktop)

### Backend
- **Technology**: Node.js + Express.js
- **Location**: `backend/` folder
- **API**: RESTful endpoints with JWT authentication
- **Storage**: In-memory storage (demo mode)

### Deployment
- **Platform**: Railway
- **Domain**: Auto-assigned Railway URL
- **Scaling**: Automatic with Railway

---

## 📦 Project Structure

```
mental-wellness-platform/
│
├── frontend/                    # Frontend source code
│   ├── index.html             # Main HTML file with all sections
│   ├── styles.css             # Complete styling and responsive design
│   ├── script.js              # Client-side logic and API calls
│   └── assets/                # (Optional) Images, icons, etc.
│
├── backend/                     # Backend source code
│   ├── server.js              # Express server & all API routes
│   ├── package.json           # Backend dependencies
│   └── node_modules/          # Dependencies (auto-created)
│
├── package.json               # Root project config
├── Procfile                   # Railway deployment config
├── railway.json               # Railway project settings
│
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
│
├── README.md                  # This file
├── QUICK-START.md            # Local development guide
├── RAILWAY-DEPLOYMENT.md     # Production deployment guide
│
└── documentation/             # (Optional) Additional docs
    ├── PRD.md                # Product requirements
    └── architecture.md       # System architecture
```

---

## ✨ Features

### Authentication
- ✅ User signup with secure password hashing (bcryptjs)
- ✅ Login with JWT token generation
- ✅ Secure token-based API access
- ✅ Password validation

### Chat Support
- ✅ Real-time chat interface with bot responses
- ✅ AI-powered response generation (demо)
- ✅ Context-aware conversation handling
- ✅ Chat history retrieval

### Mental Wellness Assessment
- ✅ Multi-question self-assessment
- ✅ Personalized wellness scoring
- ✅ Automated feedback based on responses
- ✅ Assessment history tracking

### Mood Tracking
- ✅ Daily mood emoji selection (1-5 scale)
- ✅ Optional notes with mood entries
- ✅ Visual mood history
- ✅ Trend analysis

### Resources
- ✅ Crisis hotline information (India-specific)
- ✅ Self-care tips and guidelines
- ✅ Mental health articles
- ✅ Professional help recommendations

### Security
- ✅ JWT authentication on protected routes
- ✅ Password hashing with bcryptjs
- ✅ CORS configuration
- ✅ XSS protection

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Environment Variables
```bash
# In root folder
copy .env.example .env
```

### 3. Run Backend Server
```bash
cd backend
npm start
```

### 4. Open in Browser
Visit: **http://localhost:5000**

### 5. Create Account & Explore
- Sign up with test credentials
- Try chat, assessment, mood tracking
- Explore resources

**Full Guide:** See [QUICK-START.md](./QUICK-START.md)

---

## 🌐 API Documentation

### Base URL
- Local: `http://localhost:5000/api`
- Production: `https://yourdomain.railway.app/api`

### Authentication Endpoints

#### Sign Up
```
POST /api/auth/signup
Body: { "username": "user", "password": "pass" }
Response: { "token": "...", "user": {...} }
```

#### Login
```
POST /api/auth/login
Body: { "username": "user", "password": "pass" }
Response: { "token": "...", "user": {...} }
```

### Chat Endpoints (Requires Authentication)

#### Send Message
```
POST /api/chat/message
Headers: { "Authorization": "Bearer TOKEN" }
Body: { "message": "I feel anxious" }
Response: { "reply": "...", "conversationLength": 2 }
```

#### Get Chat History
```
GET /api/chat/history
Headers: { "Authorization": "Bearer TOKEN" }
Response: { "history": [...] }
```

### Assessment Endpoints (Requires Authentication)

#### Submit Assessment
```
POST /api/assessment/submit
Headers: { "Authorization": "Bearer TOKEN" }
Body: { "score": 3, "responses": {...} }
Response: { "message": "...", "feedback": "..." }
```

#### Get Assessment History
```
GET /api/assessment/history
Headers: { "Authorization": "Bearer TOKEN" }
Response: { "history": [...] }
```

### User Endpoints (Requires Authentication)

#### Get Profile
```
GET /api/user/profile
Headers: { "Authorization": "Bearer TOKEN" }
Response: { "user": {...} }
```

### Health Check (No Auth Required)

#### Health Status
```
GET /api/health
Response: { "status": "OK", "message": "Mental Wellness API is running" }
```

---

## 🛠️ Development

### Start Backend (Watch Mode)
```bash
cd backend
npm run dev
```

### Available npm Scripts
```bash
npm start    # Start server
npm run dev  # Start with auto-reload
```

### Tech Stack Details

**Frontend:**
- HTML5 semantic markup
- CSS3 with CSS custom properties (variables)
- Vanilla JavaScript (no frameworks)
- Responsive grid and flexbox layout

**Backend:**
- Express.js for routing
- bcryptjs for password hashing
- jsonwebtoken for authentication
- CORS middleware for cross-origin requests
- dotenv for environment configuration

---

## 📱 Responsive Design

The platform is fully responsive:
- **Desktop:** Multi-column layout with sidebar
- **Tablet:** Optimized grid layout
- **Mobile:** Single column, stacked navigation

---

## 🔒 Security Considerations

### Current Implementation
- ✅ JWT token-based authentication
- ✅ Password hashing (bcryptjs)
- ✅ CORS enabled
- ✅ Environment variables for sensitive data

### For Production
- 🔲 Add rate limiting
- 🔲 Implement request validation
- 🔲 Add helmet.js for security headers
- 🔲 Use HTTPS (Railway provides free SSL)
- 🔲 Integrate real database
- 🔲 Add logging and monitoring
- 🔲 Implement session management
- 🔲 Add two-factor authentication

---

## 🚢 Deployment on Railway

### Prerequisites
- GitHub account with code pushed
- Railway account (free at railway.app)

### Deploy in 3 Steps
1. Connect your GitHub repo to Railway
2. Add environment variables (JWT_SECRET, etc.)
3. Click Deploy!

**Detailed Guide:** See [RAILWAY-DEPLOYMENT.md](./RAILWAY-DEPLOYMENT.md)

### Environment Variables for Production
```
PORT=5000
NODE_ENV=production
JWT_SECRET=<generate-strong-random-key>
FRONTEND_URL=<your-railway-url>
```

---

## 🔄 Next Steps & Enhancements

### Phase 1: Core Features (Complete)
- ✅ Frontend with responsive design
- ✅ Backend API with authentication
- ✅ Chat endpoint with demo AI
- ✅ Assessment tool
- ✅ Mood tracking

### Phase 2: AI Integration
- [ ] Connect Google Vertex AI / Gemini
- [ ] Implement real chatbot responses
- [ ] Add emotion detection
- [ ] Crisis detection and escalation

### Phase 3: Database Integration
- [ ] Add MongoDB or PostgreSQL
- [ ] Persistent user data storage
- [ ] Conversation history
- [ ] Analytics dashboard

### Phase 4: Advanced Features
- [ ] Appointment scheduling with professionals
- [ ] Video call support
- [ ] Community forums
- [ ] Gamification (badges, streaks)
- [ ] Push notifications

### Phase 5: Production Ready
- [ ] Unit and integration tests
- [ ] CI/CD pipeline
- [ ] Performance optimization
- [ ] Security audit
- [ ] Custom domain
- [ ] Email notifications

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process if needed
taskkill /PID <PID> /F

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Blank frontend page
1. Check browser console (F12)
2. Verify backend is running: `curl http://localhost:5000/api/health`
3. Check firewall settings
4. Try incognito mode to clear cache

### API 404 errors
1. Verify endpoint URL is correct
2. Check backend is running
3. Test with curl or Postman
4. Review error message in browser console

---

## 📚 Resources

### Documentation Files
- **QUICK-START.md** - Local development setup
- **RAILWAY-DEPLOYMENT.md** - Production deployment
- **PRD.md** - Product requirements and features
- **architecture.md** - System architecture details

### External Resources
- [Express.js Documentation](https://expressjs.com)
- [Railway Documentation](https://docs.railway.app)
- [JWT Guide](https://jwt.io)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## 👋 Support

### Getting Help
1. Check [QUICK-START.md](./QUICK-START.md) for local setup issues
2. See [RAILWAY-DEPLOYMENT.md](./RAILWAY-DEPLOYMENT.md) for deployment help
3. Review error messages in browser console (F12)
4. Check backend logs in terminal

### Community
- Railway Discord: https://discord.gg/railway
- Railway Docs: https://docs.railway.app

---

## 📄 License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgments

- Built for Indian youth mental wellness
- Inspired by accessibility and stigma reduction
- Designed with privacy and confidentiality in mind

---

## 📝 Changelog

### Version 1.0 (Current)
- Initial release
- Frontend: HTML/CSS/JS
- Backend: Node.js/Express
- Features: Chat, Assessment, Mood Tracking, Resources
- Deployment: Railway ready

---

**Created:** March 13, 2026  
**Status:** Active Development  
**Deployment:** Railway  
**Tech:** Node.js + HTML/CSS/JS

---

## Quick Links

| Link | Purpose |
|------|---------|
| [QUICK-START.md](./QUICK-START.md) | Local development |
| [RAILWAY-DEPLOYMENT.md](./RAILWAY-DEPLOYMENT.md) | Deploy to production |
| [PRD.md](./PRD.md) | Features & requirements |
| [architecture.md](./architecture.md) | System design |

---

**Happy Coding! 💚🧠**
