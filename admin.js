/* Valentine's Week Admin Panel - JavaScript with Firebase */

// ============================================
// Default Data (fallback values)
// ============================================
const DEFAULT_CONFIG = {
    password: "iloveyou",
    questions: [
        {
            question: "What's our special song?",
            options: ["Perfect", "Shape of You", "Thinking Out Loud", "Photograph"],
            correctIndex: 0,
            hint: "Think Ed Sheeran..."
        },
        {
            question: "Where did we first meet?",
            options: ["Coffee Shop", "At Work", "Through Friends", "Online"],
            correctIndex: 0,
            hint: "A cozy place..."
        },
        {
            question: "What's my favorite thing about you?",
            options: ["Your Smile", "Your Eyes", "Your Laugh", "Your Heart"],
            correctIndex: 0,
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
// ============================================
// Panel Defaults
// ============================================
const DEFAULT_TIMELINE = [
    { date: "A Beautiful Day", title: "The Day We First Met", desc: "Our eyes met across the room and time stood still. That moment changed everything forever." },
    { date: "Soon After", title: "Our First Conversation", desc: "Hours felt like minutes as we talked about everything and nothing. I knew you were special." },
    { date: "A Magical Evening", title: "The First Date", desc: "Butterflies, nervous laughter, and the beginning of our forever story." },
    { date: "A Quiet Moment", title: "When I First Said I Love You", desc: "Three words that carried the weight of a thousand emotions. And you said them back." },
    { date: "Our Anniversary", title: "365 Days Together", desc: "A full year of memories, laughter, and growing love. Here's to infinity more." },
    { date: "Forever Starts Now", title: "This Very Moment", desc: "Every second with you is my favorite. The best is always yet to come." }
];

const DEFAULT_ENVELOPES = [
    { label: "Open when you need a hug", icon: "🤗", letter: "Close your eyes, wrap your arms around yourself, and imagine it's me. Every time you feel lonely, know that my love is wrapping around you like the warmest blanket in the world. You are never alone — my heart beats for you even from miles away." },
    { label: "Open when you can't sleep", icon: "🌙", letter: "Hey my love, can't sleep? Count the reasons I love you instead of sheep: your smile, your laugh, the way you scrunch your nose, how you hold my hand... still awake? That's because the list is endless. Sweet dreams, my forever person." },
    { label: "Open when you miss me", icon: "💭", letter: "I miss you too, always. But distance is just a test to see how far love can travel — and ours crosses galaxies. Every star in the sky is a reminder that our love shines even in the darkest moments. I'll be with you soon." },
    { label: "Open when you're stressed", icon: "🫶", letter: "Take a deep breath. In... and out. Whatever is weighing on you right now is temporary, but my love for you is permanent. You've conquered harder things than this. I believe in you with my whole heart. You've got this, superstar." },
    { label: "Open when you need motivation", icon: "⭐", letter: "Remember why you started. You are stronger, braver, and more talented than you know. Every step forward is a victory. I'm cheering for you louder than anyone. Now go make the world as beautiful as your smile!" },
    { label: "Open when you want to smile", icon: "😊", letter: "Remember that time we laughed so hard we couldn't breathe? Or when we had that silly inside joke nobody else understood? This letter is your permission to be ridiculously happy right now. Smile — because someone out there loves your smile more than sunsets." }
];

const DEFAULT_BUCKET_LIST = [
    "Watch the sunrise together on a beach",
    "Cook a fancy dinner together at home",
    "Go on a surprise road trip",
    "Dance in the rain together",
    "Write love letters to each other",
    "Have a movie marathon until dawn",
    "Visit a place neither of us has been",
    "Learn something new together",
    "Build a blanket fort and have hot chocolate",
    "Plant a tree together and watch it grow",
    "Stargaze on a clear night",
    "Recreate our first date"
];

const DEFAULT_REASONS = [
    "Because your smile is my favorite sight in the entire universe.",
    "Because you understand me without me having to say a word.",
    "Because you make ordinary moments feel extraordinary.",
    "Because your laugh is the most beautiful music I've ever heard.",
    "Because you believe in me even when I don't believe in myself."
];

const DEFAULT_COUPONS = [
    { icon: "💆", title: "30-Minute Massage", desc: "A relaxing, no-strings-attached massage whenever you need it." },
    { icon: "🍳", title: "Breakfast in Bed", desc: "Wake up to your favorite meal served with a side of love." },
    { icon: "🎬", title: "Movie Night Pick", desc: "You choose the movie — no complaints, no negotiations!" },
    { icon: "🧹", title: "Chore-Free Day", desc: "A full day where I do ALL the chores. You just relax." },
    { icon: "🍕", title: "Pizza & Cuddles", desc: "Your favorite pizza + unlimited cuddles. Best combo ever." },
    { icon: "🌟", title: "Wish Granted", desc: "One reasonable wish, no questions asked. Use wisely!" },
    { icon: "🎵", title: "Serenade Session", desc: "I'll sing your favorite song (quality not guaranteed, love is)." },
    { icon: "🧊", title: "Ice Cream Date", desc: "A surprise ice cream outing to your favorite parlor." }
];


const DEFAULT_GARDEN = [
    { emoji: "🌹", name: "Rose", date: 7, msg: "Like this rose, my love for you is timeless and beautiful. You make every day brighter." },
    { emoji: "🌷", name: "Tulip", date: 8, msg: "A tulip for my proposal — you are the perfect partner I've always dreamed of." },
    { emoji: "🌻", name: "Sunflower", date: 9, msg: "You are my sunflower — you turn my darkest days into bright, golden moments." },
    { emoji: "🌸", name: "Cherry Blossom", date: 10, msg: "Delicate and stunning, just like you. Our love blossoms with every passing season." },
    { emoji: "🌺", name: "Hibiscus", date: 11, msg: "Bold and beautiful — a promise that our love will always be vibrant and alive." },
    { emoji: "💐", name: "Bouquet", date: 12, msg: "A whole bouquet because you deserve all the flowers in the world. You are my everything." },
    { emoji: "🌼", name: "Daisy", date: 13, msg: "Simple, pure, and full of joy — just like the love you give me every single day." },
    { emoji: "❤️‍🔥", name: "Eternal Flame", date: 14, msg: "Our love burns eternal. Happy Valentine's Day to my forever person." }
];

const DEFAULT_DATE_NIGHT = [
    {
        question: "What's the vibe?",
        options: [
            { icon: "🍕", title: "Pizza & Games", desc: "Cozy night in with board games and pizza" },
            { icon: "🍷", title: "Fancy Wine & Dine", desc: "Dress up and enjoy a candlelit dinner" }
        ]
    }, // Add more rounds as needed
];

const DEFAULT_LOVE_MATCH_SYMBOLS = [
    { emoji: '🌹', name: 'Rose' }, { emoji: '💍', name: 'Ring' },
    { emoji: '💌', name: 'Letter' }, { emoji: '❤️', name: 'Heart' },
    { emoji: '🥂', name: 'Cheers' }, { emoji: '🦋', name: 'Butterfly' },
    { emoji: '🌙', name: 'Moon' }, { emoji: '💎', name: 'Diamond' }
];

const DEFAULT_LOVE_MATCH_NOTES = [
    "You are my sunshine on cloudy days ☀️",
    "I love your laugh more than anything 💕",
    "You make my heart skip a beat 💓",
    "Every moment with you is magic ✨"
];

// ============================================
// State Management
// ============================================
let currentConfig = {};
let currentDays = [];
let currentMemories = [];
let currentQuotes = [];
let currentGallery = [];
let currentTimeline = [];
let currentEnvelopes = [];
let currentBucketList = [];
let currentReasons = [];
let currentCoupons = [];
    // let currentSoundtrack = []; REMOVED
let currentGarden = [];
let currentDateNight = [];
let currentLoveMatchSymbols = [];
let currentLoveMatchNotes = [];
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
        currentTimeline = [...DEFAULT_TIMELINE];
        currentEnvelopes = [...DEFAULT_ENVELOPES];
        currentBucketList = [...DEFAULT_BUCKET_LIST];
        currentReasons = [...DEFAULT_REASONS];
        currentCoupons = [...DEFAULT_COUPONS];
        // currentSoundtrack removed
        currentGarden = [...DEFAULT_GARDEN];
        currentDateNight = [...DEFAULT_DATE_NIGHT];
        currentLoveMatchSymbols = [...DEFAULT_LOVE_MATCH_SYMBOLS];
        currentLoveMatchNotes = [...DEFAULT_LOVE_MATCH_NOTES];
        isLoading = false;
        renderAllSections();
        return;
    }

    try {
        // Load all data from Firebase
        const [
            configSnap, daysSnap, memoriesSnap, quotesSnap, gallerySnap,
            timelineSnap, envelopesSnap, bucketSnap, reasonsSnap, couponsSnap,
            gardenSnap, datenightSnap, lovematchSnap
        ] = await Promise.all([
            database.ref(DB_PATHS.config).once('value'),
            database.ref(DB_PATHS.days).once('value'),
            database.ref(DB_PATHS.memories).once('value'),
            database.ref(DB_PATHS.quotes).once('value'),
            database.ref(DB_PATHS.gallery).once('value'),
            database.ref(DB_PATHS.panelTimeline).once('value'),
            database.ref(DB_PATHS.panelEnvelopes).once('value'),
            database.ref(DB_PATHS.panelBucketList).once('value'),
            database.ref(DB_PATHS.panelReasons).once('value'),
            database.ref(DB_PATHS.panelCoupons).once('value'),
            database.ref(DB_PATHS.panelGarden).once('value'),
            database.ref(DB_PATHS.panelDateNight).once('value'),
            database.ref(DB_PATHS.panelLoveMatch).once('value')
        ]);

        currentConfig = configSnap.val() || { ...DEFAULT_CONFIG };
        currentDays = daysSnap.val() || [...DEFAULT_VALENTINE_DAYS];
        currentMemories = memoriesSnap.val() || [...DEFAULT_MEMORIES];
        currentQuotes = quotesSnap.val() || [...DEFAULT_QUOTES];
        currentGallery = gallerySnap.val() || [];
        
        // Panels
        currentTimeline = timelineSnap.val() || [...DEFAULT_TIMELINE];
        currentEnvelopes = envelopesSnap.val() || [...DEFAULT_ENVELOPES];
        currentBucketList = bucketSnap.val() || [...DEFAULT_BUCKET_LIST];
        currentReasons = reasonsSnap.val() || [...DEFAULT_REASONS];
        currentCoupons = couponsSnap.val() || [...DEFAULT_COUPONS];
        // currentSoundtrack removed
        currentGarden = gardenSnap.val() || [...DEFAULT_GARDEN];
        currentDateNight = datenightSnap.val() || [...DEFAULT_DATE_NIGHT];

        const lmData = lovematchSnap.val() || {};
        currentLoveMatchSymbols = lmData.symbols || [...DEFAULT_LOVE_MATCH_SYMBOLS];
        currentLoveMatchNotes = lmData.notes || [...DEFAULT_LOVE_MATCH_NOTES];

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
        currentTimeline = [...DEFAULT_TIMELINE];
        currentEnvelopes = [...DEFAULT_ENVELOPES];
        currentBucketList = [...DEFAULT_BUCKET_LIST];
        currentReasons = [...DEFAULT_REASONS];
        currentCoupons = [...DEFAULT_COUPONS];
        // currentSoundtrack removed
        currentGarden = [...DEFAULT_GARDEN];
        currentDateNight = [...DEFAULT_DATE_NIGHT];
        currentLoveMatchSymbols = [...DEFAULT_LOVE_MATCH_SYMBOLS];
        currentLoveMatchNotes = [...DEFAULT_LOVE_MATCH_NOTES];
        
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

    // ============================================
    // Panel Event Listeners
    // ============================================
    
    // Panel 1: Timeline
    const addTimelineBtn = document.getElementById('add-p-timeline-btn');
    if (addTimelineBtn) addTimelineBtn.addEventListener('click', addTimelineItem);
    document.getElementById('save-p-timeline-btn').addEventListener('click', saveTimeline);

    // Panel 2: Envelopes
    const addEnvelopeBtn = document.getElementById('add-p-envelopes-btn');
    if (addEnvelopeBtn) addEnvelopeBtn.addEventListener('click', addEnvelope);
    document.getElementById('save-p-envelopes-btn').addEventListener('click', saveEnvelopes);

    // Panel 3: Bucket List
    const addBucketBtn = document.getElementById('add-p-bucketlist-btn');
    if (addBucketBtn) addBucketBtn.addEventListener('click', addBucketItem);
    document.getElementById('save-p-bucketlist-btn').addEventListener('click', saveBucketList);

    // Panel 4: Reason Jar
    const addReasonBtn = document.getElementById('add-p-reasons-btn');
    if (addReasonBtn) addReasonBtn.addEventListener('click', addReason);
    document.getElementById('save-p-reasons-btn').addEventListener('click', saveReasons);

    // Panel 5: Coupons
    const addCouponBtn = document.getElementById('add-p-coupons-btn');
    if (addCouponBtn) addCouponBtn.addEventListener('click', addCoupon);
    document.getElementById('save-p-coupons-btn').addEventListener('click', saveCoupons);

    // Panel 6: Soundtrack REMOVED

    // Panel 7: Garden
    const addFlowerBtn = document.getElementById('add-p-garden-btn');
    if (addFlowerBtn) addFlowerBtn.addEventListener('click', addFlower);
    document.getElementById('save-p-garden-btn').addEventListener('click', saveGarden);

    // Panel 8: Date Night
    const addDateBtn = document.getElementById('add-p-datenight-btn');
    if (addDateBtn) addDateBtn.addEventListener('click', addDateRound);
    document.getElementById('save-p-datenight-btn').addEventListener('click', saveDateNight);

    // Panel 9: Love Match
    const addNoteBtn = document.getElementById('add-p-lovematch-note-btn');
    if (addNoteBtn) addNoteBtn.addEventListener('click', addLoveMatchNote);
    document.getElementById('save-p-lovematch-btn').addEventListener('click', saveLoveMatch);
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
    renderTimeline();
    renderEnvelopes();
    renderBucketList();
    renderReasons();
    renderCoupons();
    // renderSoundtrack() removed
    renderGarden();
    renderDateNight();
    renderLoveMatch();
}

function renderSecuritySection() {
    document.getElementById('password').value = currentConfig.password || '';

    const container = document.getElementById('questions-container');
    container.innerHTML = currentConfig.questions.map((q, i) => {
        const options = q.options || ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
        const correctIndex = q.correctIndex !== undefined ? q.correctIndex : 0;
        
        return `
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
                <label>Multiple Choice Options</label>
                <div class="options-grid">
                    <input type="text" class="form-input option-input" data-option="0" value="${escapeHtml(options[0] || '')}" placeholder="Option 1">
                    <input type="text" class="form-input option-input" data-option="1" value="${escapeHtml(options[1] || '')}" placeholder="Option 2">
                    <input type="text" class="form-input option-input" data-option="2" value="${escapeHtml(options[2] || '')}" placeholder="Option 3">
                    <input type="text" class="form-input option-input" data-option="3" value="${escapeHtml(options[3] || '')}" placeholder="Option 4">
                </div>
            </div>
            <div class="form-group">
                <label>Correct Answer</label>
                <select class="form-input correct-answer-select">
                    <option value="0" ${correctIndex === 0 ? 'selected' : ''}>Option 1: ${escapeHtml(options[0] || '')}</option>
                    <option value="1" ${correctIndex === 1 ? 'selected' : ''}>Option 2: ${escapeHtml(options[1] || '')}</option>
                    <option value="2" ${correctIndex === 2 ? 'selected' : ''}>Option 3: ${escapeHtml(options[2] || '')}</option>
                    <option value="3" ${correctIndex === 3 ? 'selected' : ''}>Option 4: ${escapeHtml(options[3] || '')}</option>
                </select>
            </div>
            <div class="form-group">
                <label>Hint (shown when wrong answer)</label>
                <input type="text" class="form-input question-hint" value="${escapeHtml(q.hint || '')}" placeholder="Enter hint">
            </div>
        </div>
    `;
    }).join('');
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
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correctIndex: 0,
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
            console.error('Error converting file:', error);
            showToast(`Error processing ${file.name}`, 'error');
        }
    }

    renderGallery();
    showToast(`Added ${files.length} images! Don't forget to save.`, 'success');
    event.target.value = ''; // Reset input
}


