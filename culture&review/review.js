document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevents page reload
        });
    }
});


//form validation
const emailInput = document.querySelector('.email-form input');
const submitBtn = document.querySelector('.submit-btn');
const textarea = document.querySelector('.feedback-form textarea');
const passWord = document.querySelector('.password');
const fullName = document.querySelector('.fullName');

emailInput.addEventListener('input', () => {
    const email = emailInput.value;
    const isValid = validateEmail(email);
    emailInput.classList.toggle('error', !isValid);
    if (submitBtn) submitBtn.disabled = !isValid;
});

textarea.addEventListener('input', () => {
    const feedback = textarea.value.trim();
    const isValid = feedback.length >= 5;
    textarea.classList.toggle('error', !isValid);
    if (submitBtn) submitBtn.disabled = !isValid;
})

passWord.addEventListener('input', () => {
    const password = passWord.value.trim();
    const isValid = password.length >= 8;
    passWord.classList.toggle('error', !isValid);
    if (submitBtn) submitBtn.disabled = !isValid;
})
fullName.addEventListener('input', () => {
    const namelength = fullName.value.trim();
    const isValid = namelength.length >= 8;
    fullName.classList.toggle('error', !isValid);
    if (submitBtn) submitBtn.disabled = !isValid;
})

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

//pop-up window
const closeBtn = document.querySelector('.pop-up-close');
const popUpAllow = document.querySelector('.pop-up-btn-allow');
const popUpDeny = document.querySelector('.pop-up-btn-deny');
const popUp = document.querySelector('.pop-up');
const popUpContent = document.querySelector('.pop-up-text');

function showPopUp() {
    popUp.classList.add('visible');
}

function hidePopUp() {
    popUp.classList.remove('visible');
}

submitBtn.addEventListener('click', showPopUp);
closeBtn.addEventListener('click', hidePopUp);

popUpAllow.addEventListener('click', () => {
    popUpAllow.textContent = "Thanks!";
    setTimeout( () => {
        hidePopUp();
        popUpAllow.textContent = "OK";
    }, 2000);
});

popUpDeny.addEventListener('click', () => {
    popUpDeny.textContent = "Sorry!";
    setTimeout( () => {
        hidePopUp();
        popUpDeny.textContent = "No, thanks";
    }, 2000);
});


// Change background color
    const bgBtn = document.querySelector('.change-bg-btn');
    const bodyEl = document.body;
    const colors = ['#505050ff', '#ffffffff', '#86ff7eff', '#f0e68c', '#0044ffff'];
    let currentIndex = 0;
    if(bgBtn){
        bgBtn.addEventListener('click', () => {
            bodyEl.style.backgroundColor = colors[currentIndex];
            currentIndex = (currentIndex + 1) % colors.length;
        });
    }
