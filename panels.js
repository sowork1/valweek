/* ============================================
   PANELS.JS — 8 Interactive Valentine Panels
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Check if data is already loaded via script.js
    if (window.PANEL_TIMELINE && window.PANEL_TIMELINE.length > 0) {
        initPanelsWithData();
    } else {
        // Wait for event
        window.addEventListener('valentineDataLoaded', initPanelsWithData);
        
        // Fallback if event never fires (e.g. firebase error) - use defaults after 2s
        setTimeout(() => {
            if (!document.querySelector('.timeline-wrapper').innerHTML) {
                console.log('Timeout waiting for data, initializing with defaults');
                initPanelsWithData();
            }
        }, 2000); 
    }
});

function initPanelsWithData() {
    // Sync global data if available
    if (window.PANEL_TIMELINE && window.PANEL_TIMELINE.length > 0) TIMELINE_DATA = window.PANEL_TIMELINE;
    if (window.PANEL_ENVELOPES && window.PANEL_ENVELOPES.length > 0) ENVELOPE_DATA = window.PANEL_ENVELOPES;
    if (window.PANEL_BUCKET_LIST && window.PANEL_BUCKET_LIST.length > 0) BUCKET_LIST_DATA = window.PANEL_BUCKET_LIST;
    if (window.PANEL_REASONS && window.PANEL_REASONS.length > 0) REASON_DATA = window.PANEL_REASONS;
    if (window.PANEL_COUPONS && window.PANEL_COUPONS.length > 0) COUPON_DATA = window.PANEL_COUPONS;
    if (window.PANEL_SOUNDTRACK && window.PANEL_SOUNDTRACK.length > 0) SOUNDTRACK_DATA = window.PANEL_SOUNDTRACK;
    if (window.PANEL_GARDEN && window.PANEL_GARDEN.length > 0) GARDEN_DATA = window.PANEL_GARDEN;
    if (window.PANEL_DATE_NIGHT && window.PANEL_DATE_NIGHT.length > 0) DATE_NIGHT_DATA = window.PANEL_DATE_NIGHT;
    
    // Love Match is an object
    if (window.PANEL_LOVE_MATCH && window.PANEL_LOVE_MATCH.symbols) {
        LOVE_MATCH_SYMBOLS = window.PANEL_LOVE_MATCH.symbols;
        LOVE_MATCH_NOTES = window.PANEL_LOVE_MATCH.notes;
    }

    initPanels();
}

function initPanels() {
    initMemoryLane();
    initEnvelopes();
    initBucketList();
    initReasonJar();
    initCoupons();
    initSoundtrack();
    initGarden();
    initDateNight();
    initLoveMatch();
}

/* ============================================
   1. ANIMATED MEMORY LANE TIMELINE
   ============================================ */
let TIMELINE_DATA = [
    { date: "A Beautiful Day", title: "The Day We First Met", desc: "Our eyes met across the room and time stood still. That moment changed everything forever." },
    { date: "Soon After", title: "Our First Conversation", desc: "Hours felt like minutes as we talked about everything and nothing. I knew you were special." },
    { date: "A Magical Evening", title: "The First Date", desc: "Butterflies, nervous laughter, and the beginning of our forever story." },
    { date: "A Quiet Moment", title: "When I First Said I Love You", desc: "Three words that carried the weight of a thousand emotions. And you said them back." },
    { date: "Our Anniversary", title: "365 Days Together", desc: "A full year of memories, laughter, and growing love. Here's to infinity more." },
    { date: "Forever Starts Now", title: "This Very Moment", desc: "Every second with you is my favorite. The best is always yet to come." }
];

function initMemoryLane() {
    const wrapper = document.querySelector('.timeline-wrapper');
    if (!wrapper) return;

    wrapper.innerHTML = TIMELINE_DATA.map((m, i) => `
        <div class="tl-milestone ${i % 2 === 0 ? 'slide-left' : 'slide-right'}" style="transition-delay: ${i * 0.15}s">
            <div class="tl-node">💗</div>
            <div class="tl-card">
                <div class="tl-date">${m.date}</div>
                <div class="tl-title">${m.title}</div>
                <div class="tl-desc">${m.desc}</div>
            </div>
        </div>
    `).join('');

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    wrapper.querySelectorAll('.tl-milestone').forEach(el => observer.observe(el));
}

