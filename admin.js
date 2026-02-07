/* Valentine's Week Admin Panel - JavaScript with Firebase */

// ============================================
// Default Data (fallback values)
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

const DEFAULT_MEMORIES = [
    { icon: "💫", title: "The Day We Met", description: "When our eyes first met, I knew my life would never be the same..." },
    { icon: "💝", title: "Our First Date", description: "Butterflies, nervous laughter, and the beginning of forever..." },
    { icon: "💕", title: "When I Knew", description: "That moment when I realized you're the one I want to spend my life with..." }
];

const DEFAULT_QUOTES = [
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

// ============================================
// State Management
// ============================================
let currentConfig = {};
let currentDays = [];
let currentMemories = [];
let currentQuotes = [];
let currentGallery = [];
let currentDayIndex = 0;
let isLoading = true;

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    checkFirebaseConfig();
    initEventListeners();
    loadAllDataFromFirebase();
});

function checkFirebaseConfig() {
    if (!isFirebaseConfigured()) {
        showToast('⚠️ Firebase not configured! Please update firebase-config.js', 'error');
        console.error('Firebase not configured. Please update firebase-config.js with your Firebase project config.');
    }
}

// ============================================
// Firebase Data Loading
// ============================================
async function loadAllDataFromFirebase() {
    showToast('Loading data...', 'info');
    
    if (!isFirebaseConfigured()) {
        // Fall back to defaults if Firebase not configured
        currentConfig = { ...DEFAULT_CONFIG };
        currentDays = [...DEFAULT_VALENTINE_DAYS];
        currentMemories = [...DEFAULT_MEMORIES];
        currentQuotes = [...DEFAULT_QUOTES];
        isLoading = false;
        renderAllSections();
        return;
    }

    try {
        // Load all data from Firebase
        const [configSnap, daysSnap, memoriesSnap, quotesSnap, gallerySnap] = await Promise.all([
            database.ref(DB_PATHS.config).once('value'),
            database.ref(DB_PATHS.days).once('value'),
            database.ref(DB_PATHS.memories).once('value'),
            database.ref(DB_PATHS.quotes).once('value'),
            database.ref(DB_PATHS.gallery).once('value')
        ]);

        currentConfig = configSnap.val() || { ...DEFAULT_CONFIG };
        currentDays = daysSnap.val() || [...DEFAULT_VALENTINE_DAYS];
        currentMemories = memoriesSnap.val() || [...DEFAULT_MEMORIES];
        currentQuotes = quotesSnap.val() || [...DEFAULT_QUOTES];
        currentGallery = gallerySnap.val() || [];

        isLoading = false;
        renderAllSections();
        showToast('Data loaded successfully! 💕', 'success');
    } catch (error) {
        console.error('Error loading from Firebase:', error);
        showToast('Error loading data. Using defaults.', 'error');
        
        // Fall back to defaults
        currentConfig = { ...DEFAULT_CONFIG };
        currentDays = [...DEFAULT_VALENTINE_DAYS];
        currentMemories = [...DEFAULT_MEMORIES];
        currentQuotes = [...DEFAULT_QUOTES];
        isLoading = false;
        renderAllSections();
    }
}

// ============================================
// Event Listeners
// ============================================
function initEventListeners() {
    // Sidebar navigation
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        btn.addEventListener('click', () => switchSection(btn.dataset.section));
    });

    // Security section
    document.getElementById('add-question-btn').addEventListener('click', addQuestion);
    document.getElementById('save-security-btn').addEventListener('click', saveSecuritySettings);

    // Days section
    document.querySelectorAll('.day-tab').forEach(tab => {
        tab.addEventListener('click', () => switchDay(parseInt(tab.dataset.day)));
    });
    document.getElementById('save-days-btn').addEventListener('click', saveDayContent);

    // Memories section
    document.getElementById('add-memory-btn').addEventListener('click', addMemory);
    document.getElementById('save-memories-btn').addEventListener('click', saveMemories);

    // Quotes section
    document.getElementById('add-quote-btn').addEventListener('click', addQuote);
    document.getElementById('save-quotes-btn').addEventListener('click', saveQuotes);

    // Gallery section
    document.getElementById('add-gallery-btn').addEventListener('click', addGalleryItem);
    document.getElementById('save-gallery-btn').addEventListener('click', saveGallery);
    document.getElementById('gallery-file-input').addEventListener('change', handleGalleryFileUpload);

    // Export/Import section
    document.getElementById('export-btn').addEventListener('click', exportConfig);
    document.getElementById('import-file').addEventListener('change', importConfig);
    document.getElementById('reset-btn').addEventListener('click', resetToDefaults);
}

