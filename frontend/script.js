// ==========================================
// MANOSHAANTI PLATFORM - JAVASCRIPT
// ==========================================

// ========== State Management ==========
const state = {
    currentPage: 'landing',
    sidebarOpen: true,
    darkMode: localStorage.getItem('darkMode') !== 'false',
    conversations: [],
    moodData: [],
    currentAssessment: null,
    currentQuestionIndex: 0,
};

// Assessment Questions
const assessments = {
    anxiety: {
        title: 'Anxiety Screening',
        questions: [
            {
                text: 'Do you feel nervous, anxious, or on edge?',
                options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
            },
            {
                text: 'How often do you find it hard to relax?',
                options: ['Never', 'Sometimes', 'Often', 'Very often']
            },
            {
                text: 'Do you worry too much about different things?',
                options: ['No', 'A little', 'Quite a bit', 'Very much']
            },
            {
                text: 'Does worry interfere with your daily activities?',
                options: ['Not at all', 'Mildly', 'Moderately', 'Severely']
            },
            {
                text: 'How often do you feel panic or fear?',
                options: ['Never', 'Occasionally', 'Frequently', 'Constantly']
            }
        ]
    },
    depression: {
        title: 'Depression Screening',
        questions: [
            {
                text: 'Have you felt down or hopeless?',
                options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
            },
            {
                text: 'Do you feel little interest or pleasure in activities?',
                options: ['Not at all', 'A few days', 'About half the days', 'Most days']
            },
            {
                text: 'How would you rate your energy levels?',
                options: ['High', 'Moderate', 'Low', 'Very low']
            },
            {
                text: 'Do you feel bad about yourself?',
                options: ['Never', 'Rarely', 'Sometimes', 'Often']
            },
            {
                text: 'Do you have trouble concentrating?',
                options: ['Not at all', 'Somewhat', 'Quite a bit', 'Very much']
            }
        ]
    },
    stress: {
        title: 'Stress Assessment',
        questions: [
            {
                text: 'How much stress do you currently feel?',
                options: ['None', 'Mild', 'Moderate', 'Severe']
            },
            {
                text: 'Do you feel overwhelmed by your responsibilities?',
                options: ['Not at all', 'A little', 'Quite a bit', 'Very much']
            },
            {
                text: 'How often do you feel unable to cope?',
                options: ['Never', 'Sometimes', 'Often', 'Very often']
            }
        ]
    }
};

// AI Chat Responses (Demo)
const aiResponses = {
    stressed: [
        "I hear that you're feeling stressed. That's completely valid. Would you like to talk about what's contributing to this? Sometimes breaking down the stressors can help.",
        "Stress is your body's way of responding to a challenge. Let's explore what's overwhelming you right now and work through it together.",
        "I'm glad you reached out. Stress affects many people. Would a breathing exercise help right now, or would you prefer to talk through what's happening?"
    ],
    anxious: [
        "Anxiety can feel really uncomfortable. I'm here to help. Can you describe what you're feeling right now? Where do you feel it in your body?",
        "Many people experience anxiety, and it's treatable. Let's work together to understand your triggers and develop some coping strategies.",
        "It's great that you're recognizing your anxiety. This awareness is the first step. What would help you feel calmer right now?"
    ],
    overwhelmed: [
        "It sounds like a lot is on your plate. Taking things one step at a time can help. What's the most pressing thing right now?",
        "When we're overwhelmed, everything can feel too much. Let's break this down into manageable pieces.",
        "Feeling overwhelmed is a signal that you might need to prioritize or seek support. What would help you most right now?"
    ],
    motivation: [
        "I hear that you need some motivation. Remember, progress over perfection is what matters. What's one small step you can take today?",
        "Finding motivation can be challenging. Sometimes connecting with your 'why' helps. What's important to you?",
        "You've overcome challenges before, and you can do it again. What specific goal would help motivate you right now?"
    ],
    sleep: [
        "Sleep is crucial for mental health. Let me share some evidence-based techniques for better sleep. First, what's your sleep like lately?",
        "Trouble sleeping? This is very common. Let's explore your sleep routine and what might be interfering.",
        "I can help with sleep strategies. In the meantime, try a relaxation exercise. Would a guided breathing technique help you wind down?"
    ],
    default: [
        "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about how you're feeling?",
        "That's important information. How is this affecting your daily life?",
        "I appreciate you opening up. What would be most helpful for you right now?"
    ]
};

