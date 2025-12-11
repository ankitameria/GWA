// =============================================
// GROWTH WITH ANKIT - COMPLETE JS (with Keypad)
// =============================================

// =============================================
// CONFIG - Edit these values
// =============================================

const CONFIG = {
    calendlyUrl: 'https://calendly.com/ankit-growthwithankit/30min',
    webhookUrl: 'https://hook.eu1.make.com/ic680eywr6mf9loq4h1xfoujlsxhup5g',
    leadSource: 'Growth Campaign Landing Page',
    onlineCounter: {
        baseCount: 17,
        variance: 12,
        updateInterval: 5000
    },
    totalSections: 8,
    stats: {
        visitors: 847,
        filled: 234,
        callsBooked: 42
    }
};

// =============================================
// CONTENT DATA
// =============================================

const PAIN_POINTS = {
    founder: {
        intro: "building a company is one thing.",
        subtext: "Getting the world to notice? That's another war.",
        question: "Which of these keeps you up?",
        points: [
            "We have a great product but no one knows.",
            "Tried agencies. Burned budget. Nothing moved.",
            "I need marketing leadership but can't afford a full-time CMO.",
            "We're growing but it's chaos. No system.",
            "Honestly? I don't know what I don't know."
        ]
    },
    cmo: {
        intro: "you already know what good looks like.",
        subtext: "The problem isn't ideas. It's bandwidth. Or buy-in. Or both.",
        question: "What's the real blocker right now?",
        points: [
            "Need an extra brain for strategy, not execution.",
            "Team's stretched. Need a force multiplier.",
            "Big initiative coming. Need outside firepower.",
            "Internal politics. Need someone with no baggage.",
            "Just want to talk to someone who gets it."
        ]
    },
    growth: {
        intro: "growth is fun until it's not.",
        subtext: "Channels dry up. CAC creeps. Leadership wants \"more.\"",
        question: "Where are you stuck?",
        points: [
            "What worked last quarter isn't working now.",
            "Need help thinking beyond paid ads.",
            "Boss wants a plan. I need a thought partner.",
            "We're scaling but the foundation is shaky.",
            "Just exploring. Curious what's out there."
        ]
    },
    hr: {
        intro: "looking for marketing talent?",
        subtext: "Or evaluating if you even need a full-time hire?",
        question: "What's the situation?",
        points: [
            "Hiring a CMO / Head of Marketing.",
            "Wondering if fractional makes more sense.",
            "Building a marketing team from scratch.",
            "Just doing research on who's out there."
        ]
    },
    media: {
        intro: "welcome.",
        subtext: "Probably here for a story, not a service.",
        question: "What's the angle?",
        points: [
            "Covering the future of work / fractional talent.",
            "Interested in this campaign itself.",
            "Just curious who's behind this."
        ]
    }
};

const ROLE_NAMES = {
    founder: "Founder / CEO",
    cmo: "CMO / Marketing Head",
    growth: "Growth Lead",
    hr: "HR / Recruiter",
    media: "Media / Journalist"
};

const OFFERING_NAMES = {
    gtm: "Build a GTM plan",
    campaign: "Run a campaign",
    team: "Build marketing team",
    fractional: "Fractional CMO",
    consult: "1 hr consultation",
    other: "Something else"
};

// =============================================
// STATE MANAGEMENT
// =============================================

const state = {
    currentSection: 0,
    userName: '',
    userRole: '',
    userPains: [],
    userOfferings: [],
    otherOffering: '',
    userEmail: '',
    userPhone: ''
};

function getLeadData() {
    return {
        timestamp: new Date().toISOString(),
        name: state.userName,
        role: ROLE_NAMES[state.userRole] || state.userRole,
        pains: state.userPains.join('; '),
        offerings: state.userOfferings.map(o => OFFERING_NAMES[o] || o).join(', '),
        otherOffering: state.otherOffering,
        email: state.userEmail,
        phone: state.userPhone,
        source: CONFIG.leadSource
    };
}

// =============================================
// INITIALIZATION
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateOnlineCount();
    setInterval(updateOnlineCount, CONFIG.onlineCounter.updateInterval);
    updateStats();
    setupKeypad();
});

// =============================================
// EVENT LISTENERS
// =============================================

function setupEventListeners() {
    setupNameInput();
    setupRoleSelection();

    document.getElementById('btn-section-2').addEventListener('click', () => goToSection(3));
    document.getElementById('btn-section-3').addEventListener('click', () => goToSection(4));
    document.getElementById('btn-section-4').addEventListener('click', () => goToSection(5));

    setupOfferings();
    setupContactInputs();
}

// =============================================
// SECTION 0: NAME INPUT
// =============================================

function setupNameInput() {
    const nameInput = document.getElementById('userName');
    const btn = document.getElementById('btn-section-0');
    const btnText = document.getElementById('btnText-0');

    if (nameInput) nameInput.focus();

    nameInput.addEventListener('input', (e) => {
        state.userName = e.target.value.trim();

        if (state.userName) {
            btn.disabled = false;
            btnText.textContent = `Nice to meet you, ${state.userName}`;
        } else {
            btn.disabled = true;
            btnText.textContent = "Let's go";
        }
    });

    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && state.userName) {
            goToSection(1);
        }
    });

    btn.addEventListener('click', () => goToSection(1));
}

