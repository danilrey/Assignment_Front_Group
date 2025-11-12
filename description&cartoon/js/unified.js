// ===== MAIN INITIALIZATION FUNCTION =====
function initializeAllFeatures() {
    console.log("🚀 Initializing all SpongeBob features");
    
    // Initialize core features for both pages
    initThemeToggle();
    
    // Check which page we're on and initialize specific features
    if (document.getElementById('readMoreBtn')) {
        // Description page features
        initReadMore();
        initGallery();
        initFacts();
        initForm();
        initSayHi();
        initAccordion();
        console.log("📄 Description page features initialized");
    }
    
    if (document.querySelector('.character-card')) {
        // Cartoon page features
        initCartoonFeatures();
        console.log("🎬 Cartoon page features initialized");
    }
    
    // Initialize jQuery features if available
    if (typeof $ !== 'undefined') {
        initSearchHighlighting();
        initScrollProgressBar();
    }
    
    console.log("🎉 All features initialized successfully!");
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('night');
            console.log(`🌙 Theme changed to: ${document.body.classList.contains('night') ? 'Night' : 'Day'}`);
        });
    }
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('night');
            console.log(`🌙 Theme changed to: ${document.body.classList.contains('night') ? 'Night' : 'Day'}`);
        });
    }
}

// ===== DESCRIPTION PAGE FEATURES =====
function initReadMore() {
    const readMoreBtn = document.getElementById('readMoreBtn');
    const hiddenText = document.getElementById('hiddenText');
    
    if (!readMoreBtn || !hiddenText) return;
    
    readMoreBtn.addEventListener('click', function() {
        const isVisible = hiddenText.style.display === 'block';
        
        if (isVisible) {
            hiddenText.style.display = 'none';
            readMoreBtn.textContent = 'Read More';
        } else {
            hiddenText.style.display = 'block';
            readMoreBtn.textContent = 'Read Less';
        }
    });
}
function initGallery() {
    const thumbs = document.querySelectorAll('.thumb');
    const mainImage = document.getElementById('mainImage');
    
    if (!thumbs.length || !mainImage) return;
    
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            mainImage.src = this.src;
            mainImage.alt = this.alt;
        });
    });
}

function initFacts() {
    const factBtn = document.getElementById('factBtn');
    const factArea = document.getElementById('factArea');
    
    if (!factBtn || !factArea) return;
    
    const facts = [
        "SpongeBob's original name was 'SpongeBoy' but it was already trademarked!",
        "The character of SpongeBob was created by marine biologist Stephen Hillenburg.",
        "SpongeBob's laugh is actually a dolphin sound played backwards.",
        "The Krusty Krab is modeled after a lobster trap.",
        "SpongeBob has won multiple Emmy Awards for Outstanding Children's Animated Program.",
        "Tom Kenny, the voice of SpongeBob, also voices Gary the Snail.",
        "The show first aired on Nickelodeon on May 1, 1999.",
        "SpongeBob's address is 124 Conch Street, Bikini Bottom.",
        "Mr. Krabs' first name is Eugene.",
        "Sandy Cheeks is from Texas and is a squirrel scientist."
    ];
    factBtn.addEventListener('click', function() {
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        factArea.textContent = randomFact;
    });
}

function initForm() {
    const suggestForm = document.getElementById('suggestForm');
    const resetBtn = document.getElementById('resetBtn');
    const formMessage = document.getElementById('formMessage');
    
    if (!suggestForm || !resetBtn || !formMessage) return;
    
    suggestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const episode = document.getElementById('episode').value;
        
        if (name && episode) {
            formMessage.textContent = `Thanks ${name}! We'll check out "${episode}"!`;
            formMessage.style.color = 'green';
        } else {
            formMessage.textContent = 'Please fill in all fields!';
            formMessage.style.color = 'red';
        }
    });
    
    resetBtn.addEventListener('click', function() {
        suggestForm.reset();
        formMessage.textContent = '';
    });
}
function initSayHi() {
    const sayHiBtn = document.getElementById('sayHiBtn');
    const nameInput = document.getElementById('nameInput');
    const greeting = document.getElementById('greeting');
    
    if (!sayHiBtn || !nameInput || !greeting) return;
    
    sayHiBtn.addEventListener('click', function() {
        const name = nameInput.value || 'Friend';
        greeting.textContent = `Ahoy, ${name}! Welcome to Bikini Bottom! 🏖️`;
    });
}

function initAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').classList.remove('active');
                    otherItem.querySelector('.faq-icon').textContent = '➕';
                }
            });
            
            // Toggle current item
            const isActive = item.classList.contains('active');
            
            if (isActive) {
                item.classList.remove('active');
                answer.classList.remove('active');
                icon.textContent = '➕';
            } else {
                item.classList.add('active');
                answer.classList.add('active');
                icon.textContent = '➖';
            }
        });
    });
}

// ===== CARTOON PAGE FEATURES =====
function initCartoonFeatures() {
    // Rating functionality
    initRating();
    
    // Dynamic quotes
    initDynamicQuotes();
    
    // Time button
    initTimeButton();
    
    // Keyboard navigation
    initKeyboardNav();
    
    // Favorite form
    initFavoriteForm();
    
    // Time greeting
    timeGreeting();
    // Smooth scroll for mini-nav
    smoothMiniNav();
}

function initRating() {
    // Check if rating section already exists
    if (document.getElementById('episode-rating')) return;
    
    const ratingHTML = `
        <section class="card p-4 mb-4" id="episode-rating">
            <h2 class="text-center mb-3">Rate Your Favorite Episode</h2>
            <div class="text-center">
                <p class="mb-2">How would you rate "<span id="episode-title">Band Geeks</span>"?</p>
                <div class="rating-stars-container mb-2">
                    <span class="rating-star" data-rating="1">⭐</span>
                    <span class="rating-star" data-rating="2">⭐</span>
                    <span class="rating-star" data-rating="3">⭐</span>
                    <span class="rating-star" data-rating="4">⭐</span>
                    <span class="rating-star" data-rating="5">⭐</span>
                </div>
                <p id="rating-feedback" class="text-muted">Click on stars to rate</p>
                <button id="reset-rating" class="btn btn-outline-secondary btn-sm mt-2">Reset Rating</button>
            </div>
        </section>
    `;
    
    const characters = document.getElementById("characters");
    if (characters) characters.insertAdjacentHTML("afterend", ratingHTML);

    const stars = document.querySelectorAll(".rating-star");
    const feedback = document.getElementById("rating-feedback");
    let current = 0;

    function highlight(n) {
        stars.forEach((s, i) => {
            s.style.opacity = i < n ? "1" : ".6";
            s.style.transform = i < n ? "scale(1.3)" : "scale(1)";
        });
    }

    stars.forEach(star => {
        star.addEventListener("mouseenter", () => highlight(+star.dataset.rating));
        star.addEventListener("mouseleave", () => highlight(current));
        star.addEventListener("click", () => {
            current = +star.dataset.rating;
            highlight(current);
            const msgs = ["", "Poor - 1 ⭐", "Fair - 2 ⭐⭐", "Good - 3 ⭐⭐⭐", "Very Good - 4 ⭐⭐⭐⭐", "Excellent - 5 ⭐⭐⭐⭐⭐"];
            feedback.textContent = msgs[current];
            feedback.className = "fw-bold text-success";
        });
    });

    document.getElementById("reset-rating")?.addEventListener("click", () => {
        current = 0;
        highlight(0);
        feedback.textContent = "Click on stars to rate";
        feedback.className = "text-muted";
    });
}