// ========== Initialization ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Set dark mode if enabled
    if (state.darkMode) {
        document.body.classList.add('dark-mode');
    }

    // Initialize animations
    setupAnimations();

    // Set active page
    goToPage('landing');

    // Setup event listeners
    setupStressSlider();
}

function setupEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navbarMenu.style.display = navbarMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// ========== Page Navigation ==========
function goToPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const page = document.getElementById(pageName);
    if (page) {
        page.classList.add('active');
        state.currentPage = pageName;

        // Trigger animations for the active page
        triggerPageReveals(pageName);

        // Close sidebar on mobile when navigating
        if (document.body.offsetWidth < 1024) {
            closeSidebar();
        }
    }
}

// ========== Animation System ==========
function setupAnimations() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        // Store observer on state
        state.revealObserver = revealObserver;
    }

    // Setup scroll reveal for all pages
    setupScrollReveal();

    // Add ripple effect to all buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', addRippleEffect);
    });

    // Setup glow animations for inputs
    document.querySelectorAll('input[type="text"], textarea').forEach(input => {
        setupGlowAnimation(input);
    });
}

function triggerPageReveals(pageName) {
    const page = document.getElementById(pageName);
    if (!page) return;

    // Get all reveal elements on this page
    const reveals = page.querySelectorAll('.reveal');
    
    // Setup scroll reveal for elements on this page
    setupScrollReveal();

    // Manually trigger reveals for visible elements
    reveals.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('active');
        }, index * 100);
    });

    // Animate page heading if exists
    const pageHeader = page.querySelector('.page-header');
    if (pageHeader) {
        pageHeader.style.animation = 'pageSlideIn 0.5s ease-out';
    }
}

    // Reset reveal elements on other pages
    document.querySelectorAll('.page').forEach(p => {
        if (p.id !== pageName) {
            p.querySelectorAll('.reveal').forEach(el => {
                el.classList.remove('active');
                if (state.revealObserver) {
                    state.revealObserver.unobserve(el);
                }
            });
        }
    });

    // Observe and trigger elements on the active page
    const reveals = page.querySelectorAll('.reveal');
    reveals.forEach(el => {
        if (state.revealObserver) {
            state.revealObserver.observe(el);
        } else {
            el.classList.add('active');
        }
    });

    // Restart chart bar growth animation on mood page
    if (pageName === 'mood') {
        const bars = page.querySelectorAll('.chart-bar');
        bars.forEach(bar => {
            bar.style.animation = 'none';
            bar.offsetHeight; // force reflow
            bar.style.animation = '';
        });
    }
}

function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========== Theme Toggle ==========
function toggleTheme() {
    state.darkMode = !state.darkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', state.darkMode);
}

// ========== Chat Functionality ==========
function setActiveChat(chatType) {
    // Update sidebar active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.nav-item').classList.add('active');
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function sendMessage(message = null) {
    const input = document.getElementById('messageInput');
    const messageText = message || input.value.trim();

    if (!messageText) return;

    const chatMessages = document.getElementById('chatMessages');

    // Add user message with animation
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message-group user-message';
    userMessageDiv.style.opacity = '0';
    userMessageDiv.style.transform = 'scale(0.95)';
    userMessageDiv.innerHTML = `
        <div class="message">
            <p>${escapeHtml(messageText)}</p>
        </div>
    `;
    chatMessages.appendChild(userMessageDiv);

    // Animate message in
    setTimeout(() => {
        userMessageDiv.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        userMessageDiv.style.opacity = '1';
        userMessageDiv.style.transform = 'scale(1)';
    }, 10);

    // Clear input
    input.value = '';
    input.focus();

    // Scroll to bottom
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 0);

    // Show typing indicator
    addTypingIndicator();

    // Simulate AI response delay
    setTimeout(() => {
        removeTypingIndicator();
        addAiResponse(messageText);
    }, 1500);

    // Store conversation
    state.conversations.push({
        user: messageText,
        timestamp: new Date()
    });
}

function addTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message-group';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-leaf"></i>
        </div>
        <div class="message">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

function addAiResponse(userMessage) {
    const chatMessages = document.getElementById('chatMessages');

    // Determine response category
    let responseCategory = 'default';
    const messageLower = userMessage.toLowerCase();

    if (messageLower.includes('stress') || messageLower.includes('overwhelming')) {
        responseCategory = 'stressed';
    } else if (messageLower.includes('anxious') || messageLower.includes('anxiety') || messageLower.includes('nervous')) {
        responseCategory = 'anxious';
    } else if (messageLower.includes('overwhelmed') || messageLower.includes('too much')) {
        responseCategory = 'overwhelmed';
    } else if (messageLower.includes('motivation') || messageLower.includes('motivated') || messageLower.includes('unmotivated')) {
        responseCategory = 'motivation';
    } else if (messageLower.includes('sleep') || messageLower.includes('tired') || messageLower.includes('insomnia')) {
        responseCategory = 'sleep';
    }

    // Get random response
    const responses = aiResponses[responseCategory];
    const response = responses[Math.floor(Math.random() * responses.length)];

    // Add AI message with animation
    const aiMessageDiv = document.createElement('div');
    aiMessageDiv.className = 'message-group';
    aiMessageDiv.style.opacity = '0';
    aiMessageDiv.style.transform = 'translateY(10px) scale(0.95)';
    aiMessageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-leaf"></i>
        </div>
        <div class="message">
            <p>${response}</p>
        </div>
    `;
    chatMessages.appendChild(aiMessageDiv);

    // Animate message in
    setTimeout(() => {
        aiMessageDiv.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        aiMessageDiv.style.opacity = '1';
        aiMessageDiv.style.transform = 'translateY(0) scale(1)';
    }, 50);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function toggleSidebar() {
    const sidebar = document.querySelector('.chat-sidebar');
    if (sidebar) {
        state.sidebarOpen = !state.sidebarOpen;
        sidebar.style.display = state.sidebarOpen ? 'flex' : 'none';
    }
}

function closeSidebar() {
    const sidebar = document.querySelector('.chat-sidebar');
    if (sidebar && document.body.offsetWidth < 1024) {
        sidebar.style.display = 'none';
        state.sidebarOpen = false;
    }
}

// ========== Mood Tracker ==========
function selectMood(mood, element) {
    // Remove previous selection
    document.querySelectorAll('.mood-emoji').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Add selection to clicked button with animation
    element.classList.add('selected');
    addPulseAnimation(element);

    // Store selection
    state.selectedMood = mood;
}

function setupStressSlider() {
    const slider = document.getElementById('stressSlider');
    const valueDisplay = document.getElementById('stressValue');

    if (slider && valueDisplay) {
        slider.addEventListener('input', (e) => {
            valueDisplay.textContent = e.target.value;
        });
    }
}

function saveMood() {
    const mood = state.selectedMood || 'not-selected';
    const stress = document.getElementById('stressSlider')?.value;
    const note = document.getElementById('moodNote')?.value;

    if (!state.selectedMood) {
        alert('Please select a mood first');
        return;
    }

    const moodEntry = {
        mood,
        stress: parseInt(stress),
        note,
        timestamp: new Date()
    };

    state.moodData.push(moodEntry);

    // Show success message with animation
    const button = event.target;
    const originalText = button.textContent;
    showSuccessAnimation(button, '✓ Mood Saved!', 2000);

    // Reset form with animation
    setTimeout(() => {
        // Fade out form elements
        const formElements = document.querySelectorAll('.mood-emoji, #moodNote, #stressSlider');
        formElements.forEach(el => {
            el.style.opacity = '0.5';
        });

        // Reset after fade
        setTimeout(() => {
            document.querySelectorAll('.mood-emoji').forEach(btn => {
                btn.classList.remove('selected');
                btn.style.opacity = '1';
            });
            document.getElementById('moodNote').value = '';
            document.getElementById('moodNote').style.opacity = '1';
            document.getElementById('stressSlider').value = 5;
            document.getElementById('stressSlider').style.opacity = '1';
            document.getElementById('stressValue').textContent = '5';
            state.selectedMood = null;
        }, 300);
    }, 500);
}

// ========== Assessment ==========
function startAssessment(assessmentType) {
    const assessment = assessments[assessmentType];
    if (!assessment) return;

    state.currentAssessment = assessmentType;
    state.currentQuestionIndex = 0;
    state.assessmentAnswers = {};

    const modal = document.getElementById('assessmentModal');
    modal.classList.add('active');

    document.getElementById('assessmentTitle').textContent = assessment.title;
    document.getElementById('totalQuestions').textContent = assessment.questions.length;

    displayQuestion();
}

function displayQuestion() {
    const assessment = assessments[state.currentAssessment];
    const question = assessment.questions[state.currentQuestionIndex];

    const container = document.getElementById('questionContainer');
    container.innerHTML = `
        <div class="question-text">${question.text}</div>
        <div class="question-options">
            ${question.options.map((option, idx) => `
                <button class="option-btn" onclick="selectAnswer(${idx}, this)">
                    ${option}
                </button>
            `).join('')}
        </div>
    `;

    // Update progress
    const progress = ((state.currentQuestionIndex + 1) / assessments[state.currentAssessment].questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('currentQuestion').textContent = state.currentQuestionIndex + 1;

    // Update button state
    const nextBtn = document.getElementById('nextBtn');
    const totalQuestions = assessments[state.currentAssessment].questions.length;
    nextBtn.textContent = state.currentQuestionIndex === totalQuestions - 1 ? 'Complete' : 'Next';
}

function selectAnswer(index, element) {
    // Remove previous selection
    element.parentElement.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Add selection
    element.classList.add('selected');
    state.assessmentAnswers[state.currentQuestionIndex] = index;
}

function nextQuestion() {
    const totalQuestions = assessments[state.currentAssessment].questions.length;

    if (state.currentQuestionIndex < totalQuestions - 1) {
        state.currentQuestionIndex++;
        displayQuestion();
    } else {
        completeAssessment();
    }
}

function previousQuestion() {
    if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex--;
        displayQuestion();
    }
}

function completeAssessment() {
    const assessmentType = state.currentAssessment;
    const answers = state.assessmentAnswers;

    // Calculate score
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
    const maxScore = assessments[assessmentType].questions.length * 3;
    const percentage = Math.round((totalScore / maxScore) * 100);

    // Show results
    const container = document.getElementById('questionContainer');
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem;>
            <h2 style="margin-bottom: 1rem;">Assessment Complete!</h2>
            <div style="font-size: 2rem; color: var(--primary); margin: 1rem 0;">
                ${percentage}%
            </div>
            <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                ${percentage < 30 ? 'You appear to be managing well. Keep up the good work!' :
                  percentage < 60 ? 'You may be experiencing some challenges. Consider reaching out for support.' :
                  percentage < 85 ? 'You might benefit from professional support. We recommend talking to a therapist.' :
                  'Please reach out to a mental health professional or crisis line. You don\'t have to face this alone.'}
            </p>
            <button class="btn btn-secondary" onclick="closeAssessment()">
                View Resources
            </button>
        </div>
    `;

    // Update button
    document.getElementById('nextBtn').textContent = 'Done';
}

