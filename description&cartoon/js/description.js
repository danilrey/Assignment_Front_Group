// Run after DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  // ===== Sound (no files) via Web Audio =====
  let __audioCtx;
  function playClickTone(freq = 880, durationMs = 120) {
    try {
      __audioCtx = __audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const osc = __audioCtx.createOscillator();
      const gain = __audioCtx.createGain();
      osc.type = "sine"; osc.frequency.value = freq;
      osc.connect(gain); gain.connect(__audioCtx.destination);
      const now = __audioCtx.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.2, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationMs/1000);
      osc.start(now); osc.stop(now + durationMs/1000);
    } catch (e) { console.warn("Audio unavailable:", e); }
  }

  // ===== Objects & Methods (console demo for defense)
  const showInfo = {
    title: "SpongeBob SquarePants",
    creator: "Stephen Hillenburg",
    getInfo() { return `${this.title} was created by ${this.creator}.`; }
  };
  console.log(showInfo.getInfo());

  // ===== Greeting
  const nameInput = document.getElementById("nameInput");
  const greeting = document.getElementById("greeting");
  document.getElementById("sayHiBtn").addEventListener("click", () => {
    const name = nameInput.value.trim();
    greeting.textContent = name ? `Welcome, ${name}!` : "Welcome to the SpongeBob Universe!";
    playClickTone();
  });

  // ===== Theme toggle
  document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("night");
    playClickTone(520, 90);
  });

  // ===== Show time (button)
  const dateTimeEl = document.getElementById("dateTime");
  function updateDateTime() { dateTimeEl.textContent = new Date().toLocaleString(); }
  document.getElementById("showTimeBtn").addEventListener("click", () => { updateDateTime(); playClickTone(660, 90); });
  setInterval(updateDateTime, 1000);

  // ===== Read More
  const readMoreBtn = document.getElementById("readMoreBtn");
  const hiddenText = document.getElementById("hiddenText");
  readMoreBtn.addEventListener("click", () => {
    const show = hiddenText.style.display === "none";
    hiddenText.style.display = show ? "block" : "none";
    hiddenText.classList.toggle("show", show);
    readMoreBtn.textContent = show ? "Read Less" : "Read More";
  });

  // ===== Gallery (attributes)
  const thumbs = document.querySelectorAll(".thumb");
  const mainImage = document.getElementById("mainImage");
  thumbs.forEach(thumb => thumb.addEventListener("click", () => { mainImage.src = thumb.src; playClickTone(740, 80); }));

  // ===== Rating
  const stars = document.querySelectorAll(".star");
  const ratingText = document.getElementById("ratingText");
  stars.forEach((star, i) => {
    star.addEventListener("click", () => {
      stars.forEach((s, idx) => s.style.color = idx <= i ? "gold" : "gray");
      ratingText.textContent = `Your rating: ${i + 1}`;
      playClickTone(440 + i*80, 100);
    });
  });

  // ===== Random Facts (arrays + HOF)
  const facts = [
    "SpongeBob was created by marine biologist Stephen Hillenburg.",
    "Gary meows like a cat 🐌.",
    "Squidward actually has six tentacles.",
    "The Krabby Patty's secret formula is unknown!",
    "SpongeBob lives in a pineapple under the sea."
  ];
  document.getElementById("factBtn").addEventListener("click", () => {
    // higher-order: map to lengths, filter, etc (for defense)
    const longFacts = facts.filter(f => f.length > 35);
    console.log("long facts:", longFacts.map(f => f.length));
    const randomIndex = Math.floor(Math.random() * facts.length);
    document.getElementById("factArea").textContent = facts[randomIndex];
    playClickTone(900, 110);
  });

  // ===== Form (callback)
  document.getElementById("suggestForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const episode = document.getElementById("episode").value.trim();
    const reason = document.getElementById("reason").value.trim();
    const msg = document.getElementById("formMessage");

    const errors = [];
    if (!name) errors.push("Name");
    if (!episode) errors.push("Episode");
    if (!reason) errors.push("Reason");

    if (errors.length) {
      msg.textContent = `⚠️ Please fill: ${errors.join(", ")}`;
      msg.style.color = "red";
    } else {
      msg.textContent = `✅ Thanks, ${name}! Your suggestion for "${episode}" was submitted!`;
      msg.style.color = "green";
      e.target.reset();
      playClickTone(700, 140);
    }
  });

  // Reset form
  document.getElementById("resetBtn").addEventListener("click", () => {
    document.querySelectorAll("#suggestForm input, #suggestForm textarea").forEach(el => el.value = "");
    document.getElementById("formMessage").textContent = "Form cleared.";
  });

  // ===== Switch statement: greeting by time of day
  document.getElementById("checkGreetingBtn").addEventListener("click", () => {
    const h = new Date().getHours();
    let t;
    switch (true) {
      case (h >= 5 && h < 12): t = "Good Morning! 🌞"; break;
      case (h >= 12 && h < 18): t = "Good Afternoon! ☀️"; break;
      case (h >= 18 && h < 22): t = "Good Evening! 🌙"; break;
      default: t = "Hello, Night Owl! 🌜";
    }
    document.getElementById("timeGreeting").textContent = t;
  });

  // ===== Keyboard nav (arrow keys) across top menu
  const menuLinks = Array.from(document.querySelectorAll("#mainMenu .nav-link"));
  let focused = 0;
  menuLinks[focused]?.classList.add("fw-bold");
  document.addEventListener("keydown", (e) => {
    if (!["ArrowLeft","ArrowRight"].includes(e.key)) return;
    e.preventDefault();
    menuLinks[focused]?.classList.remove("fw-bold");
    if (e.key === "ArrowRight") focused = (focused + 1) % menuLinks.length;
    else focused = (focused - 1 + menuLinks.length) % menuLinks.length;
    menuLinks[focused]?.focus();
    menuLinks[focused]?.classList.add("fw-bold");
  });

  // ===== FAQ accordion (simple)
  document.querySelectorAll(".faq-item").forEach((item) => {
    const p = item.querySelector("p");
    if (!p) return;
    p.style.display = "none";
    item.addEventListener("click", () => {
      const show = p.style.display === "none";
      p.style.display = show ? "block" : "none";
      item.classList.toggle("fade-in", show);
    });
  });

  // ===== jQuery Search Highlighting =====
  if (typeof $ !== 'undefined') {
    initSearchHighlighting();
  }
});

