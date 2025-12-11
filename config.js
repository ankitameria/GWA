// =============================================
// CONFIGURATION FILE
// Edit these values to customize your campaign
// =============================================

const CONFIG = {
    // Calendly booking link
    calendlyUrl: 'https://calendly.com/ankit-growthwithankit/30min',

    // Webhook URL for lead capture (Make.com / Zapier / n8n)
    webhookUrl: 'YOUR_WEBHOOK_URL_HERE',

    // Source identifier for leads
    leadSource: 'Growth Campaign Landing Page',

    // Online counter settings
    onlineCounter: {
        baseCount: 17,
        variance: 12,
        updateInterval: 5000 // milliseconds
    },

    // Total number of sections (for progress bar)
    totalSections: 8,

    // Stats display (can be updated dynamically via webhook)
    stats: {
        visitors: 847,
        filled: 234,
        callsBooked: 42
    }
};