function closeAssessment() {
    const modal = document.getElementById('assessmentModal');
    modal.classList.remove('active');

    if (state.currentAssessment && Math.round((Object.values(state.assessmentAnswers).reduce((a, b) => a + b, 0) / (assessments[state.currentAssessment].questions.length * 3)) * 100) >= 60) {
        goToPage('resources');
    }
}

// ========== Utility Functions ==========
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========== Accessibility ==========
document.addEventListener('keydown', function(event) {
    // Close modal on Escape
    if (event.key === 'Escape') {
        const modal = document.getElementById('assessmentModal');
        if (modal && modal.classList.contains('active')) {
            closeAssessment();
        }
    }

    // Navigate pages with arrow keys (optional enhancement)
    // Can be extended based on requirements
});

// ========== Enhanced Animation System ==========
/**
 * Animate element entrance with stagger effect
 */
function animateElementsIn(elements, delay = 0.1) {
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transitionDelay = `${delay * index}ms`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 50);
    });
}

/**
 * Add button click ripple effect
 */
function addRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

/**
 * Animate counter numbers
 */
function animateCounter(element, target, duration = 1000) {
    const start = parseInt(element.textContent) || 0;
    const increment = (target - start) / (duration / 16);
    let current = start;
    
    const counter = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/**
 * Pulse animation trigger
 */
function addPulseAnimation(element) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'successPulse 0.6s ease-out';
    }, 10);
}

