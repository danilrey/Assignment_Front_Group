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
});