/* ============================================
   2. OPEN WHEN ENVELOPES
   ============================================ */
let ENVELOPE_DATA = [
    { label: "Open when you need a hug", icon: "🤗", letter: "Close your eyes, wrap your arms around yourself, and imagine it's me. Every time you feel lonely, know that my love is wrapping around you like the warmest blanket in the world. You are never alone — my heart beats for you even from miles away." },
    { label: "Open when you can't sleep", icon: "🌙", letter: "Hey my love, can't sleep? Count the reasons I love you instead of sheep: your smile, your laugh, the way you scrunch your nose, how you hold my hand... still awake? That's because the list is endless. Sweet dreams, my forever person." },
    { label: "Open when you miss me", icon: "💭", letter: "I miss you too, always. But distance is just a test to see how far love can travel — and ours crosses galaxies. Every star in the sky is a reminder that our love shines even in the darkest moments. I'll be with you soon." },
    { label: "Open when you're stressed", icon: "🫶", letter: "Take a deep breath. In... and out. Whatever is weighing on you right now is temporary, but my love for you is permanent. You've conquered harder things than this. I believe in you with my whole heart. You've got this, superstar." },
    { label: "Open when you need motivation", icon: "⭐", letter: "Remember why you started. You are stronger, braver, and more talented than you know. Every step forward is a victory. I'm cheering for you louder than anyone. Now go make the world as beautiful as your smile!" },
    { label: "Open when you want to smile", icon: "😊", letter: "Remember that time we laughed so hard we couldn't breathe? Or when we had that silly inside joke nobody else understood? This letter is your permission to be ridiculously happy right now. Smile — because someone out there loves your smile more than sunsets." }
];

function initEnvelopes() {
    const grid = document.querySelector('.env-grid');
    if (!grid) return;

    grid.innerHTML = ENVELOPE_DATA.map((e, i) => `
        <div class="envelope fade-up" style="transition-delay: ${i * 0.12}s" data-idx="${i}">
            <div class="env-body">
                <div class="env-back">
                    <span class="env-icon">${e.icon}</span>
                    <span class="env-label">${e.label}</span>
                </div>
                <div class="env-flap"></div>
            </div>
        </div>
    `).join('');

    // Observe for fade-up
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    grid.querySelectorAll('.envelope').forEach(el => observer.observe(el));

    // Click handler
    grid.querySelectorAll('.envelope').forEach(env => {
        env.addEventListener('click', () => {
            const idx = parseInt(env.dataset.idx);
            env.classList.add('open');
            openLetter(idx);
        });
    });
}

function openLetter(idx) {
    const data = ENVELOPE_DATA[idx];
    const overlay = document.getElementById('letterOverlay');
    const titleEl = overlay.querySelector('.letter-title');
    const textEl = overlay.querySelector('.letter-text');

    titleEl.textContent = data.label;
    textEl.innerHTML = '<span class="typing-cursor"></span>';
    overlay.classList.add('active');

    // Typewriter effect
    let charIdx = 0;
    const letters = data.letter;
    const typeInterval = setInterval(() => {
        if (charIdx < letters.length) {
            textEl.innerHTML = letters.substring(0, charIdx + 1) + '<span class="typing-cursor"></span>';
            charIdx++;
        } else {
            clearInterval(typeInterval);
            textEl.innerHTML = letters;
        }
    }, 25);

    // Close handler
    overlay.querySelector('.letter-close').onclick = () => {
        clearInterval(typeInterval);
        overlay.classList.remove('active');
        // Remove open class from envelope after close
        setTimeout(() => {
            document.querySelectorAll('.envelope.open').forEach(e => e.classList.remove('open'));
        }, 400);
    };

    // Click outside to close
    overlay.addEventListener('click', function handler(e) {
        if (e.target === overlay) {
            clearInterval(typeInterval);
            overlay.classList.remove('active');
            overlay.removeEventListener('click', handler);
            setTimeout(() => {
                document.querySelectorAll('.envelope.open').forEach(e => e.classList.remove('open'));
            }, 400);
        }
    });
}

/* ============================================
   3. COUPLE'S BUCKET LIST
   ============================================ */