function initDynamicQuotes() {
    const btnWrap = document.createElement("div");
    btnWrap.className = "text-center mb-4";
    btnWrap.innerHTML = `<button id="update-quotes" class="btn btn-warning btn-lg">🎭 Change Character Quotes</button>`;
    const intro = document.getElementById("intro");
    if (intro) intro.insertAdjacentElement("afterend", btnWrap);
const quotes = {
        spongebob: ["I'm ready! I'm ready!", "The best time to wear a striped sweater is all the time!"],
        patrick: ["Is mayonnaise an instrument?", "The inner machinations of my mind are an enigma."],
        squidward: ["Another day, another migraine.", "I hate everyone equally."]
    };
    
    let i = 0;
    document.getElementById("update-quotes").addEventListener("click", () => {
        const s = document.querySelector("#spongebob .card-text");
        const p = document.querySelector("#patrick .card-text");
        const q = document.querySelector("#squidward .card-text");
        
        if (s) s.textContent = `"${quotes.spongebob[i % quotes.spongebob.length]}"`;
        if (p) p.textContent = `"${quotes.patrick[i % quotes.patrick.length]}"`;
        if (q) q.textContent = `"${quotes.squidward[i % quotes.squidward.length]}"`;
        i++;
    });
}

function initTimeButton() {
    const container = document.getElementById("episode-rating");
    if (!container) return;
    
    const html = `
        <div class="text-center mb-3">
            <button id="show-time" class="btn btn-info">🕒 Show Current Time</button>
            <div id="time-display" class="mt-2 fw-bold text-primary"></div>
        </div>`;
    container.insertAdjacentHTML("afterend", html);
    
    document.getElementById("show-time").addEventListener("click", () => {
        const now = new Date();
        document.getElementById("time-display").innerHTML = 
            `📅 ${now.toLocaleDateString()}<br>🕒 ${now.toLocaleTimeString()}`;
    });
}
function initKeyboardNav() {
    const cards = Array.from(document.querySelectorAll(".character-card"));
    if (!cards.length) return;
    
    let idx = 0;
    document.addEventListener("keydown", (e) => {
        if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
        e.preventDefault();
        
        cards.forEach(c => {
            c.style.borderColor = "#e0e0e0";
            c.style.transform = "translateY(0)";
        });
        
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            idx = (idx + 1) % cards.length;
        } else {
            idx = (idx - 1 + cards.length) % cards.length;
        }
        
        const cur = cards[idx];
        cur.style.borderColor = "#0b5bd3";
        cur.style.transform = "translateY(-10px)";
        cur.scrollIntoView({ behavior: "smooth", block: "center" });
    });
}

function initFavoriteForm() {
    const form = document.querySelector("#favorite form");
    if (!form) return;
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const selected = form.querySelector('input[name="favorite"]:checked');
        const why = document.getElementById("why").value.trim();
        if (!selected) {
            alert("Please select a favorite character.");
            return;
        }
        
        if (why && why.length < 5) {
            alert("Please provide a longer reason (min 5 chars)");
            return;
        }
        
        alert(`Thanks! Favorite: ${selected.value}${why ? ". Reason: " + why : ""}`);
        form.reset();
    });
}