// ============================================
// Section Navigation
// ============================================
function switchSection(section) {
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === section);
    });

    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });
    document.getElementById(`${section}-section`).classList.add('active');
}

// ============================================
// Render Functions
// ============================================
function renderAllSections() {
    renderSecuritySection();
    renderDayEditor();
    renderMemories();
    renderQuotes();
    renderGallery();
}

function renderSecuritySection() {
    document.getElementById('password').value = currentConfig.password || '';

    const container = document.getElementById('questions-container');
    container.innerHTML = currentConfig.questions.map((q, i) => `
        <div class="question-item" data-index="${i}">
            <div class="question-header">
                <span class="question-number">Question ${i + 1}</span>
                <button class="remove-btn" onclick="removeQuestion(${i})">🗑️ Remove</button>
            </div>
            <div class="form-group">
                <label>Question</label>
                <input type="text" class="form-input question-text" value="${escapeHtml(q.question)}" placeholder="Enter question">
            </div>
            <div class="form-group">
                <label>Answer (accepts partial match, case-insensitive)</label>
                <input type="text" class="form-input question-answer" value="${escapeHtml(q.answer)}" placeholder="Enter answer">
            </div>
            <div class="form-group">
                <label>Hint (shown when wrong answer)</label>
                <input type="text" class="form-input question-hint" value="${escapeHtml(q.hint)}" placeholder="Enter hint">
            </div>
        </div>
    `).join('');
}

function renderDayEditor() {
    const day = currentDays[currentDayIndex];
    const editor = document.getElementById('day-editor');
    
    editor.innerHTML = `
        <h3>${day.icon} ${day.name} - February ${day.date}</h3>
        <div class="form-group">
            <label>Greeting Title</label>
            <input type="text" class="form-input" id="day-greeting" value="${escapeHtml(day.greeting)}" placeholder="e.g., Happy Rose Day!">
        </div>
        <div class="form-group">
            <label>Subtitle</label>
            <input type="text" class="form-input" id="day-subtitle" value="${escapeHtml(day.subtitle)}" placeholder="A romantic subtitle">
        </div>
        <div class="form-group">
            <label>Message</label>
            <textarea class="form-textarea" id="day-message" placeholder="Write your heartfelt message...">${escapeHtml(day.message)}</textarea>
        </div>
    `;

    document.querySelectorAll('.day-tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === currentDayIndex);
    });
}

function renderMemories() {
    const container = document.getElementById('memories-container');
    container.innerHTML = currentMemories.map((m, i) => `
        <div class="memory-item" data-index="${i}">
            <div class="memory-header">
                <span class="memory-number">Memory ${i + 1}</span>
                <button class="remove-btn" onclick="removeMemory(${i})">🗑️ Remove</button>
            </div>
            <div class="form-group">
                <label>Icon (emoji)</label>
                <input type="text" class="form-input memory-icon" value="${m.icon}" placeholder="💫">
            </div>
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-input memory-title" value="${escapeHtml(m.title)}" placeholder="Memory title">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="form-textarea memory-desc" placeholder="Describe this memory...">${escapeHtml(m.description)}</textarea>
            </div>
        </div>
    `).join('');
}

function renderQuotes() {
    const container = document.getElementById('quotes-container');
    container.innerHTML = currentQuotes.map((q, i) => `
        <div class="quote-item" data-index="${i}">
            <div class="quote-header">
                <span class="quote-number">Quote ${i + 1}</span>
                <button class="remove-btn" onclick="removeQuote(${i})">🗑️ Remove</button>
            </div>
            <div class="form-group">
                <label>Quote Text</label>
                <textarea class="form-textarea quote-text" placeholder="Enter the quote...">${escapeHtml(q.text)}</textarea>
            </div>
            <div class="form-group">
                <label>Author</label>
                <input type="text" class="form-input quote-author" value="${escapeHtml(q.author)}" placeholder="Author name">
            </div>
        </div>
    `).join('');
}

function renderGallery() {
    const container = document.getElementById('gallery-container');
    
    if (currentGallery.length === 0) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center; padding: 20px;">No images yet. Upload some images or add URLs!</p>';
        return;
    }
    
    container.innerHTML = currentGallery.map((imgSrc, i) => {
        const isBase64 = imgSrc.startsWith('data:image');
        const displayType = isBase64 ? '📁 Uploaded' : '🔗 URL';
        
        return `
        <div class="gallery-item" data-index="${i}">
            <div class="gallery-preview">
                <img src="${imgSrc}" alt="Image ${i + 1}" onerror="this.style.display='none'">
            </div>
            <div class="gallery-info">
                <span class="gallery-number">${displayType} - Image ${i + 1}</span>
                <button class="remove-btn" onclick="removeGalleryItem(${i})">🗑️ Remove</button>
            </div>
        </div>
    `;
    }).join('');
}