// ============================================
// PANEL 1: MEMORY LANE TIMELINE
// ============================================
function renderTimeline() {
    const container = document.getElementById('p-timeline-container');
    container.innerHTML = currentTimeline.map((m, i) => `
        <div class="panel-item" data-index="${i}">
            <div class="panel-item-header">
                <span class="item-title">Milestone ${i + 1}</span>
                <button class="remove-btn" onclick="removeTimelineItem(${i})">🗑️ Remove</button>
            </div>
            <div class="form-group">
                <label>Date Label</label>
                <input type="text" class="form-input tl-date" value="${escapeHtml(m.date)}" placeholder="e.g. A Beautiful Day">
            </div>
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-input tl-title" value="${escapeHtml(m.title)}" placeholder="Milestone Title">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="form-textarea tl-desc" placeholder="Details...">${escapeHtml(m.desc)}</textarea>
            </div>
        </div>
    `).join('');
}

function addTimelineItem() {
    currentTimeline.push({ date: "New Memory", title: "Untitled Milestone", desc: "Description here..." });
    renderTimeline();
    showToast('Milestone added!', 'success');
}

function removeTimelineItem(index) {
    if (currentTimeline.length <= 1) return showToast('Keep at least one milestone!', 'error');
    currentTimeline.splice(index, 1);
    renderTimeline();
}

