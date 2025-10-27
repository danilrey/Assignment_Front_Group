// Run after DOM loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log("🎬 DOM loaded - initializing cartoon interactive features");

  // ===== Tiny beep (no files)
  let __audioCtx;
  function beep(f = 800, ms = 90) {
    try {
      __audioCtx = __audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const o = __audioCtx.createOscillator();
      const g = __audioCtx.createGain();
      o.type = "sine"; o.frequency.value = f;
      o.connect(g); g.connect(__audioCtx.destination);
      const t = __audioCtx.currentTime;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.2, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + ms / 1000);
      o.start(t); o.stop(t + ms / 1000);
    } catch (e) { console.warn("Audio unavailable:", e); }
  }

  // ===== 1) Rating block injection
  (function initRating() {
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
        s.style.filter = i < n ? "drop-shadow(0 0 10px gold)" : "none";
      });
    }
    function reset() { highlight(0); }

    stars.forEach(star => {
      star.addEventListener("mouseenter", () => highlight(+star.dataset.rating));
      star.addEventListener("mouseleave", () => highlight(current));
      star.addEventListener("click", () => {
        current = +star.dataset.rating;
        highlight(current); beep(520 + current * 80, 100);
        const msgs = ["", "Poor - 1 ⭐", "Fair - 2 ⭐⭐", "Good - 3 ⭐⭐⭐", "Very Good - 4 ⭐⭐⭐⭐", "Excellent - 5 ⭐⭐⭐⭐⭐"];
        feedback.textContent = msgs[current]; feedback.className = "fw-bold text-success";
      });
    });

    document.getElementById("reset-rating")?.addEventListener("click", () => {
      current = 0; reset(); feedback.textContent = "Click on stars to rate"; feedback.className = "text-muted";
    });
  })();

  // ===== 2) Dynamic quotes
  (function initDynamicQuotes() {
    const btnWrap = document.createElement("div");
    btnWrap.className = "text-center mb-4";
    btnWrap.innerHTML = `<button id="update-quotes" class="btn btn-warning btn-lg">🎭 Change Character Quotes</button>`;
    const intro = document.getElementById("intro");
    if (intro) intro.insertAdjacentElement("afterend", btnWrap);

    const quotes = {
      spongebob: [
        "I'm ready! I'm ready!", "The best time to wear a striped sweater is all the time!",
        "F is for friends who do stuff together!"
      ],
      patrick: [
        "Is mayonnaise an instrument?", "The inner machinations of my mind are an enigma.",
        "We should take Bikini Bottom and push it somewhere else!"
      ],
      squidward: [
        "Another day, another migraine.", "I hate everyone equally.",
        "Bold and brash? More like belongs in the trash."
      ]
    };
    let i = 0;
    document.getElementById("update-quotes").addEventListener("click", () => {
      const s = document.querySelector("#spongebob .card-text");
      const p = document.querySelector("#patrick .card-text");
      const q = document.querySelector("#squidward .card-text");
      if (s) s.textContent = `"${quotes.spongebob[i % quotes.spongebob.length]}"`;
      if (p) p.textContent = `"${quotes.patrick[i % quotes.patrick.length]}"`;
      if (q) q.textContent = `"${quotes.squidward[i % quotes.squidward.length]}"`;
      i++; beep(880, 110);
    });
  })();

  // ===== 3) Button → show current time
  (function initTimeButton() {
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
      document.getElementById("time-display").innerHTML = `📅 ${now.toLocaleDateString()}<br>🕒 ${now.toLocaleTimeString()}`;
      beep(640, 100);
    });
  })();

  // ===== 4) Keyboard nav across character cards
  (function initKeyboardNav() {
    const cards = Array.from(document.querySelectorAll(".character-card"));
    if (!cards.length) return;
    let idx = 0;
    document.addEventListener("keydown", (e) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
      e.preventDefault();
      cards.forEach(c => { c.style.borderColor = "#e0e0e0"; c.style.transform = "translateY(0)"; });
      if (e.key === "ArrowRight" || e.key === "ArrowDown") idx = (idx + 1) % cards.length;
      else idx = (idx - 1 + cards.length) % cards.length;
      const cur = cards[idx];
      cur.style.borderColor = "#0b5bd3"; cur.style.transform = "translateY(-10px)";
      cur.scrollIntoView({ behavior: "smooth", block: "center" });
      beep(520, 70);
    });
  })();

  // ===== 5) Favorite form validation + submit
  (function initFavoriteForm() {
    const form = document.querySelector("#favorite form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const selected = form.querySelector('input[name="favorite"]:checked');
      const why = document.getElementById("why").value.trim();
      if (!selected) { alert("Please select a favorite character."); return; }
      if (why && why.length < 5) { alert("Please provide a longer reason (min 5 chars)"); return; }
      alert(`Thanks! Favorite: ${selected.value}${why ? ". Reason: " + why : ""}`);
      form.reset(); beep(720, 110);
    });
  })();

  // ===== 6) Switch-based greeting (augment intro)
  (function timeGreeting() {
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
  })();

  // ===== 7) Smooth scroll for mini-nav
  (function smoothMiniNav() {
    const links = document.querySelectorAll('.mini-nav a[href^="#"]');
    links.forEach(a => a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href');
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
  })();

  // ===== 8) jQuery Scroll Progress Bar =====
  if (typeof $ !== 'undefined') {
    initScrollProgressBar();
  }
});