// ============================================
// Day Editor Functions
// ============================================
function switchDay(index) {
    saveDayToState();
    currentDayIndex = index;
    renderDayEditor();
}

function saveDayToState() {
    const greeting = document.getElementById('day-greeting');
    const subtitle = document.getElementById('day-subtitle');
    const message = document.getElementById('day-message');
    
    if (greeting && subtitle && message) {
        currentDays[currentDayIndex].greeting = greeting.value;
        currentDays[currentDayIndex].subtitle = subtitle.value;
        currentDays[currentDayIndex].message = message.value;
    }
}

// ============================================
// Add/Remove Functions
// ============================================
function addQuestion() {
    currentConfig.questions.push({
        question: "",
        answer: "",
        hint: ""
    });
    renderSecuritySection();
    showToast('Question added!', 'success');
}

function removeQuestion(index) {
    if (currentConfig.questions.length <= 1) {
        showToast('You need at least one question!', 'error');
        return;
    }
    currentConfig.questions.splice(index, 1);
    renderSecuritySection();
    showToast('Question removed!', 'info');
}

function addMemory() {
    currentMemories.push({
        icon: "💝",
        title: "",
        description: ""
    });
    renderMemories();
    showToast('Memory added!', 'success');
}

function removeMemory(index) {
    if (currentMemories.length <= 1) {
        showToast('You need at least one memory!', 'error');
        return;
    }
    currentMemories.splice(index, 1);
    renderMemories();
    showToast('Memory removed!', 'info');
}

function addQuote() {
    currentQuotes.push({
        text: "",
        author: ""
    });
    renderQuotes();
    showToast('Quote added!', 'success');
}

function removeQuote(index) {
    if (currentQuotes.length <= 1) {
        showToast('You need at least one quote!', 'error');
        return;
    }
    currentQuotes.splice(index, 1);
    renderQuotes();
    showToast('Quote removed!', 'info');
}

function addGalleryItem() {
    currentGallery.push("");
    renderGallery();
    showToast('Image field added!', 'success');
}

function removeGalleryItem(index) {
    currentGallery.splice(index, 1);
    renderGallery();
    showToast('Image removed!', 'info');
}

// Handle file upload for gallery images
async function handleGalleryFileUpload(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    showToast(`Processing ${files.length} image(s)...`, 'info');

    for (const file of files) {
        if (!file.type.startsWith('image/')) {
            showToast(`${file.name} is not an image file`, 'error');
            continue;
        }

        // Check file size (max 2MB for base64 storage)
        if (file.size > 2 * 1024 * 1024) {
            showToast(`${file.name} is too large (max 2MB)`, 'error');
            continue;
        }

        try {
            const base64 = await convertToBase64(file);
            currentGallery.push(base64);
        } catch (error) {
            console.error('Error converting image:', error);
            showToast(`Error processing ${file.name}`, 'error');
        }
    }

    renderGallery();
    showToast(`${files.length} image(s) added! Don't forget to save.`, 'success');
    
    // Reset the file input
    event.target.value = '';
}

// Convert file to base64
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Make remove functions globally accessible
window.removeQuestion = removeQuestion;
window.removeMemory = removeMemory;
window.removeQuote = removeQuote;
window.removeGalleryItem = removeGalleryItem;

// ============================================
// Save Functions (Firebase)
// ============================================
async function saveSecuritySettings() {
    // Get password
    currentConfig.password = document.getElementById('password').value.trim();

    // Get questions
    const questionItems = document.querySelectorAll('.question-item');
    currentConfig.questions = Array.from(questionItems).map(item => ({
        question: item.querySelector('.question-text').value.trim(),
        answer: item.querySelector('.question-answer').value.trim(),
        hint: item.querySelector('.question-hint').value.trim()
    }));

    if (!isFirebaseConfigured()) {
        showToast('⚠️ Firebase not configured! Changes not saved.', 'error');
        return;
    }

    try {
        await database.ref(DB_PATHS.config).set(currentConfig);
        showToast('Security settings saved to cloud! 🔐', 'success');
    } catch (error) {
        console.error('Error saving to Firebase:', error);
        showToast('Error saving. Check console for details.', 'error');
    }
}

async function saveDayContent() {
    saveDayToState();

    if (!isFirebaseConfigured()) {
        showToast('⚠️ Firebase not configured! Changes not saved.', 'error');
        return;
    }

    try {
        await database.ref(DB_PATHS.days).set(currentDays);
        showToast('Day content saved to cloud! 💕', 'success');
    } catch (error) {
        console.error('Error saving to Firebase:', error);
        showToast('Error saving. Check console for details.', 'error');
    }
}

