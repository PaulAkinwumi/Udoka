/* ===========================
   UDOKA GAME - JAVASCRIPT
   =========================== */

// ===========================
// STATE MANAGEMENT
// ===========================

const gameState = {
    currentPage: 1,
    noClickCount: 0,
    quotesShown: 0,
};

const quotes = [
    "The fear of stepping in can't compare to a lifetime of regret of not trying.",
    "A flower blossoms with a few drops of water; maybe ours will too.",
    "Your smile is my distraction, a privilege to behold.",
    "Your voice is my unwritten song, melodies for my heart.",
    "If words were stars, I'd whisper tonight, but silence a cage I want to break.",
];

// ===========================
// PAGE NAVIGATION
// ===========================

function showPage(pageNumber) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show target page
    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    gameState.currentPage = pageNumber;
}

// ===========================
// PAGE 1: LANDING SCREEN
// ===========================

const landingYesBtn = document.getElementById('landing-yes-btn');
const landingNoBtn = document.getElementById('landing-no-btn');

landingYesBtn.addEventListener('click', () => {
    showPage(2);
});

landingNoBtn.addEventListener('click', () => {
    location.reload();
});

// ===========================
// PAGE 2: USERNAME GATE
// ===========================

const usernameInput = document.getElementById('username-input');
const usernameSubmitBtn = document.getElementById('username-submit-btn');
const usernameError = document.getElementById('username-error');

usernameSubmitBtn.addEventListener('click', validateUsername);
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        validateUsername();
    }
});

function validateUsername() {
    const username = usernameInput.value.trim().toLowerCase();

    if (username === 'akudo') {
        // Correct username - proceed to Page 3
        usernameError.style.display = 'none';
        showPage(3);
    } else {
        // Incorrect username - show error
        usernameError.style.display = 'block';
        usernameInput.value = '';
    }
}

// ===========================
// PAGE 3: QUESTION INTERACTION
// ===========================

const questionYesBtn = document.getElementById('question-yes-btn');
const questionNoBtn = document.getElementById('question-no-btn');
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const noCounter = document.getElementById('no-counter');

questionYesBtn.addEventListener('click', () => {
    showPage(4);
    startPetalAnimation();
});

questionNoBtn.addEventListener('click', handleNoClick);

function handleNoClick() {
    // Check if we've already shown all 5 quotes
    if (gameState.quotesShown < quotes.length) {
        // Show the current quote
        const currentQuote = quotes[gameState.quotesShown];
        quoteText.textContent = currentQuote;
        quoteContainer.style.display = 'block';

        gameState.quotesShown++;
        gameState.noClickCount++;

        // Update Yes button size
        const sizeLevel = Math.min(gameState.noClickCount, 5);
        questionYesBtn.setAttribute('data-size', sizeLevel);
    }
}

// ===========================
// PAGE 4: CELEBRATION SCREEN
// ===========================

function startPetalAnimation() {
    const petalsContainer = document.getElementById('petals-container');
    petalsContainer.innerHTML = ''; // Clear previous petals

    // Create falling petals
    const petalEmojis = ['🌸', '🌹', '💕', '✨'];
    const petalCount = 30; // Number of petals to create

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];

        // Random horizontal position
        const randomLeft = Math.random() * 100;
        petal.style.left = randomLeft + '%';

        // Random animation duration (3-8 seconds)
        const duration = 3 + Math.random() * 5;
        petal.style.animationDuration = duration + 's';

        // Random delay for stagger effect
        const delay = Math.random() * 2;
        petal.style.animationDelay = delay + 's';

        // Randomize horizontal drift
        const driftAmount = (Math.random() - 0.5) * 200;
        petal.style.setProperty('--drift', driftAmount + 'px');

        petalsContainer.appendChild(petal);

        // Create new petals continuously for continuous effect
        if (i % 5 === 0) {
            setTimeout(() => {
                createContinuousPetal(petalsContainer);
            }, duration * 1000);
        }
    }
}

function createContinuousPetal(container) {
    if (gameState.currentPage !== 4) return; // Stop if not on celebration page

    const petalEmojis = ['🌸', '🌹', '💕', '✨'];
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];

    const randomLeft = Math.random() * 100;
    petal.style.left = randomLeft + '%';

    const duration = 5 + Math.random() * 3;
    petal.style.animationDuration = duration + 's';

    const driftAmount = (Math.random() - 0.5) * 200;
    petal.style.setProperty('--drift', driftAmount + 'px');

    container.appendChild(petal);

    // Schedule next petal
    setTimeout(() => {
        createContinuousPetal(container);
    }, 500 + Math.random() * 1000);
}

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Show Page 1 on load
    showPage(1);
    console.log('Udoka Game Initialized');
});
