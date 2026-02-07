/* Valentine's Week - JavaScript with Firebase */

// ============================================
// Default Configuration Values
// ============================================
const DEFAULT_CONFIG = {
    password: "iloveyou",
    questions: [
        {
            question: "What's our special song?",
            answer: "perfect",
            hint: "Think Ed Sheeran..."
        },
        {
            question: "Where did we first meet?",
            answer: "coffee",
            hint: "A cozy place..."
        },
        {
            question: "What's my favorite thing about you?",
            answer: "smile",
            hint: "It lights up my world..."
        }
    ]
};

const DEFAULT_VALENTINE_DAYS = [
    { date: 7, name: "Rose Day", icon: "🌹", greeting: "Happy Rose Day!", subtitle: "Every rose I give you carries a piece of my heart", message: "Like this beautiful rose, my love for you blooms more with each passing day. You are the garden where my heart finds peace, the sunshine that makes my world bright, and the reason behind my every smile. Each petal represents a promise I make to you - to love, cherish, and adore you forever." },
    { date: 8, name: "Propose Day", icon: "💍", greeting: "Happy Propose Day!", subtitle: "Will you be mine, today and forever?", message: "Today I propose not just my love, but my entire being to you. I promise to be your partner in every adventure, your comfort in every storm, and your biggest cheerleader in every triumph. My heart chose you, and it keeps choosing you every single day. Will you continue this beautiful journey with me?" },
    { date: 9, name: "Chocolate Day", icon: "🍫", greeting: "Happy Chocolate Day!", subtitle: "You're sweeter than the sweetest chocolate", message: "Just like chocolate melts in warmth, my heart melts whenever I see you. You add sweetness to every moment of my life. If I could, I would wrap you in the finest chocolate and keep you close forever. But since I can't, I'll just love you with all my heart instead!" },
    { date: 10, name: "Teddy Day", icon: "🧸", greeting: "Happy Teddy Day!", subtitle: "Here's a warm hug wrapped in fur", message: "This teddy represents all the hugs I want to give you when I can't be there. Whenever you feel lonely, hold it close and remember - it carries my love, my warmth, and my promise to always be there for you. You are my favorite person to cuddle with!" },
    { date: 11, name: "Promise Day", icon: "🤝", greeting: "Happy Promise Day!", subtitle: "My promises to you are written in my heart", message: "Today I promise to love you unconditionally, to support you endlessly, and to cherish you eternally. I promise to be your shoulder to cry on, your partner to laugh with, and your best friend to share everything with. These aren't just words - they're the foundation of our forever." },
    { date: 12, name: "Hug Day", icon: "🤗", greeting: "Happy Hug Day!", subtitle: "In my arms is where you belong", message: "A hug from you is my favorite place in the world. It's where all my worries disappear and where I feel most at home. Today, I want to wrap you in my arms and never let go. Every hug is a silent 'I love you' that words can never fully express." },
    { date: 13, name: "Kiss Day", icon: "💋", greeting: "Happy Kiss Day!", subtitle: "Each kiss tells you how much I adore you", message: "Every kiss we share writes a new chapter in our love story. From butterfly kisses on your forehead to the ones that take my breath away - each one is a treasure. Today, let me kiss away all your doubts and fill your heart with the certainty of my love." },
    { date: 14, name: "Valentine's Day", icon: "❤️", greeting: "Happy Valentine's Day!", subtitle: "You are my today, my tomorrow, and my forever", message: "Today is the day when the whole world celebrates love, but for me, every day with you is Valentine's Day. You are not just my Valentine - you are my soulmate, my best friend, and my everything. Thank you for making my life the most beautiful love story ever written. I love you more than words could ever say!" }
];