async function saveMemories() {
    const memoryItems = document.querySelectorAll('.memory-item');
    currentMemories = Array.from(memoryItems).map(item => ({
        icon: item.querySelector('.memory-icon').value.trim() || '💝',
        title: item.querySelector('.memory-title').value.trim(),
        description: item.querySelector('.memory-desc').value.trim()
    }));

    if (!isFirebaseConfigured()) {
        showToast('⚠️ Firebase not configured! Changes not saved.', 'error');
        return;
    }

    try {
        await database.ref(DB_PATHS.memories).set(currentMemories);
        showToast('Memories saved to cloud! 📸', 'success');
    } catch (error) {
        console.error('Error saving to Firebase:', error);
        showToast('Error saving. Check console for details.', 'error');
    }
}

async function saveQuotes() {
    const quoteItems = document.querySelectorAll('.quote-item');
    currentQuotes = Array.from(quoteItems).map(item => ({
        text: item.querySelector('.quote-text').value.trim(),
        author: item.querySelector('.quote-author').value.trim()
    }));

    if (!isFirebaseConfigured()) {
        showToast('⚠️ Firebase not configured! Changes not saved.', 'error');
        return;
    }

    try {
        await database.ref(DB_PATHS.quotes).set(currentQuotes);
        showToast('Quotes saved to cloud! 💌', 'success');
    } catch (error) {
        console.error('Error saving to Firebase:', error);
        showToast('Error saving. Check console for details.', 'error');
    }
}

async function saveGallery() {
    const galleryItems = document.querySelectorAll('.gallery-url');
    currentGallery = Array.from(galleryItems).map(item => item.value.trim()).filter(url => url !== "");

    if (!isFirebaseConfigured()) {
        showToast('⚠️ Firebase not configured! Changes not saved.', 'error');
        return;
    }

    try {
        await database.ref(DB_PATHS.gallery).set(currentGallery);
        showToast('Gallery saved to cloud! 🖼️', 'success');
    } catch (error) {
        console.error('Error saving to Firebase:', error);
        showToast('Error saving. Check console for details.', 'error');
    }
}

// ============================================
// Export/Import Functions
// ============================================
function exportConfig() {
    const exportData = {
        config: currentConfig,
        days: currentDays,
        memories: currentMemories,
        quotes: currentQuotes,
        gallery: currentGallery,
        exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `valentine-config-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Configuration exported! 📥', 'success');
}

async function importConfig(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const importData = JSON.parse(e.target.result);
            
            if (importData.config) currentConfig = importData.config;
            if (importData.days) currentDays = importData.days;
            if (importData.memories) currentMemories = importData.memories;
            if (importData.quotes) currentQuotes = importData.quotes;
            if (importData.gallery) currentGallery = importData.gallery;

            // Save to Firebase
            if (isFirebaseConfigured()) {
                await Promise.all([
                    database.ref(DB_PATHS.config).set(currentConfig),
                    database.ref(DB_PATHS.days).set(currentDays),
                    database.ref(DB_PATHS.memories).set(currentMemories),
                    database.ref(DB_PATHS.quotes).set(currentQuotes),
                    database.ref(DB_PATHS.gallery).set(currentGallery)
                ]);
            }

            renderAllSections();
            showToast('Configuration imported and saved to cloud! 📤', 'success');
        } catch (error) {
            showToast('Invalid JSON file!', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

async function resetToDefaults() {
    if (!confirm('⚠️ Are you sure you want to reset ALL settings to defaults? This cannot be undone!')) {
        return;
    }

    currentConfig = { ...DEFAULT_CONFIG };
    currentDays = [...DEFAULT_VALENTINE_DAYS];
    currentMemories = [...DEFAULT_MEMORIES];
    currentQuotes = [...DEFAULT_QUOTES];
    currentGallery = [];

    // Save defaults to Firebase
    if (isFirebaseConfigured()) {
        try {
            await Promise.all([
                database.ref(DB_PATHS.config).set(currentConfig),
                database.ref(DB_PATHS.days).set(currentDays),
                database.ref(DB_PATHS.memories).set(currentMemories),
                database.ref(DB_PATHS.quotes).set(currentQuotes),
                database.ref(DB_PATHS.gallery).set(currentGallery)
            ]);
            showToast('Reset to defaults and saved to cloud!', 'info');
        } catch (error) {
            console.error('Error resetting:', error);
            showToast('Error resetting. Check console.', 'error');
        }
    }

    renderAllSections();
}

// ============================================
// Utility Functions
// ============================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