/**
 * Shake animation (for errors)
 */
function shakeElement(element) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'shake 0.5s ease-in-out';
    }, 10);
    
    setTimeout(() => {
        element.style.animation = 'none';
    }, 500);
}

/**
 * Fade and slide animation
 */
function fadeAndSlide(element, direction = 'up', duration = 0.4) {
    const translateValue = direction === 'up' ? '-20px' : '20px';
    element.style.opacity = '0';
    element.style.transform = `translateY(${translateValue})`;
    
    setTimeout(() => {
        element.style.transition = `all ${duration}s ease-out`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 10);
}

/**
 * Scale animation on hover
 */
function setupScaleAnimation(element) {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.05)';
    });
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1)';
    });
}

/**
 * Setup glow animation on focus
 */
function setupGlowAnimation(inputElement) {
    inputElement.addEventListener('focus', () => {
        inputElement.style.boxShadow = `0 0 15px rgba(52, 211, 153, 0.5)`;
    });
    inputElement.addEventListener('blur', () => {
        inputElement.style.boxShadow = 'none';
    });
}

/**
 * Animate progress bar
 */
function updateProgressBar(percentage) {
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.setProperty('--progress-value', percentage + '%');
        progressFill.style.width = percentage + '%';
    }
}

/**
 * Stagger animation for list items
 */
function staggerListItems(listItems) {
    listItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-10px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

/**
 * Scroll reveal animation trigger
 */
function setupScrollReveal() {
    if (!('IntersectionObserver' in window)) return;
    
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => observer.observe(element));
}

/**
 * Add success animation and feedback
 */
function showSuccessAnimation(element, message = '✓ Success!', duration = 2000) {
    const originalContent = element.innerHTML;
    
    element.innerHTML = message;
    element.style.opacity = '1';
    addPulseAnimation(element);
    
    setTimeout(() => {
        element.style.opacity = '0.7';
        element.style.transition = 'opacity 0.3s ease-out';
    }, duration - 300);
    
    setTimeout(() => {
        element.innerHTML = originalContent;
        element.style.opacity = '1';
    }, duration);
}

/**
 * Typewriter effect for text
 */
function typewriterEffect(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    const type = () => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    };
    
    type();
}

// ========== Service Worker Registration (for PWA) ==========
if ('serviceWorker' in navigator) {
    // Can be implemented for offline support
}

// ========== Local Storage Persistence ==========
window.addEventListener('beforeunload', function() {
    // Save state to local storage if needed
    localStorage.setItem('conversations', JSON.stringify(state.conversations));
    localStorage.setItem('moodData', JSON.stringify(state.moodData));
});

// Load saved data on startup
window.addEventListener('load', function() {
    const savedConversations = localStorage.getItem('conversations');
    const savedMoodData = localStorage.getItem('moodData');

    if (savedConversations) {
        state.conversations = JSON.parse(savedConversations);
    }
    if (savedMoodData) {
        state.moodData = JSON.parse(savedMoodData);
    }
});

// ========== Responsive Sidebar ==========
window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
        const sidebar = document.querySelector('.chat-sidebar');
        if (sidebar) {
            sidebar.style.display = 'flex';
            state.sidebarOpen = true;
        }
    }
});

console.log('ManoShaanti Platform Initialized');