let BUCKET_LIST_DATA = [
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

function initBucketList() {
    const container = document.querySelector('.bl-container');
    if (!container) return;

    container.innerHTML = BUCKET_LIST_DATA.map((item, i) => `
        <div class="bl-item fade-up" style="transition-delay: ${i * 0.08}s">
            <span class="bl-heart" data-idx="${i}">🤍</span>
            <span class="bl-text">${item}</span>
        </div>
    `).join('');

    // Observe
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.05 });
    container.querySelectorAll('.bl-item').forEach(el => observer.observe(el));

    // Heart click
    container.querySelectorAll('.bl-heart').forEach(heart => {
        heart.addEventListener('click', function() {
            const item = this.closest('.bl-item');
            if (item.classList.contains('done')) return;

            this.textContent = '❤️';
            this.classList.add('checked');
            item.classList.add('done');

            // Sparkle particles
            for (let i = 0; i < 8; i++) {
                const spark = document.createElement('span');
                spark.className = 'bl-sparkle';
                const angle = (Math.PI * 2 * i) / 8;
                spark.style.setProperty('--sx', `${Math.cos(angle) * 30}px`);
                spark.style.setProperty('--sy', `${Math.sin(angle) * 30}px`);
                this.appendChild(spark);
                setTimeout(() => spark.remove(), 600);
            }
        });
    });
}

/* ============================================
   4. REASON WHY JAR
   ============================================ */
let REASON_DATA = [
    "Because your smile is my favorite sight in the entire universe.",
    "Because you understand me without me having to say a word.",
    "Because you make ordinary moments feel extraordinary.",
    "Because your laugh is the most beautiful music I've ever heard.",
    "Because you believe in me even when I don't believe in myself.",
    "Because of the way you look at me when you think I'm not watching.",
    "Because your hugs feel like home.",
    "Because you make my worst days better just by being there.",
    "Because you're the first person I want to tell good news to.",
    "Because of the little things you do without even realizing.",
    "Because you love me with all my imperfections.",
    "Because you're my best friend and my soulmate in one.",
    "Because you make me want to be a better person every day.",
    "Because you're the reason I believe in love stories.",
    "Because waking up next to you is my biggest blessing.",
    "Because you took my hand and never let go.",
    "Because your kindness inspires me endlessly.",
    "Because every moment with you feels like a page from a fairy tale.",
    "Because you love with your whole heart — and it's beautiful.",
    "Because of the way you say my name.",
    "Because you fight for us, always.",
    "Because you make me feel safe and brave at the same time.",
    "Because your eyes hold galaxies I could get lost in forever.",
    "Because you celebrate the little things with me.",
    "Because you're patient with me when I need it most.",
    "Because you're the calm in my storm.",
    "Because you turn my tears into laughter.",
    "Because I can be completely myself around you.",
    "Because you remember the little details I share with you.",
    "Because you challenge me to grow, with love.",
    "Because you still give me butterflies.",
    "Because of the future I dream of with you.",
    "Because you're my today, my tomorrow, and my forever.",
    "Because you make even silence comfortable.",
    "Because your voice is my favorite sound.",
    "Because you chose me — and keep choosing me every day.",
    "Because you're the plot twist I never saw coming.",
    "Because you make falling in love feel brand new every morning.",
    "Because our love story is my absolute favorite.",
    "Because no distance could ever dim what we have.",
    "Because you're worth every wait, every mile, every sacrifice.",
    "Because you love the parts of me I try to hide.",
    "Because your heart is the purest thing I know.",
    "Because I fall a little deeper in love with you every day.",
    "Because you make me laugh until my sides hurt.",
    "Because the world is more beautiful with you in it.",
    "Because you taught me what real love looks like.",
    "Because you never gave up on us.",
    "Because one lifetime with you will never be enough.",
    "Because loving you is the easiest and most extraordinary thing I've ever done."
];

let lastReasonIdx = -1;

