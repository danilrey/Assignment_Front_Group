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

//changing background color
const image = document.querySelector('header img');
const header = document.querySelector('header');
const colors = ['#add8e6', '#90ee90', '#ffb6c1', '#f0e68c', '#ffa07a', '#e6e6fa'];
let currentIndex = 0;

image.addEventListener('click', () => {
    const randomColor = colors[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length;
    header.style.backgroundColor = randomColor;
})