// =============================================
// SECTION 1: ROLE SELECTION
// =============================================

function setupRoleSelection() {
    const roleCards = document.querySelectorAll('.role-card');
    const btn = document.getElementById('btn-section-1');

    roleCards.forEach(card => {
        card.addEventListener('click', () => {
            roleCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            state.userRole = card.dataset.role;
            btn.disabled = false;
        });
    });

    btn.addEventListener('click', () => {
        setupPainPoints();
        goToSection(2);
    });
}

// =============================================
// SECTION 2: PAIN POINTS
// =============================================

function setupPainPoints() {
    const data = PAIN_POINTS[state.userRole];
    const container = document.getElementById('painPoints');

    if (!data || !container) return;

    document.getElementById('painIntro').textContent = data.intro;
    document.getElementById('painSubtext').textContent = data.subtext;
    document.getElementById('painQuestion').textContent = data.question;

    container.innerHTML = '';
    state.userPains = [];

    data.points.forEach((point, index) => {
        const item = document.createElement('div');
        item.className = 'checkbox-item';
        item.dataset.pain = index;
        item.innerHTML = `
            <div class="checkbox-box">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7L5.5 10.5L12 3.5" stroke="#0a0a0a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <span class="checkbox-label">${point}</span>
        `;

        item.addEventListener('click', () => {
            item.classList.toggle('selected');

            if (item.classList.contains('selected')) {
                if (!state.userPains.includes(point)) {
                    state.userPains.push(point);
                }
            } else {
                state.userPains = state.userPains.filter(p => p !== point);
            }

            const btn = document.getElementById('btn-section-2');
            if (btn) btn.disabled = state.userPains.length === 0;
        });

        container.appendChild(item);
    });
}

// =============================================
// SECTION 5: OFFERINGS
// =============================================

function setupOfferings() {
    const items = document.querySelectorAll('#offeringsGroup .checkbox-item');
    const btn = document.getElementById('btn-section-5');

    items.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('selected');
            const offering = item.dataset.offering;

            if (item.classList.contains('selected')) {
                if (!state.userOfferings.includes(offering)) {
                    state.userOfferings.push(offering);
                }
            } else {
                state.userOfferings = state.userOfferings.filter(o => o !== offering);
            }

            if (offering === 'other') {
                const otherBox = document.getElementById('otherInput');
                if (otherBox) {
                    otherBox.style.display = item.classList.contains('selected') ? 'block' : 'none';
                }
            }

            if (btn) btn.disabled = state.userOfferings.length === 0;
        });
    });

    if (btn) {
        btn.addEventListener('click', () => {
            const otherVal = document.getElementById('otherOffering');
            state.otherOffering = otherVal ? otherVal.value.trim() : '';
            goToSection(6);
        });
    }
}

// =============================================
// SECTION 6: CONTACT INPUTS
// =============================================

function setupContactInputs() {
    const emailInput = document.getElementById('userEmail');
    const phoneInput = document.getElementById('userPhone');
    const btn = document.getElementById('btn-section-6');

    if (!emailInput || !phoneInput || !btn) return;

    const validateContact = () => {
        state.userEmail = emailInput.value.trim();
        state.userPhone = phoneInput.value.trim();
        btn.disabled = !(state.userEmail && state.userPhone);
    };

    emailInput.addEventListener('input', validateContact);
    phoneInput.addEventListener('input', validateContact);

    btn.addEventListener('click', async () => {
        populateSummary();
        await submitLead();
        goToSection(7);
    });
}

// =============================================
// NAVIGATION
// =============================================

function goToSection(sectionIndex) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

    const targetSection = document.getElementById(`section-${sectionIndex}`);
    if (!targetSection) return;

    targetSection.classList.add('active');

    state.currentSection = sectionIndex;

    const progress = ((sectionIndex + 1) / CONFIG.totalSections) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) progressBar.style.width = `${progress}%`;

    if (state.userName) {
        document.querySelectorAll('[id^="displayName-"]').forEach(el => {
            el.textContent = state.userName;
        });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    targetSection.querySelectorAll('.text-reveal').forEach((el, i) => {
        el.style.animation = 'none';
        // trigger reflow
        void el.offsetHeight;
        el.style.animation = `textReveal 0.8s ease forwards ${i * 0.15}s`;
    });

    // focus email when arriving at contact section
    if (sectionIndex === 6) {
        setTimeout(() => {
            const email = document.getElementById('userEmail');
            if (email) email.focus();
        }, 350);
    }
}

// =============================================
// SUMMARY & SUBMISSION
// =============================================