function initReasonJar() {
    const wrapper = document.querySelector('.jar-wrapper');
    if (!wrapper) return;

    // Create jar SVG
    wrapper.innerHTML = `
        <svg class="jar-svg" viewBox="0 0 120 170" fill="none">
            <rect x="25" y="15" width="70" height="12" rx="4" fill="rgba(255,255,255,0.2)" stroke="rgba(255,107,157,0.4)" stroke-width="1.5"/>
            <path d="M20 27 Q20 17 30 17 L90 17 Q100 17 100 27 L105 150 Q105 165 90 165 L30 165 Q15 165 15 150 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,107,157,0.35)" stroke-width="1.5"/>
            <ellipse cx="60" cy="165" rx="45" ry="3" fill="rgba(255,107,157,0.1)"/>
        </svg>
        <div class="jar-papers"></div>
    `;

    // Add papers inside jar
    const papersContainer = wrapper.querySelector('.jar-papers');
    const colors = ['#ff6b9d', '#c9184a', '#9d4edd', '#ffd700', '#e0aaff', '#ffb5c5', '#e63946', '#ff85a1'];
    for (let i = 0; i < 20; i++) {
        const paper = document.createElement('div');
        paper.className = 'jar-paper';
        paper.style.background = colors[i % colors.length];
        paper.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
        papersContainer.appendChild(paper);
    }

    // Click handler
    wrapper.addEventListener('click', pickReason);
}

function pickReason() {
    const wrapper = document.querySelector('.jar-wrapper');
    const noteEl = document.querySelector('.jar-note');
    const textEl = document.querySelector('.jar-note-text');

    // Shake
    wrapper.classList.add('shake');
    setTimeout(() => wrapper.classList.remove('shake'), 400);

    // Blur out current note
    noteEl.classList.add('blur-out');

    setTimeout(() => {
        // Pick random (not same as last)
        let idx;
        do { idx = Math.floor(Math.random() * REASON_DATA.length); } while (idx === lastReasonIdx);
        lastReasonIdx = idx;

        textEl.textContent = REASON_DATA[idx];
        noteEl.classList.remove('blur-out');
    }, 500);
}

/* ============================================
   5. LOVE COUPONS
   ============================================ */
let COUPON_DATA = [
    { icon: "💆", title: "30-Minute Massage", desc: "A relaxing, no-strings-attached massage whenever you need it." },
    { icon: "🍳", title: "Breakfast in Bed", desc: "Wake up to your favorite meal served with a side of love." },
    { icon: "🎬", title: "Movie Night Pick", desc: "You choose the movie — no complaints, no negotiations!" },
    { icon: "🧹", title: "Chore-Free Day", desc: "A full day where I do ALL the chores. You just relax." },
    { icon: "🍕", title: "Pizza & Cuddles", desc: "Your favorite pizza + unlimited cuddles. Best combo ever." },
    { icon: "🌟", title: "Wish Granted", desc: "One reasonable wish, no questions asked. Use wisely!" },
    { icon: "🎵", title: "Serenade Session", desc: "I'll sing your favorite song (quality not guaranteed, love is)." },
    { icon: "🧊", title: "Ice Cream Date", desc: "A surprise ice cream outing to your favorite parlor." }
];

function initCoupons() {
    const track = document.querySelector('.coupon-track');
    if (!track) return;

    track.innerHTML = COUPON_DATA.map((c, i) => `
        <div class="coupon" id="coupon-${i}">
            <div class="coupon-icon">${c.icon}</div>
            <div class="coupon-title">${c.title}</div>
            <div class="coupon-desc">${c.desc}</div>
            <button class="coupon-redeem" data-idx="${i}">💕 Redeem</button>
            <div class="coupon-stamp">REDEEMED</div>
        </div>
    `).join('');

    track.querySelectorAll('.coupon-redeem').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            redeemCoupon(parseInt(this.dataset.idx));
        });
    });
}

function redeemCoupon(idx) {
    const coupon = document.getElementById(`coupon-${idx}`);
    const btn = coupon.querySelector('.coupon-redeem');

    btn.textContent = '⏳ Processing...';
    btn.classList.add('processing');

    setTimeout(() => {
        // Confetti burst
        launchConfetti();
        coupon.classList.add('redeemed');
    }, 1200);
}

function launchConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    const hearts = ['💕', '❤️', '💗', '💖', '💝', '🩷', '✨', '🌹'];
    for (let i = 0; i < 40; i++) {
        const piece = document.createElement('span');
        piece.className = 'confetti-piece';
        piece.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        piece.style.left = Math.random() * 100 + '%';
        piece.style.animationDelay = Math.random() * 1 + 's';
        piece.style.animationDuration = (2 + Math.random() * 1.5) + 's';
        container.appendChild(piece);
    }

    setTimeout(() => container.remove(), 4000);
}