async function saveTimeline() {
    const items = document.querySelectorAll('#p-timeline-container .panel-item');
    currentTimeline = Array.from(items).map(item => ({
        date: item.querySelector('.tl-date').value.trim(),
        title: item.querySelector('.tl-title').value.trim(),
        desc: item.querySelector('.tl-desc').value.trim()
    }));

    if (!isFirebaseConfigured()) return showToast('Firebase not configured!', 'error');
    try {
        await database.ref(DB_PATHS.panelTimeline).set(currentTimeline);
        showToast('Timeline saved! 📜', 'success');
    } catch (e) { console.error(e); showToast('Error saving timeline', 'error'); }
}


// ============================================
// PANEL 2: OPEN WHEN ENVELOPES
// ============================================
function renderEnvelopes() {
    const container = document.getElementById('p-envelopes-container');
    container.innerHTML = currentEnvelopes.map((e, i) => `
        <div class="panel-item" data-index="${i}">
            <div class="panel-item-header">
                <span class="item-title">Envelope ${i + 1}</span>
                <button class="remove-btn" onclick="removeEnvelope(${i})">🗑️ Remove</button>
            </div>
            <div class="form-group">
                <label>Label</label>
                <input type="text" class="form-input env-label" value="${escapeHtml(e.label)}" placeholder="Open when...">
            </div>
            <div class="form-group">
                <label>Icon (Emoji)</label>
                <input type="text" class="form-input env-icon" value="${e.icon}" placeholder="✉️">
            </div>
            <div class="form-group">
                <label>Letter Content</label>
                <textarea class="form-textarea env-letter" placeholder="Write your letter...">${escapeHtml(e.letter)}</textarea>
            </div>
        </div>
    `).join('');
}