function populateSummary() {
    const nameEl = document.getElementById('summary-name');
    const roleEl = document.getElementById('summary-role');
    const painEl = document.getElementById('summary-pain');
    const offeringEl = document.getElementById('summary-offering');
    const emailEl = document.getElementById('summary-email');
    const phoneEl = document.getElementById('summary-phone');

    if (nameEl) nameEl.textContent = state.userName;
    if (roleEl) roleEl.textContent = ROLE_NAMES[state.userRole] || state.userRole;
    if (painEl) painEl.textContent = state.userPains.slice(0, 2).join('; ');

    let offerings = state.userOfferings.map(o => OFFERING_NAMES[o]);
    if (state.otherOffering) {
        offerings = offerings.filter(o => o !== 'Something else');
        offerings.push(state.otherOffering);
    }
    if (offeringEl) offeringEl.textContent = offerings.join(', ');
    if (emailEl) emailEl.textContent = state.userEmail;
    if (phoneEl) phoneEl.textContent = state.userPhone;
}

async function submitLead() {
    const leadData = getLeadData();

    // Prevent attempting to send if webhook not configured
    if (CONFIG.webhookUrl === 'YOUR_WEBHOOK_URL_HERE' || !CONFIG.webhookUrl) {
        console.warn('Webhook URL not configured. Lead data:', leadData);
        return;
    }

    try {
        const response = await fetch(CONFIG.webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
        });

        if (response.ok) {
            console.log('Lead submitted successfully');

            // Optional: GA4 event (if you have added gtag.js)
            if (window.gtag && typeof gtag === 'function') {
                try { gtag('event', 'lead_submitted', { method: 'landing_page' }); } catch(e){/*ignore*/ }
            }

            // Optional: Meta Pixel event (if you have fbq installed)
            if (window.fbq && typeof fbq === 'function') {
                try { fbq('track', 'Lead'); } catch(e){/*ignore*/ }
            }
        } else {
            console.warn('Lead submit returned non-OK response', response.status);
        }
    } catch (error) {
        console.error('Error submitting lead:', error);
    }
}

// =============================================
// UTILITIES
// =============================================

function updateOnlineCount() {
    const base = CONFIG.onlineCounter.baseCount;
    const variance = Math.floor(Math.random() * CONFIG.onlineCounter.variance) - 3;
    const el = document.getElementById('onlineCount');
    if (el) el.textContent = base + variance;
}

function updateStats() {
    const v = document.getElementById('stat-visitors');
    const f = document.getElementById('stat-filled');
    const c = document.getElementById('stat-calls');

    if (v) v.textContent = CONFIG.stats.visitors;
    if (f) f.textContent = CONFIG.stats.filled;
    if (c) c.textContent = CONFIG.stats.callsBooked;
}

function openCalendly() {
    window.open(CONFIG.calendlyUrl, '_blank');
}

// =============================================
// 3D KEYPAD
// =============================================

function setupKeypad() {
    const keypad = document.querySelector('.keypad');
    if (!keypad || window.innerWidth <= 900) return;

    // Audio
    const clickAudio = new Audio('https://cdn.freesound.org/previews/378/378085_6260145-lq.mp3');
    clickAudio.volume = 0.3;

    const keys = {
        one: { element: document.querySelector('#key-one'), key: 'g' },
        two: { element: document.querySelector('#key-two'), key: '0' },
        three: { element: document.querySelector('#key-three'), key: 'Enter' }
    };

    // Click sounds
    Object.values(keys).forEach(keyConfig => {
        if (keyConfig.element) {
            keyConfig.element.addEventListener('pointerdown', () => {
                clickAudio.currentTime = 0;
                clickAudio.play().catch(() => {});
            });

            // Key three = proceed
            if (keyConfig.element.id === 'key-three') {
                keyConfig.element.addEventListener('click', () => {
                    const nameInput = document.getElementById('userName');
                    if (nameInput && nameInput.value.trim()) {
                        goToSection(1);
                    } else if (nameInput) {
                        nameInput.focus();
                        nameInput.classList.add('shake');
                        setTimeout(() => nameInput.classList.remove('shake'), 500);
                    }
                });
            }
        }
    });

    // Keyboard bindings
    window.addEventListener('keydown', (event) => {
        Object.values(keys).forEach(keyConfig => {
            if (keyConfig.element && event.key.toLowerCase() === String(keyConfig.key).toLowerCase()) {
                keyConfig.element.dataset.pressed = 'true';
                clickAudio.currentTime = 0;
                clickAudio.play().catch(() => {});
            }
        });
    });

    window.addEventListener('keyup', (event) => {
        Object.values(keys).forEach(keyConfig => {
            if (keyConfig.element && event.key.toLowerCase() === String(keyConfig.key).toLowerCase()) {
                keyConfig.element.dataset.pressed = 'false';
            }
        });
    });

    // Show keypad
    setTimeout(() => {
        keypad.style.opacity = '1';
    }, 500);
}

// Shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
    }
    .shake {
        animation: shake 0.5s ease;
        border-color: #ff5757 !important;
    }
`;
document.head.appendChild(shakeStyle);