/* ============================================
   6. SOUNDTRACK GALLERY
   ============================================ */
let SOUNDTRACK_DATA = [
    { name: "Perfect", artist: "Ed Sheeran", story: "This was playing the first time we danced together. Every lyric felt like it was written just for us." },
    { name: "All of Me", artist: "John Legend", story: "You played this for me on our anniversary and I couldn't hold back the tears. It's our truth." },
    { name: "A Thousand Years", artist: "Christina Perri", story: "This captures exactly how I feel — I've loved you for a thousand years and I'll love you for a thousand more." },
    { name: "Thinking Out Loud", artist: "Ed Sheeran", story: "We slow-danced in the kitchen to this song. One of my most cherished memories." },
    { name: "At Last", artist: "Etta James", story: "A timeless classic that perfectly describes the moment I found you after all the waiting." },
    { name: "Can't Help Falling in Love", artist: "Elvis Presley", story: "Because falling in love with you was the most natural and beautiful thing I've ever experienced." }
];

let progressIntervals = {};

function initSoundtrack() {
    const listEl = document.querySelector('.song-list');
    const player = document.querySelector('.song-player');
    if (!listEl || !player) return;

    // Play first song
    if (SOUNDTRACK_DATA.length > 0) {
        player.querySelector('.sp-meta h4').textContent = SOUNDTRACK_DATA[0].name;
        player.querySelector('.sp-meta p').textContent = SOUNDTRACK_DATA[0].artist;
        player.querySelector('.sp-story p').textContent = SOUNDTRACK_DATA[0].story;
    }

    listEl.innerHTML = SOUNDTRACK_DATA.map((s, i) => `
        <div>
            <div class="song-card" data-idx="${i}">
                <div class="song-vinyl"></div>
                <div class="song-info">
                    <div class="song-name">${s.name}</div>
                    <div class="song-artist">${s.artist}</div>
                    <div class="song-progress"><div class="song-progress-fill" id="progress-${i}"></div></div>
                </div>
                <button class="song-story-btn" data-idx="${i}">Our Story 💫</button>
            </div>
            <div class="song-story" id="story-${i}">${s.story}</div>
        </div>
    `).join('');

    // Click handler
    listEl.querySelectorAll('.song-card').forEach(item => {
        item.addEventListener('click', () => {
            const idx = parseInt(item.dataset.idx);
            const song = SOUNDTRACK_DATA[idx];
            player.querySelector('.sp-meta h4').textContent = song.name;
            player.querySelector('.sp-meta p').textContent = song.artist;
            player.querySelector('.sp-story p').textContent = song.story;
        });
    });

    // Story toggle
    listEl.querySelectorAll('.song-story-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const idx = this.dataset.idx;
            const story = document.getElementById(`story-${idx}`);
            story.classList.toggle('open');
            this.textContent = story.classList.contains('open') ? 'Close ✕' : 'Our Story 💫';
        });
    });

    // Hover progress bar animation
    listEl.querySelectorAll('.song-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const idx = this.dataset.idx;
            const fill = document.getElementById(`progress-${idx}`);
            let width = 0;
            progressIntervals[idx] = setInterval(() => {
                width += 0.5;
                if (width > 100) width = 0;
                fill.style.width = width + '%';
            }, 50);
        });
        card.addEventListener('mouseleave', function() {
            const idx = this.dataset.idx;
            clearInterval(progressIntervals[idx]);
            const fill = document.getElementById(`progress-${idx}`);
            fill.style.width = '0%';
        });
    });
}

/* ============================================
   7. VIRTUAL DAILY GARDEN
   ============================================ */
