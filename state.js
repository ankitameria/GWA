// =============================================
// STATE MANAGEMENT
// Tracks user journey through the funnel
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

// Get current state as object (for form submission)
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

// Reset state (if needed)
function resetState() {
    state.currentSection = 0;
    state.userName = '';
    state.userRole = '';
    state.userPains = [];
    state.userOfferings = [];
    state.otherOffering = '';
    state.userEmail = '';
    state.userPhone = '';
}
