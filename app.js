// =============================================
// MAIN APPLICATION LOGIC
// Handles all interactions and navigation
// =============================================

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateOnlineCount();
    setInterval(updateOnlineCount, CONFIG.onlineCounter.updateInterval);
    updateStats();
});

// =============================================
// EVENT LISTENERS
// =============================================

function setupEventListeners() {
    // Section 0: Name input
    setupNameInput();

    // Section 1: Role selection
    setupRoleSelection();

    // Section 2: Pain points (setup happens dynamically)
    document.getElementById('btn-section-2').addEventListener('click', () => goToSection(3));

    // Section 3: The Reveal
    document.getElementById('btn-section-3').addEventListener('click', () => goToSection(4));

    // Section 4: The Why
    document.getElementById('btn-section-4').addEventListener('click', () => goToSection(5));

    // Section 5: Offerings
    setupOfferings();

    // Section 6: Contact details
    setupContactInputs();
}

// =============================================
// SECTION 0: NAME INPUT
// =============================================

function setupNameInput() {
    const nameInput = document.getElementById('userName');
    const btn = document.getElementById('btn-section-0');
    const btnText = document.getElementById('btnText-0');

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
// SECTION 2: PAIN POINTS (Dynamic)
// =============================================

function setupPainPoints() {
    const data = PAIN_POINTS[state.userRole];
    const container = document.getElementById('painPoints');

    // Update text content
    document.getElementById('painIntro').textContent = data.intro;
    document.getElementById('painSubtext').textContent = data.subtext;
    document.getElementById('painQuestion').textContent = data.question;

    // Clear and rebuild pain points
    container.innerHTML = '';
    state.userPains = []; // Reset selections

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

            document.getElementById('btn-section-2').disabled = state.userPains.length === 0;
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

            // Show/hide "other" input
            if (offering === 'other') {
                document.getElementById('otherInput').style.display =
                    item.classList.contains('selected') ? 'block' : 'none';
            }

            btn.disabled = state.userOfferings.length === 0;
        });
    });

    btn.addEventListener('click', () => {
        state.otherOffering = document.getElementById('otherOffering').value;
        goToSection(6);
    });
}

// =============================================
// SECTION 6: CONTACT INPUTS
// =============================================

function setupContactInputs() {
    const emailInput = document.getElementById('userEmail');
    const phoneInput = document.getElementById('userPhone');
    const btn = document.getElementById('btn-section-6');

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
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

    // Show target section
    const targetSection = document.getElementById(`section-${sectionIndex}`);
    targetSection.classList.add('active');

    // Update state
    state.currentSection = sectionIndex;

    // Update progress bar
    const progress = ((sectionIndex + 1) / CONFIG.totalSections) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;

    // Update name displays throughout
    if (state.userName) {
        document.querySelectorAll('[id^="displayName-"]').forEach(el => {
            el.textContent = state.userName;
        });
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Re-trigger animations
    targetSection.querySelectorAll('.text-reveal').forEach((el, i) => {
        el.style.animation = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.animation = `textReveal 0.8s ease forwards ${i * 0.15}s`;
    });
}

// =============================================
// SUMMARY & SUBMISSION
// =============================================

function populateSummary() {
    document.getElementById('summary-name').textContent = state.userName;
    document.getElementById('summary-role').textContent = ROLE_NAMES[state.userRole];
    document.getElementById('summary-pain').textContent = state.userPains.slice(0, 2).join('; ');

    let offerings = state.userOfferings.map(o => OFFERING_NAMES[o]);
    if (state.otherOffering) {
        offerings = offerings.filter(o => o !== 'Something else');
        offerings.push(state.otherOffering);
    }
    document.getElementById('summary-offering').textContent = offerings.join(', ');

    document.getElementById('summary-email').textContent = state.userEmail;
    document.getElementById('summary-phone').textContent = state.userPhone;
}

async function submitLead() {
    const leadData = getLeadData();

    if (CONFIG.webhookUrl === 'YOUR_WEBHOOK_URL_HERE') {
        console.warn('Webhook URL not configured. Lead data:', leadData);
        return;
    }

    try {
        const response = await fetch(CONFIG.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leadData)
        });

        if (response.ok) {
            console.log('Lead submitted successfully');
        }
    } catch (error) {
        console.error('Error submitting lead:', error);
        // Don't block user experience on error
    }
}

// =============================================
// UTILITIES
// =============================================

function updateOnlineCount() {
    const base = CONFIG.onlineCounter.baseCount;
    const variance = Math.floor(Math.random() * CONFIG.onlineCounter.variance) - 3;
    document.getElementById('onlineCount').textContent = base + variance;
}

function updateStats() {
    document.getElementById('stat-visitors').textContent = CONFIG.stats.visitors;
    document.getElementById('stat-filled').textContent = CONFIG.stats.filled;
    document.getElementById('stat-calls').textContent = CONFIG.stats.callsBooked;
}

function openCalendly() {
    window.open(CONFIG.calendlyUrl, '_blank');
}
