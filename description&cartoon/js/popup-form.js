// Popup Subscription Form functionality
function createPopupForm() {
    console.log("✅ Initializing popup form");
    
    // Check if popup already exists
    if (document.getElementById('subscribePopup')) {
        console.log("✅ Popup already exists");
        return;
    }
    
    // Create popup HTML structure
    const popupHTML = `
        <div id="subscribePopup" class="popup-overlay" style="display: none;">
            <div class="popup-content">
                <button class="popup-close">&times;</button>
                <h3>Subscribe to SpongeBob Guide!</h3>
                <p>Get updates on new episodes and fun facts!</p>
                <form id="subscribeForm">
                    <div class="mb-3">
                        <label for="popupEmail" class="form-label">Email Address</label>
                        <input type="email" class="form-control" id="popupEmail" required placeholder="your@email.com">
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="newsletter">
                        <label class="form-check-label" for="newsletter">Send me weekly updates</label>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Subscribe</button>
                </form>
            </div>
        </div>
    `;
    
    // Add popup to page
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    
    // Add subscribe button to navbar
    addSubscribeButton();
    
    // Initialize popup functionality
    initPopupFunctionality();
    
    console.log("✅ Popup form created successfully");
}

function addSubscribeButton() {
    const navbarNav = document.querySelector('.navbar-nav');
    if (!navbarNav) {
        console.log("❌ Navbar not found");
        return;
    }
    
    // Check if subscribe button already exists
    if (document.querySelector('.subscribe-btn')) {
        console.log("✅ Subscribe button already exists");
        return;
    }
    
    const subscribeBtn = document.createElement('li');
    subscribeBtn.className = 'nav-item';
    subscribeBtn.innerHTML = '<a class="nav-link subscribe-btn" href="#">Subscribe</a>';
    navbarNav.appendChild(subscribeBtn);
    
    console.log("✅ Subscribe button added to navbar");
}

function initPopupFunctionality() {
    const popup = document.getElementById('subscribePopup');
    const closeBtn = document.querySelector('.popup-close');
    const subscribeBtn = document.querySelector('.subscribe-btn');
    
    if (!popup || !closeBtn || !subscribeBtn) {
        console.log("❌ Popup elements not found");
        return;
    }
    
    // Open popup
    subscribeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        popup.style.display = 'flex';
        console.log("🔼 Popup opened");
    });
    
    // Close popup
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
        console.log("🔽 Popup closed");
    });
    
    // Close when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
            console.log("🔽 Popup closed (outside click)");
        }
    });
    
    // Handle form submission
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('popupEmail').value;
            
            if (validateEmail(email)) {
                alert('Thank you for subscribing!');
                popup.style.display = 'none';
                subscribeForm.reset();
                console.log("✅ Subscription submitted");
            } else {
                alert('Please enter a valid email address.');
                console.log("❌ Invalid email submitted");
            }
        });
    }
    
    console.log("✅ Popup functionality initialized");
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}