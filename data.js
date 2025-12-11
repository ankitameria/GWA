// =============================================
// CONTENT DATA FILE
// Edit these values to change copy/content
// =============================================

// Pain points shown based on user's role selection
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

// Role display names for summary
const ROLE_NAMES = {
    founder: "Founder / CEO",
    cmo: "CMO / Marketing Head",
    growth: "Growth Lead",
    hr: "HR / Recruiter",
    media: "Media / Journalist"
};

// Offering display names for summary
const OFFERING_NAMES = {
    gtm: "Build a GTM plan",
    campaign: "Run a campaign",
    team: "Build marketing team",
    fractional: "Fractional CMO",
    consult: "1 hr consultation",
    other: "Something else"
};

// Offerings list (what Ankit can help with)
const OFFERINGS = [
    { id: 'gtm', label: 'Build a GTM plan together' },
    { id: 'campaign', label: 'Run a campaign like this for my brand' },
    { id: 'team', label: 'Hire or build a marketing team' },
    { id: 'fractional', label: 'Fractional CMO / Marketing Lead' },
    { id: 'consult', label: 'Just want to pick your brain (1 hr call)' },
    { id: 'other', label: 'Something else entirely' }
];