function addEnvelope() {
    currentEnvelopes.push({ label: "Open when...", icon: "✉️", letter: "Your letter here..." });
    renderEnvelopes();
    showToast('Envelope added!', 'success');
}

function removeEnvelope(index) {
    if (currentEnvelopes.length <= 1) return showToast('Keep at least one envelope!', 'error');
    currentEnvelopes.splice(index, 1);
    renderEnvelopes();
}

async function saveEnvelopes() {
    const items = document.querySelectorAll('#p-envelopes-container .panel-item');
    currentEnvelopes = Array.from(items).map(item => ({
        label: item.querySelector('.env-label').value.trim(),
        icon: item.querySelector('.env-icon').value.trim(),
        letter: item.querySelector('.env-letter').value.trim()
    }));

    if (!isFirebaseConfigured()) return showToast('Firebase not configured!', 'error');
    try {
        await database.ref(DB_PATHS.panelEnvelopes).set(currentEnvelopes);
        showToast('Envelopes saved! ✉️', 'success');
    } catch (e) { console.error(e); showToast('Error saving envelopes', 'error'); }
}


// ============================================
// PANEL 3: BUCKET LIST
// ============================================
function renderBucketList() {
    const container = document.getElementById('p-bucketlist-container');
    container.innerHTML = currentBucketList.map((item, i) => `
        <div class="panel-item-row" data-index="${i}">
            <span class="row-number">${i + 1}.</span>
            <input type="text" class="form-input bl-item" value="${escapeHtml(item)}" placeholder="Bucket list item...">
            <button class="remove-btn-icon" onclick="removeBucketItem(${i})">🗑️</button>
        </div>
    `).join('');
}