let GARDEN_DATA = [
    { emoji: "🌹", name: "Rose", date: 7, msg: "Like this rose, my love for you is timeless and beautiful. You make every day brighter." },
    { emoji: "🌷", name: "Tulip", date: 8, msg: "A tulip for my proposal — you are the perfect partner I've always dreamed of." },
    { emoji: "🌻", name: "Sunflower", date: 9, msg: "You are my sunflower — you turn my darkest days into bright, golden moments." },
    { emoji: "🌸", name: "Cherry Blossom", date: 10, msg: "Delicate and stunning, just like you. Our love blossoms with every passing season." },
    { emoji: "🌺", name: "Hibiscus", date: 11, msg: "Bold and beautiful — a promise that our love will always be vibrant and alive." },
    { emoji: "💐", name: "Bouquet", date: 12, msg: "A whole bouquet because you deserve all the flowers in the world. You are my everything." },
    { emoji: "🌼", name: "Daisy", date: 13, msg: "Simple, pure, and full of joy — just like the love you give me every single day." },
    { emoji: "❤️‍🔥", name: "Eternal Flame", date: 14, msg: "Our love burns eternal. Happy Valentine's Day to my forever person." }
];

function initGarden() {
    const grid = document.querySelector('.garden-grid');
    if (!grid) return;

    // Determine current date in IST
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + istOffset);
    const todayDate = istTime.getDate(); // e.g. 7, 8... 14
    // Filter flowers that are "bloomed" (date <= today) or just show all for demo?
    // Let's show all but lock future ones
    
    grid.innerHTML = GARDEN_DATA.map((g, i) => {
        const isLocked = g.date > todayDate && todayDate < 15; // Unlock all after 14th
        const delay = i * 0.1;
        return `
        <div class="flower-card fade-up ${isLocked ? 'locked' : ''}" style="transition-delay: ${delay}s">
            <div class="flower-icon">${isLocked ? '🌱' : g.emoji}</div>
            <div class="flower-name">${g.name}</div>
            <div class="flower-date">Feb ${g.date}</div>
            ${isLocked ? '<div class="flower-msg">Blooming soon...</div>' : ''}
        </div>
        `;
    }).join('');

    // Observe
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    grid.querySelectorAll('.flower-card').forEach(el => observer.observe(el));

    // Click handler
    grid.querySelectorAll('.flower-card').forEach(pot => {
        pot.addEventListener('click', function() {
            if (this.classList.contains('locked')) return;
            if (this.classList.contains('bloomed')) return;

            this.classList.add('bloomed');
            const idx = parseInt(this.dataset.idx);

            // Pollen sparkles
            const bud = this.querySelector('.flower-icon');
            for (let i = 0; i < 10; i++) {
                const pollen = document.createElement('span');
                pollen.className = 'pollen';
                pollen.style.setProperty('--px', `${(Math.random() - 0.5) * 80}px`);
                pollen.style.setProperty('--py', `${(Math.random() - 0.5) * 80}px`);
                bud.appendChild(pollen);
                setTimeout(() => pollen.remove(), 1000);
            }

            // Show message
            const msgEl = document.querySelector('.flower-msg-text');
            if (msgEl) {
                msgEl.textContent = GARDEN_DATA[idx].msg;
            }
        });
    });
}

/* ============================================
   8. DATE NIGHT DECISION MAKER
   ============================================ */
let DATE_NIGHT_DATA = [
    {
        question: "What's the vibe?",
        options: [
            { icon: "🍕", title: "Pizza & Games", desc: "Cozy night in with board games and pizza" },
            { icon: "🍷", title: "Fancy Wine & Dine", desc: "Dress up and enjoy a candlelit dinner" }
        ]
    },
    {
        question: "What's the activity?",
        options: [
            { icon: "🎬", title: "Movie Night", desc: "A rom-com marathon under the blankets" },
            { icon: "🌃", title: "City Walk", desc: "A moonlit walk through the city streets" }
        ]
    },
    {
        question: "How do we end the night?",
        options: [
            { icon: "🧁", title: "Bake Together", desc: "Make cupcakes and eat the batter" },
            { icon: "⭐", title: "Stargazing", desc: "Lay under the stars and dream big" }
        ]
    }
];

let currentRound = 0;

function initDateNight() {
    const container = document.querySelector('.dn-stage');
    if (!container) return;

    renderRound(0);
}