const DEFAULT_LOVE_QUOTES = [
    { text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.", author: "Maya Angelou" },
    { text: "I love you not only for what you are, but for what I am when I am with you.", author: "Roy Croft" },
    { text: "You are my sun, my moon, and all my stars.", author: "E.E. Cummings" },
    { text: "I have found the one whom my soul loves.", author: "Song of Solomon" },
    { text: "Whatever our souls are made of, his and mine are the same.", author: "Emily Brontë" },
    { text: "I fell in love the way you fall asleep: slowly, and then all at once.", author: "John Green" },
    { text: "You are the finest, loveliest, tenderest, and most beautiful person I have ever known.", author: "F. Scott Fitzgerald" },
    { text: "I would rather spend one lifetime with you, than face all the ages of this world alone.", author: "J.R.R. Tolkien" },
    { text: "My heart is, and always will be, yours.", author: "Jane Austen" },
    { text: "I love you without knowing how, or when, or from where.", author: "Pablo Neruda" }
];

const DEFAULT_MEMORIES = [
    { icon: "💫", title: "The Day We Met", description: "When our eyes first met, I knew my life would never be the same..." },
    { icon: "💝", title: "Our First Date", description: "Butterflies, nervous laughter, and the beginning of forever..." },
    { icon: "💕", title: "When I Knew", description: "That moment when I realized you're the one I want to spend my life with..." }
];

// ============================================
// Global State (loaded from Firebase)
// ============================================
let CONFIG = { ...DEFAULT_CONFIG };
let VALENTINE_DAYS = [...DEFAULT_VALENTINE_DAYS];
let LOVE_QUOTES = [...DEFAULT_LOVE_QUOTES];
let MEMORIES = [...DEFAULT_MEMORIES];

// Default romantic 9:16 images for carousel
const DEFAULT_GALLERY = [
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=540&h=960&fit=crop",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=540&h=960&fit=crop",
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=540&h=960&fit=crop",
    "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=540&h=960&fit=crop",
    "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=540&h=960&fit=crop"
];
let currentGallery = [...DEFAULT_GALLERY];

// ============================================
// Load Configuration from Firebase
// ============================================
async function loadAllDataFromFirebase() {
    if (!isFirebaseConfigured()) {
        console.log('Firebase not configured, using defaults');
        return;
    }

    try {
        const [configSnap, daysSnap, memoriesSnap, quotesSnap, gallerySnap] = await Promise.all([
            database.ref(DB_PATHS.config).once('value'),
            database.ref(DB_PATHS.days).once('value'),
            database.ref(DB_PATHS.memories).once('value'),
            database.ref(DB_PATHS.quotes).once('value'),
            database.ref(DB_PATHS.gallery).once('value')
        ]);

        if (configSnap.val()) CONFIG = configSnap.val();
        if (daysSnap.val()) VALENTINE_DAYS = daysSnap.val();
        if (memoriesSnap.val()) MEMORIES = memoriesSnap.val();
        if (quotesSnap.val()) LOVE_QUOTES = quotesSnap.val();
        if (gallerySnap.val()) currentGallery = gallerySnap.val();

        console.log('Data loaded from Firebase');
    } catch (error) {
        console.error('Error loading from Firebase:', error);
    }
}

// ============================================
// DOM Elements
// ============================================
const passwordScreen = document.getElementById('passwordScreen');
const questionsScreen = document.getElementById('questionsScreen');
const mainScreen = document.getElementById('mainScreen');
const passwordInput = document.getElementById('passwordInput');
const passwordBtn = document.getElementById('passwordBtn');
const passwordError = document.getElementById('passwordError');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const questionError = document.getElementById('questionError');
const heartsContainer = document.getElementById('heartsContainer');
const sparkleContainer = document.getElementById('sparkleContainer');

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
    // Load data from Firebase first
    await loadAllDataFromFirebase();
    
    // Then initialize the UI
    renderDynamicQuestions();
    initBackgroundEffects();
    initEventListeners();
    setCurrentDate();
});

// ============================================
// Dynamic Content Rendering
// ============================================
function renderDynamicQuestions() {
    const container = document.querySelector('.question-container');
    const progressContainer = document.querySelector('.question-progress');
    
    if (!container || !progressContainer) return;
    
    // Render questions
    container.innerHTML = CONFIG.questions.map((q, i) => `
        <div class="question-item ${i === 0 ? 'active' : ''}" id="q${i + 1}">
            <label class="question-label">💫 ${q.question}</label>
            <input type="text" class="love-input question-input" id="answer${i + 1}" placeholder="Type your answer...">
        </div>
    `).join('');
    
    // Render progress dots
    progressContainer.innerHTML = CONFIG.questions.map((_, i) => `
        <span class="progress-dot ${i === 0 ? 'active' : ''}" data-q="${i + 1}"></span>
    `).join('');
}

function renderMemoryLane() {
    const timeline = document.querySelector('.memory-timeline');
    if (!timeline) return;
    
    timeline.innerHTML = MEMORIES.map(m => `
        <div class="memory-item">
            <div class="memory-dot"></div>
            <div class="memory-card">
                <span class="memory-icon">${m.icon}</span>
                <h3>${m.title}</h3>
                <p>${m.description}</p>
            </div>
        </div>
    `).join('');
}

// ============================================
// Background Effects
// ============================================
function initBackgroundEffects() {
    createFloatingHearts();
    createSparkles();
}