function addBucketItem() {
    currentBucketList.push("New bucket list goal");
    renderBucketList();
}

function removeBucketItem(index) {
    if (currentBucketList.length <= 1) return showToast('Keep at least one item!', 'error');
    currentBucketList.splice(index, 1);
    renderBucketList();
}

async function saveBucketList() {
    const inputs = document.querySelectorAll('.bl-item');
    currentBucketList = Array.from(inputs).map(input => input.value.trim());

    if (!isFirebaseConfigured()) return showToast('Firebase not configured!', 'error');
    try {
        await database.ref(DB_PATHS.panelBucketList).set(currentBucketList);
        showToast('Bucket List saved! ✅', 'success');
    } catch (e) { console.error(e); showToast('Error saving bucket list', 'error'); }
}


// ============================================
// PANEL 4: REASON JAR
// ============================================
function renderReasons() {
    const container = document.getElementById('p-reasons-container');
    container.innerHTML = currentReasons.map((r, i) => `
        <div class="panel-item-row" data-index="${i}">
            <span class="row-number">${i + 1}.</span>
            <input type="text" class="form-input reason-item" value="${escapeHtml(r)}" placeholder="Because...">
            <button class="remove-btn-icon" onclick="removeReason(${i})">🗑️</button>
        </div>
    `).join('');
}