function renderRound(idx) {
    const container = document.querySelector('.dn-stage');
    if (idx >= DATE_NIGHT_DATA.length) {
        container.innerHTML = `
            <div class="dn-result fade-up">
                <div class="dn-icon">🥂</div>
                <h3>It's a Date!</h3>
                <p>You've planned the perfect evening.</p>
            </div>
        `;
        setTimeout(() => {
            container.querySelector('.dn-result').classList.add('visible');
        }, 100);
        return;
    }

    const round = DATE_NIGHT_DATA[idx];
    container.innerHTML = `
        <div class="dn-card fade-up">
            <h3>${round.question}</h3>
            <div class="dn-options">
                ${round.options.map((opt, i) => `
                    <div class="dn-option" onclick="selectDateOption(${idx}, ${i})">
                        <span class="dn-opt-icon">${opt.icon}</span>
                        <span class="dn-opt-title">${opt.title}</span>
                        <span class="dn-opt-desc">${opt.desc}</span>
                    </div>
                `).join('')}
            </div>
            <div class="dn-progress">Round ${idx + 1} / ${DATE_NIGHT_DATA.length}</div>
        </div>
    `;
    setTimeout(() => {
        container.querySelector('.dn-card').classList.add('visible');
    }, 100);
}

// Global handler for options (needs to be global or attached to window)
window.selectDateOption = (roundIdx, optIdx) => {
    // Animation or logic here
    // Just go next
    currentRound++;
    renderRound(currentRound);
};

/* ============================================
   9. LOVE MATCH: A MEMORY JOURNEY
   ============================================ */
let LM_SYMBOLS = [
    { emoji: '🌹', name: 'Rose' },
    { emoji: '💍', name: 'Ring' },
    { emoji: '💌', name: 'Letter' },
    { emoji: '❤️', name: 'Heart' },
    { emoji: '🥂', name: 'Cheers' },
    { emoji: '🦋', name: 'Butterfly' },
    { emoji: '🌙', name: 'Moon' },
    { emoji: '💎', name: 'Diamond' }
];

let LM_LOVE_NOTES = [
    "You are my sunshine on cloudy days ☀️",
    "I love your laugh more than anything 💕",
    "You make my heart skip a beat 💓",
    "Every moment with you is magic ✨",
    "Your smile lights up my world 🌟",
    "I'm so grateful for you, always 🙏",
    "You are my favorite hello and hardest goodbye 💗",
    "Loving you is the best decision I ever made 💖"
];

let lmCards = [];
let lmFlipped = [];
let lmMatched = 0;
let lmMoves = 0;
let lmLocked = false;
let lmNoteIdx = 0;

function initLoveMatch() {
    const board = document.querySelector('.lm-board');
    if (!board) return;

    createBokeh();
    startLoveMatch();
}

function createBokeh() {
    const container = document.querySelector('.lm-bokeh');
    if (!container) return;
    container.innerHTML = '';

    const colors = [
        'rgba(255, 107, 157, 0.25)',
        'rgba(157, 78, 221, 0.2)',
        'rgba(255, 215, 0, 0.15)',
        'rgba(224, 170, 255, 0.2)',
        'rgba(255, 181, 197, 0.2)'
    ];

    for (let i = 0; i < 20; i++) {
        const dot = document.createElement('div');
        dot.className = 'lm-bokeh-dot';
        const size = 10 + Math.random() * 40;
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.bottom = -(size) + 'px';
        dot.style.background = colors[Math.floor(Math.random() * colors.length)];
        dot.style.animationDuration = (8 + Math.random() * 12) + 's';
        dot.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(dot);
    }
}

function startLoveMatch() {
    const board = document.querySelector('.lm-board');
    if (!board) return;

    // Reset state
    lmFlipped = [];
    lmMatched = 0;
    lmMoves = 0;
    lmLocked = false;
    lmNoteIdx = 0;

    // Create pairs and shuffle
    let pairs = [];
    LM_SYMBOLS.forEach((sym, i) => {
        pairs.push({ id: i, emoji: sym.emoji, name: sym.name });
        pairs.push({ id: i, emoji: sym.emoji, name: sym.name });
    });
    lmCards = shuffleArray(pairs);

    // Update scoreboard
    updateLMScore();

    // Clear love note
    const noteText = document.querySelector('.lm-lovenote-text');
    if (noteText) {
        noteText.classList.remove('show');
        noteText.textContent = '';
    }

    // Render cards with staggered deal animation
    board.innerHTML = lmCards.map((card, i) => `
        <div class="lm-card" data-index="${i}" data-id="${card.id}">
            <div class="lm-card-inner">
                <div class="lm-card-face lm-card-back">
                    <span class="lm-back-heart">💗</span>
                </div>
                <div class="lm-card-face lm-card-front">
                    ${card.emoji}
                </div>
            </div>
        </div>
    `).join('');

    // Staggered deal animation
    const cardEls = board.querySelectorAll('.lm-card');
    cardEls.forEach((card, i) => {
        setTimeout(() => {
            card.classList.add('dealt');
        }, i * 80);
    });

    // Click handlers
    cardEls.forEach(card => {
        card.addEventListener('click', () => handleLMClick(card));
    });
}

