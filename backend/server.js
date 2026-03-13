require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

// ============ Configuration ============
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// ============ Middleware ============
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// ============ In-Memory Database (for demo) ============
let users = {};
let conversations = {};
let assessments = {};

// ============ Utility Functions ============
function generateToken(userId) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.userId = decoded.userId;
    next();
}

// ============ Authentication Routes ============
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validation
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password required' });
        }

        if (users[username]) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const userId = Date.now().toString();
        users[username] = {
            id: userId,
            username,
            password: hashedPassword,
            createdAt: new Date()
        };

        // Generate token
        const token = generateToken(userId);

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: userId,
                username
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validation
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password required' });
        }

        const user = users[username];
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user.id);

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ============ Chat Routes ============
app.post('/api/chat/message', authenticateToken, (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.userId;

        if (!message) {
            return res.status(400).json({ message: 'Message required' });
        }

        // Initialize conversation if needed
        if (!conversations[userId]) {
            conversations[userId] = [];
        }

        // Add user message
        conversations[userId].push({
            sender: 'user',
            text: message,
            timestamp: new Date()
        });

        // Generate AI response (simple demo - replace with actual AI service)
        const reply = generateAIResponse(message);

        // Add bot response
        conversations[userId].push({
            sender: 'bot',
            text: reply,
            timestamp: new Date()
        });

        res.json({
            reply,
            conversationLength: conversations[userId].length
        });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/chat/history', authenticateToken, (req, res) => {
    try {
        const userId = req.userId;
        const history = conversations[userId] || [];

        res.json({
            history: history.slice(-50) // Return last 50 messages
        });
    } catch (error) {
        console.error('History error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ============ Assessment Routes ============
app.post('/api/assessment/submit', authenticateToken, (req, res) => {
    try {
        const { score, responses } = req.body;
        const userId = req.userId;

        if (!score || !responses) {
            return res.status(400).json({ message: 'Score and responses required' });
        }

        // Store assessment
        if (!assessments[userId]) {
            assessments[userId] = [];
        }

        assessments[userId].push({
            score,
            responses,
            timestamp: new Date()
        });

        res.json({
            message: 'Assessment submitted successfully',
            score,
            feedback: getAssessmentFeedback(score)
        });
    } catch (error) {
        console.error('Assessment error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/assessment/history', authenticateToken, (req, res) => {
    try {
        const userId = req.userId;
        const history = assessments[userId] || [];

        res.json({
            history: history.slice(-12) // Return last 12 assessments
        });
    } catch (error) {
        console.error('Assessment history error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ============ User Routes ============
app.get('/api/user/profile', authenticateToken, (req, res) => {
    try {
        const userId = req.userId;

        // Find user by ID
        let userProfile = null;
        for (let username in users) {
            if (users[username].id === userId) {
                userProfile = {
                    id: users[username].id,
                    username: users[username].username,
                    createdAt: users[username].createdAt
                };
                break;
            }
        }

        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user: userProfile });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ============ Health Check ============
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'ManoShaanti API is running' });
});

// ============ Serve Frontend ============
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ============ AI Response Generator (Demo) ============
function generateAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // Simple pattern matching for demo (replace with actual AI service)
    const responses = {
        anxiety: [
            "I understand anxiety can be challenging. Try deep breathing exercises: inhale for 4 counts, hold for 4, exhale for 4. Would you like to learn more techniques?",
            "Anxiety is treatable. Consider practicing mindfulness or meditation. Would that interest you?"
        ],
        sleep: [
            "Quality sleep is crucial for mental wellness. Try maintaining a consistent sleep schedule and avoid screens 1 hour before bed.",
            "Sleep issues can affect mood. Would you like tips for better sleep hygiene?"
        ],
        stress: [
            "It's okay to feel stressed. Break tasks into smaller parts and take regular breaks. What's causing your stress?",
            "Stress management is important. Exercise, meditation, and talking to someone can help."
        ],
        happy: [
            "I'm glad to hear you're doing well! Keep up those positive habits that make you feel good.",
            "That's wonderful! Celebrating small wins is important for mental wellness."
        ],
        sad: [
            "It's okay to feel sad sometimes. Consider reaching out to someone you trust or seeking professional help if needed.",
            "Sadness is a natural emotion. Would you like to talk more about what's bothering you?"
        ]
    };

    let response = "Thank you for sharing. I'm here to support you. ";

    if (lowerMessage.includes('anxiety') || lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
        response = responses.anxiety[Math.floor(Math.random() * responses.anxiety.length)];
    } else if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) {
        response = responses.sleep[Math.floor(Math.random() * responses.sleep.length)];
    } else if (lowerMessage.includes('stress') || lowerMessage.includes('stressed') || lowerMessage.includes('pressure')) {
        response = responses.stress[Math.floor(Math.random() * responses.stress.length)];
    } else if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great')) {
        response = responses.happy[Math.floor(Math.random() * responses.happy.length)];
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
        response = responses.sad[Math.floor(Math.random() * responses.sad.length)];
    }

    return response;
}

function getAssessmentFeedback(score) {
    if (score <= 1) {
        return 'Your score indicates you may benefit from professional support. Please reach out to a mental health professional.';
    } else if (score <= 2) {
        return 'Your score suggests some challenges. Consider reaching out to support resources.';
    } else if (score <= 3) {
        return 'Your score is moderate. Keep practicing self-care habits.';
    } else {
        return 'Excellent score! Keep maintaining your healthy habits.';
    }
}

// ============ Error Handling ============
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
});

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// ============ Start Server ============
app.listen(PORT, () => {
    console.log(`🚀 ManoShaanti Backend running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