function addReason() {
    currentReasons.push("Because I love you...");
    renderReasons();
}

function removeReason(index) {
    if (currentReasons.length <= 1) return showToast('Keep at least one reason!', 'error');
    currentReasons.splice(index, 1);
    renderReasons();
}

async function saveReasons() {
    const inputs = document.querySelectorAll('.reason-item');
    currentReasons = Array.from(inputs).map(input => input.value.trim());

    if (!isFirebaseConfigured()) return showToast('Firebase not configured!', 'error');
    try {
        await database.ref(DB_PATHS.panelReasons).set(currentReasons);
        showToast('Reasons saved! 🏺', 'success');
    } catch (e) { console.error(e); showToast('Error saving reasons', 'error'); }
}


// ============================================
// PANEL 5: LOVE COUPONS
// ============================================
function renderCoupons() {
    const container = document.getElementById('p-coupons-container');
    container.innerHTML = currentCoupons.map((c, i) => `
        <div class="panel-item" data-index="${i}">
            <div class="panel-item-header">
                <span class="item-title">Coupon ${i + 1}</span>
                <button class="remove-btn" onclick="removeCoupon(${i})">🗑️ Remove</button>
            </div>
            <div class="form-grid">
                <div class="form-group small">
                    <label>Icon</label>
                    <input type="text" class="form-input cp-icon" value="${c.icon}" placeholder="🎟️">
                </div>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-input cp-title" value="${escapeHtml(c.title)}" placeholder="Coupon Title">
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <input type="text" class="form-input cp-desc" value="${escapeHtml(c.desc)}" placeholder="Description...">
            </div>
        </div>
    `).join('');
}

function addCoupon() {
    currentCoupons.push({ icon: "🎟️", title: "New Coupon", desc: "Valid for one..." });
    renderCoupons();
    showToast('Coupon added!', 'success');
}

function removeCoupon(index) {
    if (currentCoupons.length <= 1) return showToast('Keep at least one coupon!', 'error');
    currentCoupons.splice(index, 1);
    renderCoupons();
}

async function saveCoupons() {
    const items = document.querySelectorAll('#p-coupons-container .panel-item');
    currentCoupons = Array.from(items).map(item => ({
        icon: item.querySelector('.cp-icon').value.trim(),
        title: item.querySelector('.cp-title').value.trim(),
        desc: item.querySelector('.cp-desc').value.trim()
    }));

    if (!isFirebaseConfigured()) return showToast('Firebase not configured!', 'error');
    try {
        await database.ref(DB_PATHS.panelCoupons).set(currentCoupons);
        showToast('Coupons saved! 🎟️', 'success');
    } catch (e) { console.error(e); showToast('Error saving coupons', 'error'); }
}

// ============================================
// PANEL 6: SOUNDTRACK REMOVED
// ============================================



// ============================================
// PANEL 7: DAILY GARDEN
// ============================================
function renderGarden() {
    const container = document.getElementById('p-garden-container');
    container.innerHTML = currentGarden.map((g, i) => `
        <div class="panel-item" data-index="${i}">
            <div class="panel-item-header">
                <span class="item-title">Feb ${g.date || (7 + i)}: ${escapeHtml(g.name)}</span>
                <button class="remove-btn" onclick="removeFlower(${i})">🗑️ Remove</button>
            </div>
            <div class="form-grid">
                <div class="form-group small">
                    <label>Emoji</label>
                    <input type="text" class="form-input gd-emoji" value="${g.emoji}" placeholder="🌸">
                </div>
                <div class="form-group">
                    <label>Flower Name</label>
                    <input type="text" class="form-input gd-name" value="${escapeHtml(g.name)}" placeholder="Rose">
                </div>
                <div class="form-group small">
                    <label>Date (Feb)</label>
                    <input type="number" class="form-input gd-date" value="${g.date}" min="7" max="14">
                </div>
            </div>
            <div class="form-group">
                <label>Message</label>
                <textarea class="form-textarea gd-msg" placeholder="Flower message...">${escapeHtml(g.msg)}</textarea>
            </div>
        </div>
    `).join('');
}