function handleLMClick(card) {
    if (lmLocked) return;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    lmFlipped.push(card);

    if (lmFlipped.length === 2) {
        lmLocked = true;
        lmMoves++;
        updateLMScore();

        const [a, b] = lmFlipped;
        const idA = parseInt(a.dataset.id);
        const idB = parseInt(b.dataset.id);

        if (idA === idB) {
            // Match!
            setTimeout(() => {
                a.classList.add('matched');
                b.classList.add('matched');

                // Heart burst on both cards
                burstHearts(a);
                burstHearts(b);

                lmMatched++;
                updateLMScore();

                // Show love note
                showLoveNote();

                lmFlipped = [];
                lmLocked = false;

                // Check win
                if (lmMatched === LM_SYMBOLS.length) {
                    setTimeout(() => triggerLMWin(), 800);
                }
            }, 400);
        } else {
            // No match — shake and flip back
            setTimeout(() => {
                a.classList.add('shake-miss');
                b.classList.add('shake-miss');
                setTimeout(() => {
                    a.classList.remove('flipped', 'shake-miss');
                    b.classList.remove('flipped', 'shake-miss');
                    lmFlipped = [];
                    lmLocked = false;
                }, 500);
            }, 1000);
        }
    }
}

function burstHearts(card) {
    const rect = card.getBoundingClientRect();
    const board = document.querySelector('.lm-board');
    const boardRect = board.getBoundingClientRect();
    const cx = rect.left - boardRect.left + rect.width / 2;
    const cy = rect.top - boardRect.top + rect.height / 2;

    const hearts = ['💕', '❤️', '💗', '💖', '✨'];
    for (let i = 0; i < 8; i++) {
        const h = document.createElement('span');
        h.className = 'lm-heart-burst';
        h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        const angle = (Math.PI * 2 * i) / 8;
        h.style.left = cx + 'px';
        h.style.top = cy + 'px';
        h.style.setProperty('--hx', `${Math.cos(angle) * 50}px`);
        h.style.setProperty('--hy', `${Math.sin(angle) * 50}px`);
        board.appendChild(h);
        setTimeout(() => h.remove(), 800);
    }
}

function showLoveNote() {
    const noteText = document.querySelector('.lm-lovenote-text');
    if (!noteText) return;

    noteText.classList.remove('show');
    setTimeout(() => {
        noteText.textContent = LM_LOVE_NOTES[lmNoteIdx % LM_LOVE_NOTES.length];
        noteText.classList.add('show');
        lmNoteIdx++;
    }, 100);
}

function updateLMScore() {
    const movesEl = document.getElementById('lmMoves');
    const matchesEl = document.getElementById('lmMatches');
    if (movesEl) movesEl.textContent = lmMoves;
    if (matchesEl) matchesEl.textContent = `${lmMatched}/${LM_SYMBOLS.length}`;
}

function triggerLMWin() {
    // Massive confetti
    launchConfetti();
    setTimeout(() => launchConfetti(), 600);

    // Show win overlay
    const overlay = document.getElementById('lmWinOverlay');
    if (overlay) {
        overlay.querySelector('.lm-win-stats').textContent = `You matched all ${LM_SYMBOLS.length} pairs in ${lmMoves} moves! 💕`;
        overlay.classList.add('active');
    }
}

function resetLoveMatch() {
    const overlay = document.getElementById('lmWinOverlay');
    if (overlay) overlay.classList.remove('active');
    setTimeout(() => startLoveMatch(), 400);
}

function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