function createFloatingHearts() {
    const hearts = ['❤️', '💗', '💕', '💖', '💝', '💘', '💓', '💞'];
    setInterval(() => {
        const heart = document.createElement('span');
        heart.className = 'floating-bg-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = 10 + Math.random() * 10 + 's';
        heart.style.fontSize = 1 + Math.random() * 2 + 'rem';
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 20000);
    }, 800);
}

function createSparkles() {
    setInterval(() => {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkleContainer.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 3000);
    }, 300);
}

// ============================================
// Event Listeners
// ============================================
function initEventListeners() {
    // Password Screen
    passwordBtn.addEventListener('click', validatePassword);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') validatePassword();
    });

    // Questions Screen
    nextQuestionBtn.addEventListener('click', handleQuestionSubmit);
    document.querySelectorAll('.question-input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleQuestionSubmit();
        });
    });

    // Quote Refresh
    document.getElementById('refreshQuote')?.addEventListener('click', refreshQuote);

    // Love Meter
    document.getElementById('measureLove')?.addEventListener('click', measureLove);
}

// ============================================
// Password Validation
// ============================================
function validatePassword() {
    const enteredPassword = passwordInput.value.trim().toLowerCase();
    
    if (enteredPassword === CONFIG.password.toLowerCase()) {
        showSuccess(passwordScreen, () => {
            passwordScreen.classList.remove('active');
            questionsScreen.classList.add('active');
        });
    } else {
        showError(passwordError, "💔 That's not the magic word, my love!");
        passwordInput.classList.add('shake');
        setTimeout(() => passwordInput.classList.remove('shake'), 500);
    }
}

// ============================================
// Questions Handling
// ============================================
let currentQuestion = 0;

function handleQuestionSubmit() {
    const currentInput = document.getElementById(`answer${currentQuestion + 1}`);
    const answer = currentInput.value.trim().toLowerCase();
    const correctAnswer = CONFIG.questions[currentQuestion].answer.toLowerCase();

    if (answer.includes(correctAnswer) || correctAnswer.includes(answer)) {
        document.querySelectorAll('.progress-dot')[currentQuestion].classList.add('completed');
        
        if (currentQuestion < CONFIG.questions.length - 1) {
            currentQuestion++;
            showNextQuestion();
        } else {
            showSuccess(questionsScreen, () => {
                questionsScreen.classList.remove('active');
                showMainContent();
            });
        }
    } else {
        showError(questionError, `💔 Hmm... that's not quite right. Hint: ${CONFIG.questions[currentQuestion].hint}`);
        currentInput.classList.add('shake');
        setTimeout(() => currentInput.classList.remove('shake'), 500);
    }
}

function showNextQuestion() {
    const questions = document.querySelectorAll('.question-item');
    const dots = document.querySelectorAll('.progress-dot');
    
    questions.forEach((q, i) => {
        q.classList.toggle('active', i === currentQuestion);
    });
    
    dots.forEach((d, i) => {
        d.classList.toggle('active', i === currentQuestion);
    });
    
    nextQuestionBtn.innerHTML = currentQuestion === CONFIG.questions.length - 1 
        ? '<span>Enter Our World</span><span>💕</span>' 
        : '<span>Next Question</span><span>→</span>';
    
    questionError.classList.remove('show');
}

// ============================================
// Main Content
// ============================================
function showMainContent() {
    mainScreen.classList.add('active');
    setTimeout(() => {
        mainScreen.style.opacity = '1';
        initMainContent();
    }, 100);
}

function initMainContent() {
    updateHeroForCurrentDay();
    renderDaysGrid();
    renderMemoryLane();
    renderHeroCarousel();
    refreshQuote();
    initLoveMeter();
}

function renderHeroCarousel() {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel || currentGallery.length === 0) return;

    // We double the images to create a seamless loop
    const images = [...currentGallery, ...currentGallery];
    
    carousel.innerHTML = images.map(url => `
        <div class="carousel-item" style="background-image: url('${url}')"></div>
    `).join('');

    // Adjust animation duration based on image count
    const duration = currentGallery.length * 10; // 10s per image
    carousel.style.animationDuration = `${duration}s`;
}

function setCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-IN', options);
    const dateElement = document.getElementById('currentDate');
    if (dateElement) dateElement.textContent = dateStr;
}

function getCurrentValentineDay() {
    // Get current date in IST
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + istOffset);
    const day = istTime.getDate();
    const month = istTime.getMonth() + 1;
    
    if (month !== 2) return null;
    return VALENTINE_DAYS.find(d => d.date === day) || null;
}