function addFlower() {
    currentGarden.push({ emoji: "🌸", name: "New Flower", date: 7, msg: "Message..." });
    renderGarden();
    showToast('Flower added!', 'success');
}

function removeFlower(index) {
    if (currentGarden.length <= 1) return showToast('Keep at least one flower!', 'error');
    currentGarden.splice(index, 1);
    renderGarden();
}

async function saveGarden() {
    const items = document.querySelectorAll('#p-garden-container .panel-item');
    currentGarden = Array.from(items).map(item => ({
        emoji: item.querySelector('.gd-emoji').value.trim(),
        name: item.querySelector('.gd-name').value.trim(),
        date: parseInt(item.querySelector('.gd-date').value) || 7,
        msg: item.querySelector('.gd-msg').value.trim()
    }));

    if (!isFirebaseConfigured()) return showToast('Firebase not configured!', 'error');
    try {
        await database.ref(DB_PATHS.panelGarden).set(currentGarden);
        showToast('Garden saved! 🌸', 'success');
    } catch (e) { console.error(e); showToast('Error saving garden', 'error'); }
}


// ============================================
// PANEL 8: DATE NIGHT
// ============================================
function renderDateNight() {
    const container = document.getElementById('p-datenight-container');
    container.innerHTML = currentDateNight.map((round, i) => `
        <div class="panel-item" data-index="${i}">
            <div class="panel-item-header">
                <span class="item-title">Round ${i + 1}</span>
                <button class="remove-btn" onclick="removeDateRound(${i})">🗑️ Remove</button>
            </div>
            <div class="form-group">
                <label>Question</label>
                <input type="text" class="form-input dn-question" value="${escapeHtml(round.question)}" placeholder="e.g. What's the vibe?">
            </div>
            
            <div class="options-container" style="margin-top: 10px; border-left: 2px solid rgba(255,255,255,0.1); padding-left: 10px;">
                <p style="margin-bottom: 5px; font-size: 0.9em; opacity: 0.8;">Option 1</p>
                <div class="form-grid">
                    <div class="form-group small">
                        <input type="text" class="form-input dn-op1-icon" value="${round.options[0].icon}" placeholder="Icon">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-input dn-op1-title" value="${escapeHtml(round.options[0].title)}" placeholder="Title">
                    </div>
                </div>
                <div class="form-group">
                    <input type="text" class="form-input dn-op1-desc" value="${escapeHtml(round.options[0].desc)}" placeholder="Description">
                </div>

                <p style="margin-bottom: 5px; font-size: 0.9em; opacity: 0.8; margin-top: 10px;">Option 2</p>
                <div class="form-grid">
                    <div class="form-group small">
                        <input type="text" class="form-input dn-op2-icon" value="${round.options[1].icon}" placeholder="Icon">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-input dn-op2-title" value="${escapeHtml(round.options[1].title)}" placeholder="Title">
                    </div>
                </div>
                <div class="form-group">
                    <input type="text" class="form-input dn-op2-desc" value="${escapeHtml(round.options[1].desc)}" placeholder="Description">
                </div>
            </div>
        </div>
    `).join('');
}

function addDateRound() {
    currentDateNight.push({
        question: "New Question",
        options: [
            { icon: "🅰️", title: "Option A", desc: "Description A" },
            { icon: "🅱️", title: "Option B", desc: "Description B" }
        ]
    });
    renderDateNight();
    showToast('Round added!', 'success');
}

function removeDateRound(index) {
    if (currentDateNight.length <= 1) return showToast('Keep at least one round!', 'error');
    currentDateNight.splice(index, 1);
    renderDateNight();
}

async function saveDateNight() {
    const items = document.querySelectorAll('#p-datenight-container .panel-item');
    currentDateNight = Array.from(items).map(item => ({
        question: item.querySelector('.dn-question').value.trim(),
        options: [
            {
                icon: item.querySelector('.dn-op1-icon').value.trim(),
                title: item.querySelector('.dn-op1-title').value.trim(),
                desc: item.querySelector('.dn-op1-desc').value.trim()
            },
            {
                icon: item.querySelector('.dn-op2-icon').value.trim(),
                title: item.querySelector('.dn-op2-title').value.trim(),
                desc: item.querySelector('.dn-op2-desc').value.trim()
            }
        ]
    }));

    if (!isFirebaseConfigured()) return showToast('Firebase not configured!', 'error');
    try {
        await database.ref(DB_PATHS.panelDateNight).set(currentDateNight);
        showToast('Date Night saved! 🌙', 'success');
    } catch (e) { console.error(e); showToast('Error saving date night', 'error'); }
}