// ===== jQuery Search Highlighting Function =====
function initSearchHighlighting() {
    console.log("🔍 Initializing search highlighting");
    
    // Create search box HTML
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
    
    // Insert after hero section
    $('.hero').after(searchHTML);
    
    let currentHighlight = null;
    
    // Search function
    $('#searchBtn').on('click', function() {
        performSearch();
    });
    
    $('#searchInput').on('keypress', function(e) {
        if (e.which === 13) {
            performSearch();
        }
    });
    
    $('#clearSearch').on('click', function() {
        clearHighlight();
    });
    
    function performSearch() {
        const searchTerm = $('#searchInput').val().trim();
        
        if (!searchTerm) {
            showNotification('Please enter a search term', 'warning');
            return;
        }
        
        // Clear previous highlight
        clearHighlight();
        
        // Search in all text content (excluding inputs, buttons, etc.)
        const $searchableElements = $('h1, h2, h3, h4, h5, h6, p, li, .card-text, .faq-item');
        let matchCount = 0;
        
        $searchableElements.each(function() {
            const $element = $(this);
            const originalHTML = $element.data('original-html') || $element.html();
            $element.data('original-html', originalHTML);
            
            // Create regex for case-insensitive search
            const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
            
            if (regex.test(originalHTML)) {
                const highlightedHTML = originalHTML.replace(
                    regex, 
                    '<mark class="search-highlight">$1</mark>'
                );
                $element.html(highlightedHTML);
                matchCount++;
            }
        });
        
        // Update results counter
        if (matchCount > 0) {
            $('#searchResults').html(`<span class="text-success">✓ Found ${matchCount} matches for "${searchTerm}"</span>`);
            showNotification(`Found ${matchCount} matches for "${searchTerm}"`, 'success');
            
            // Scroll to first match
            $('html, body').animate({
                scrollTop: $('.search-highlight').first().offset().top - 100
            }, 500);
        } else {
            $('#searchResults').html(`<span class="text-danger">✗ No matches found for "${searchTerm}"</span>`);
            showNotification(`No matches found for "${searchTerm}"`, 'error');
        }
        
        currentHighlight = searchTerm;
    }
    
    function clearHighlight() {
        if (currentHighlight) {
            $('[data-original-html]').each(function() {
                const $element = $(this);
                const originalHTML = $element.data('original-html');
                $element.html(originalHTML);
            });
            
            $('#searchResults').html('');
            $('#searchInput').val('');
            currentHighlight = null;
            showNotification('Search highlights cleared', 'info');
        }
    }
    
    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    // Simple notification function (reusable)
    function showNotification(message, type = 'info') {
        // Remove existing notification
        $('.custom-notification').remove();
        
        const notification = $(`
            <div class="custom-notification ${type}" style="
                transform: translateX(100%);
            ">
                ${message}
            </div>
        `);
        
        $('body').append(notification);
        
        // Animate in
        setTimeout(() => {
            notification.css('transform', 'translateX(0)');
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.css('transform', 'translateX(100%)');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    console.log("✅ Search highlighting initialized");
}