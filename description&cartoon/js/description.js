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
    "The Krabby Patty’s secret formula is unknown!",
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
});



 