function updateHeroForCurrentDay() {
    const today = getCurrentValentineDay();
    if (!today) {
        // Default to Rose Day or closest day
        const now = new Date();
        const day = now.getDate();
        const closestDay = VALENTINE_DAYS.reduce((prev, curr) => 
            Math.abs(curr.date - day) < Math.abs(prev.date - day) ? curr : prev
        );
        setHeroContent(closestDay);
    } else {
        setHeroContent(today);
    }
}

function setHeroContent(dayData) {
    document.getElementById('dayName').textContent = dayData.name;
    document.getElementById('heroTitle').textContent = dayData.greeting;
    document.getElementById('heroSubtitle').textContent = dayData.subtitle;
    document.querySelector('.badge-icon').textContent = dayData.icon;
    document.getElementById('messageIcon').textContent = dayData.icon;
    document.getElementById('messageContent').innerHTML = `<p>${dayData.message}</p>`;
}

function renderDaysGrid() {
    const grid = document.getElementById('daysGrid');
    
    // Get current date in IST
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + istOffset);
    const currentDay = istTime.getDate();
    const currentMonth = istTime.getMonth() + 1;
    
    grid.innerHTML = VALENTINE_DAYS.map(day => {
        let statusClass = '';
        let isLocked = false;
        
        // Month check: if it's before February, everything is locked
        // If it's February, check the date
        // If it's after February, everything is unlocked
        if (currentMonth < 2) {
            isLocked = true;
        } else if (currentMonth === 2) {
            if (day.date === currentDay) {
                statusClass = 'active';
            } else if (day.date < currentDay) {
                statusClass = 'past';
            } else {
                statusClass = 'locked';
                isLocked = true;
            }
        }
        
        return `
            <div class="day-card ${statusClass} ${isLocked ? 'locked' : ''}" data-date="${day.date}" onclick="${isLocked ? '' : `showDayDetails(${day.date})`}">
                <span class="day-icon">${isLocked ? '🔒' : day.icon}</span>
                <span class="day-name">${day.name}</span>
                <span class="day-date">February ${day.date}</span>
                ${isLocked ? '<span class="lock-tag">Locked</span>' : ''}
            </div>
        `;
    }).join('');
}

// Make function globally accessible
window.showDayDetails = function(date) {
    // Extra safety check for locked days
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + istOffset);
    const currentDay = istTime.getDate();
    const currentMonth = istTime.getMonth() + 1;
    
    if (currentMonth === 2 && date > currentDay) return;
    if (currentMonth < 2) return;

    const day = VALENTINE_DAYS.find(d => d.date === date);
    if (day) {
        setHeroContent(day);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// ============================================
// Love Quotes
// ============================================
function refreshQuote() {
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.querySelector('.quote-author');
    if (!quoteText || !quoteAuthor) return;
    
    const randomQuote = LOVE_QUOTES[Math.floor(Math.random() * LOVE_QUOTES.length)];
    
    quoteText.style.opacity = '0';
    setTimeout(() => {
        quoteText.textContent = `"${randomQuote.text}"`;
        quoteAuthor.textContent = `— ${randomQuote.author}`;
        quoteText.style.opacity = '1';
    }, 300);
}

// ============================================
// Love Meter
// ============================================
function initLoveMeter() {
    const meterFill = document.getElementById('meterFill');
    if (meterFill) meterFill.style.width = '100%';
}

function measureLove() {
    const meterFill = document.getElementById('meterFill');
    const percentage = document.getElementById('lovePercentage');
    if (!meterFill || !percentage) return;
    
    meterFill.style.width = '0%';
    percentage.textContent = '0';
    
    let current = 0;
    const target = 100 + Math.floor(Math.random() * 900); // Always 100%+ (infinite love!)
    
    const interval = setInterval(() => {
        current += Math.ceil((target - current) / 10);
        if (current >= target) {
            current = target;
            clearInterval(interval);
            percentage.textContent = '∞';
            meterFill.style.width = '100%';
        } else {
            percentage.textContent = Math.min(current, 100);
            meterFill.style.width = Math.min(current, 100) + '%';
        }
    }, 50);
}

// ============================================
// Utility Functions
// ============================================
function showError(element, message) {
    element.textContent = message;
    element.classList.add('show');
    setTimeout(() => element.classList.remove('show'), 4000);
}

function showSuccess(screen, callback) {
    screen.classList.add('success-animation');
    setTimeout(() => {
        screen.classList.remove('success-animation');
        callback();
    }, 500);
}