// ============================================
// PANEL 9: LOVE MATCH
// ============================================
function renderLoveMatch() {
    // Render Symbols
    const symContainer = document.getElementById('p-lovematch-symbols-container');
    symContainer.innerHTML = currentLoveMatchSymbols.map((s, i) => `
        <div class="panel-item-row" data-index="${i}">
            <span class="row-number">${i + 1}.</span>
            <input type="text" class="form-input lm-sym-emoji" value="${s.emoji}" placeholder="Emoji" style="width: 50px;">
            <input type="text" class="form-input lm-sym-name" value="${escapeHtml(s.name)}" placeholder="Name">
        </div>
    `).join('');

    // Render Notes
    const notesContainer = document.getElementById('p-lovematch-notes-container');
    notesContainer.innerHTML = currentLoveMatchNotes.map((note, i) => `
        <div class="panel-item-row" data-index="${i}">
            <span class="row-number">${i + 1}.</span>
            <input type="text" class="form-input lm-note" value="${escapeHtml(note)}" placeholder="Love note text...">
            <button class="remove-btn-icon" onclick="removeLoveMatchNote(${i})">🗑️</button>
        </div>
    `).join('');
}

function addLoveMatchNote() {
    currentLoveMatchNotes.push("New love note...");
    renderLoveMatch();
}

function removeLoveMatchNote(index) {
    if (currentLoveMatchNotes.length <= 1) return showToast('Keep at least one note!', 'error');
    currentLoveMatchNotes.splice(index, 1);
    renderLoveMatch();
}

async function saveLoveMatch() {
    const symItems = document.querySelectorAll('.lm-sym-emoji');
    const noteItems = document.querySelectorAll('.lm-note');

    // Update symbols
    currentLoveMatchSymbols = Array.from(symItems).map((emojiInput, i) => ({
        emoji: emojiInput.value.trim(),
        name: document.querySelectorAll('.lm-sym-name')[i].value.trim()
    }));

    // Update notes
    currentLoveMatchNotes = Array.from(noteItems).map(input => input.value.trim());

    if (!isFirebaseConfigured()) return showToast('Firebase not configured!', 'error');
    try {
        await database.ref(DB_PATHS.panelLoveMatch).set({
            symbols: currentLoveMatchSymbols,
            notes: currentLoveMatchNotes
        });
        showToast('Love Match saved! 🃏', 'success');
    } catch (e) { console.error(e); showToast('Error saving love match', 'error'); }
}


// Make remove functions globally accessible
window.removeTimelineItem = removeTimelineItem;
window.removeEnvelope = removeEnvelope;
window.removeBucketItem = removeBucketItem;
window.removeReason = removeReason;
window.removeCoupon = removeCoupon;
window.removeSong = removeSong;
window.removeFlower = removeFlower;
window.removeDateRound = removeDateRound;
window.removeLoveMatchNote = removeLoveMatchNote;



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

    // Get questions with multiple choice options
    const questionItems = document.querySelectorAll('.question-item');
    currentConfig.questions = Array.from(questionItems).map(item => {
        const optionInputs = item.querySelectorAll('.option-input');
        const options = Array.from(optionInputs).map(input => input.value.trim());
        const correctIndex = parseInt(item.querySelector('.correct-answer-select').value, 10);
        
        return {
            question: item.querySelector('.question-text').value.trim(),
            options: options,
            correctIndex: correctIndex,
            hint: item.querySelector('.question-hint').value.trim()
        };
    });

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
    // currentGallery already contains uploaded images from handleGalleryFileUpload
    // No need to read from DOM elements

    if (!isFirebaseConfigured()) {
        showToast('⚠️ Firebase not configured! Changes not saved.', 'error');
        return;
    }

    try {
        await database.ref(DB_PATHS.gallery).set(currentGallery);
        if (currentGallery.length === 0) {
            showToast('Gallery cleared! All images removed from cloud. 🗑️', 'success');
        } else {
            showToast(`Gallery saved to cloud! ${currentGallery.length} image(s) 🖼️`, 'success');
        }
        console.log(`Saved ${currentGallery.length} images to Firebase`);
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