function timeGreeting() {
    const hour = new Date().getHours();
    let text;
    
    switch (true) {
        case (hour >= 5 && hour < 12): text = "Good Morning! 🌞 Ready for SpongeBob?"; break;
        case (hour >= 12 && hour < 18): text = "Good Afternoon! ☀️ Perfect time for adventures!"; break;
        case (hour >= 18 && hour < 22): text = "Good Evening! 🌙 Time to relax with cartoons!"; break;
        default: text = "Hello! 🌜 Late night session?";
    }
    
    const introP = document.querySelector("#intro p");
    if (introP) introP.innerHTML = `<strong>${text}</strong><br>${introP.innerHTML}`;
}
function smoothMiniNav() {
    const links = document.querySelectorAll('.mini-nav a[href^="#"]');
    links.forEach(a => a.addEventListener('click', (e) => {
        e.preventDefault();
        const id = a.getAttribute('href');
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
}

// ===== JQUERY FEATURES =====
function initSearchHighlighting() {
    if (typeof $ === 'undefined') return;
    
    // Only add search to description page
    if (!document.getElementById('readMoreBtn')) return;
    
    const searchHTML = `
        <div class="card p-3 mb-4 search-container">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <h4 class="mb-2">🔍 Search Content</h4>
                    <p class="text-muted small mb-0">Highlight matching words on this page</p>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <input type="text" id="searchInput" class="form-control" placeholder="Enter keyword to highlight...">
                        <button id="searchBtn" class="btn btn-primary">Search</button>
                        <button id="clearSearch" class="btn btn-outline-secondary">Clear</button>
                    </div>
                </div>
            </div>
            <div id="searchResults" class="mt-2 small text-muted"></div>
        </div>
    `;
    
    $('.hero').after(searchHTML);
    
    let currentHighlight = null;
    
    $('#searchBtn').on('click', performSearch);
    $('#searchInput').on('keypress', (e) => { if (e.which === 13) performSearch(); });
    $('#clearSearch').on('click', clearHighlight);
    
    function performSearch() {
        const searchTerm = $('#searchInput').val().trim();
        if (!searchTerm) return;
        
        clearHighlight();
        
        const $searchableElements = $('h1, h2, h3, h4, h5, h6, p, li, .card-text, .faq-item');
        let matchCount = 0;
        
        $searchableElements.each(function() {
            const $element = $(this);
            const originalHTML = $element.data('original-html') || $element.html();
            $element.data('original-html', originalHTML);
            
            const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
            if (regex.test(originalHTML)) {
                const highlightedHTML = originalHTML.replace(regex, '<mark class="search-highlight">$1</mark>');
                $element.html(highlightedHTML);
                matchCount++;
            }
        });
        
        if (matchCount > 0) {
            $('#searchResults').html(`<span class="text-success">✓ Found ${matchCount} matches for "${searchTerm}"</span>`);
            $('html, body').animate({ scrollTop: $('.search-highlight').first().offset().top - 100 }, 500);
        } else {
            $('#searchResults').html(`<span class="text-danger">✗ No matches found for "${searchTerm}"</span>`);
        }
        currentHighlight = searchTerm;
    }

    // ===== THEME TOGGLE WITH LOCAL STORAGE =====
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleBtn = document.getElementById('themeToggle');
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'night') {
        document.body.classList.add('night');
    }
    
    function toggleTheme() {
        document.body.classList.toggle('night');
        const isNight = document.body.classList.contains('night');
        localStorage.setItem('theme', isNight ? 'night' : 'day');
        console.log(`🌙 Theme changed to: ${isNight ? 'Night' : 'Day'}`);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
}
    
    function clearHighlight() {
        if (currentHighlight) {
            $('[data-original-html]').each(function() {
                const $element = $(this);
                $element.html($element.data('original-html'));
            });
            $('#searchResults').html('');
            $('#searchInput').val('');
            currentHighlight = null;
        }
    }
    
    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

function initScrollProgressBar() {
    if (typeof $ === 'undefined') return;
    
    const progressHTML = `
        <div id="scrollProgressContainer">
            <div id="scrollProgressBar"></div>
        </div>
    `;
    
    $('body').prepend(progressHTML);
    
    const $progressBar = $('#scrollProgressBar');
    
    $(window).on('scroll', function() {
        const windowHeight = $(window).height();
        const documentHeight = $(document).height();
        const scrollTop = $(window).scrollTop();
        
        const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
        const roundedProgress = Math.min(100, Math.max(0, progress));
        
        $progressBar.css('width', roundedProgress + '%');
        updateProgressColor(roundedProgress);
    });
     function updateProgressColor(progress) {
        let gradient;
        if (progress < 25) {
            gradient = 'linear-gradient(90deg, #ff6b6b, #ffd93d)';
        } else if (progress < 50) {
            gradient = 'linear-gradient(90deg, #ffd93d, #6bcf7f)';
        } else if (progress < 75) {
            gradient = 'linear-gradient(90deg, #6bcf7f, #4d96ff)';
        } else {
            gradient = 'linear-gradient(90deg, #4d96ff, #9d4edd)';
        }
        $progressBar.css('background', gradient);
    }
}

// ===== START EVERYTHING =====
document.addEventListener('DOMContentLoaded', initializeAllFeatures);
window.addEventListener('load', function() {
    console.log("📦 Window fully loaded");
});