// ===== jQuery Scroll Progress Bar Function =====
function initScrollProgressBar() {
    console.log("📊 Initializing enhanced scroll progress bar with UX elements");
    
    // Create multiple progress elements
    const progressHTML = `
        <!-- Horizontal Progress Bar -->
        <div id="scrollProgressContainer">
            <div id="scrollProgressBar">
                <div class="progress-shine"></div>
            </div>
        </div>
        
        <!-- Vertical Progress Bar -->
        <div id="verticalProgressContainer">
            <div id="verticalProgressBar"></div>
        </div>
        
        <!-- Section Engagement Dots -->
        <div class="progress-engagement" id="sectionDots">
            <div class="engagement-dot" data-section="Characters" data-target="#characters"></div>
            <div class="engagement-dot" data-section="Rating" data-target="#episode-rating"></div>
            <div class="engagement-dot" data-section="Favorite" data-target="#favorite"></div>
        </div>
        
        <!-- Achievement Badge Container -->
        <div id="achievementContainer"></div>
    `;
    
    $('body').prepend(progressHTML);
    
    const $progressBar = $('#scrollProgressBar');
    const $verticalProgressBar = $('#verticalProgressBar');
    const $sectionDots = $('.engagement-dot');
    
    // Define sections for engagement
    const sections = [
        { id: '#characters', name: 'Main Characters', achievement: '👥 Met the Crew' },
        { id: '#episode-rating', name: 'Episode Rating', achievement: '⭐ Rated Content' },
        { id: '#favorite', name: 'Favorite Character', achievement: '❤️ Picked Favorite' }
    ];
    
    const achievedSections = new Set();
    
    // Update progress on scroll
    $(window).on('scroll', function() {
        const windowHeight = $(window).height();
        const documentHeight = $(document).height();
        const scrollTop = $(window).scrollTop();
        
        const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
        const roundedProgress = Math.min(100, Math.max(0, progress));
        
        // Update both progress bars
        $progressBar.css('width', roundedProgress + '%');
        $verticalProgressBar.css('height', roundedProgress + '%');
        
        // Change gradient based on progress
        updateProgressColor(roundedProgress);
        
        // Update section engagement dots
        updateSectionDots();
        
        // Check for section achievements
        checkSectionAchievements();
        
        // Add celebration for milestones
        checkMilestones(roundedProgress);
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
        $verticalProgressBar.css('background', 'linear-gradient(to bottom, #ff6b6b, #ffd93d, #6bcf7f, #4d96ff, #9d4edd)');
    }
    
    function updateSectionDots() {
        const scrollTop = $(window).scrollTop() + 100;
        
        $sectionDots.each(function() {
            const $dot = $(this);
            const target = $dot.data('target');
            const $targetSection = $(target);
            
            if ($targetSection.length) {
                const sectionTop = $targetSection.offset().top;
                const sectionBottom = sectionTop + $targetSection.outerHeight();
                
                if (scrollTop >= sectionTop && scrollTop <= sectionBottom) {
                    $dot.addClass('active').removeClass('completed');
                } else if (scrollTop > sectionBottom) {
                    $dot.removeClass('active').addClass('completed');
                } else {
                    $dot.removeClass('active completed');
                }
            }
        });
    }
    
    function checkSectionAchievements() {
        sections.forEach(section => {
            const $section = $(section.id);
            if ($section.length && !achievedSections.has(section.id)) {
                const sectionTop = $section.offset().top;
                const scrollTop = $(window).scrollTop() + $(window).height() / 2;
                
                if (scrollTop > sectionTop) {
                    achievedSections.add(section.id);
                    showAchievement(section.achievement);
                }
            }
        });
    }
    
    function checkMilestones(progress) {
        const milestones = [25, 50, 75, 100];
        milestones.forEach(milestone => {
            if (progress >= milestone && progress < milestone + 1) {
                showAchievement(`🎯 ${milestone}% Viewed`);
                $progressBar.addClass('progress-celebration');
                setTimeout(() => {
                    $progressBar.removeClass('progress-celebration');
                }, 1500);
            }
        });
        
        // Final completion
        if (progress >= 99.9) {
            $progressBar.addClass('progress-complete');
            showAchievement('🏆 Page Complete!');
            setTimeout(() => {
                $progressBar.removeClass('progress-complete');
            }, 6000);
        }
    }
    
    function showAchievement(message) {
        const badge = $(`
            <div class="achievement-badge">
                🎉 ${message}
            </div>
        `);
        
        $('#achievementContainer').append(badge);
        
        setTimeout(() => {
            badge.addClass('show');
        }, 100);
        
        setTimeout(() => {
            badge.removeClass('show');
            setTimeout(() => badge.remove(), 500);
        }, 3000);
        
        console.log(`🏆 Achievement: ${message}`);
    }
    
    // Click on dots to scroll to sections
    $sectionDots.on('click', function() {
        const $dot = $(this);
        const target = $dot.data('target');
        const $targetSection = $(target);
        
        if ($targetSection.length) {
            $('html, body').animate({
                scrollTop: $targetSection.offset().top - 80
            }, 800);
        }
    });
    
    // Add hover effect to show percentage
    $('#scrollProgressContainer, #verticalProgressContainer').on('mouseenter', function() {
        showProgressTooltip();
    }).on('mouseleave', function() {
        hideProgressTooltip();
    });
    
    function showProgressTooltip() {
        const scrollTop = $(window).scrollTop();
        const documentHeight = $(document).height();
        const windowHeight = $(window).height();
        const progress = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
        
        const tooltip = $(`
            <div id="progressTooltip">
                📊 Scroll Progress: ${progress}%
                <br>
                <small>Sections: ${achievedSections.size}/${sections.length}</small>
            </div>
        `);
        
        $('body').append(tooltip);
    }
    
    function hideProgressTooltip() {
        $('#progressTooltip').remove();
    }
    
    console.log("✅ Enhanced scroll progress bar with UX elements initialized");
}