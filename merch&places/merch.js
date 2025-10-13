document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const emailInput = document.querySelector('.email-form input');
    const textarea = document.querySelector('.feedback-form textarea');
    const submitBtn = document.querySelector('.submit-btn');

    const popUp = document.querySelector('.pop-up');
    const closeBtn = document.querySelector('.pop-up-close');
    const popUpAllow = document.querySelector('.pop-up-btn-allow');
    const popUpDeny = document.querySelector('.pop-up-btn-deny');

    if(form && emailInput && textarea && submitBtn){
        form.addEventListener('submit', (e) => e.preventDefault());

        emailInput.addEventListener('input', () => {
            const email = emailInput.value;
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            emailInput.classList.toggle('error', !isValid);
            toggleSubmit();
        });

        textarea.addEventListener('input', () => {
            const feedback = textarea.value.trim();
            const isValid = feedback.length >= 5;
            textarea.classList.toggle('error', !isValid);
            toggleSubmit();
        });

        function toggleSubmit() {
            const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
            const feedbackValid = textarea.value.trim().length >= 5;
            submitBtn.disabled = !(emailValid && feedbackValid);
        }
    }

    if(submitBtn && popUp){
        submitBtn.addEventListener('click', () => popUp.classList.add('visible'));
    }
    if(closeBtn && popUp){
        closeBtn.addEventListener('click', () => popUp.classList.remove('visible'));
    }
    if(popUpAllow && popUp){
        popUpAllow.addEventListener('click', () => {
            popUpAllow.textContent = "Thanks!";
            setTimeout(() => {
                popUp.classList.remove('visible');
                popUpAllow.textContent = "OK";
            }, 2000);
        });
    }
    if(popUpDeny && popUp){
        popUpDeny.addEventListener('click', () => {
            popUpDeny.textContent = "Sorry!";
            setTimeout(() => {
                popUp.classList.remove('visible');
                popUpDeny.textContent = "No, thanks";
            }, 2000);
        });
    }

    // Accordion
    const accordionTitles = document.querySelectorAll('.accordion-title');
    if(accordionTitles.length){
        accordionTitles.forEach(title => {
            title.addEventListener('click', () => {
                title.parentElement.classList.toggle('active');
            });
        });
    }

    // Popup subscription
    const openPopupBtn = document.querySelector('.open-popup-btn');
    const popupForm = document.querySelector('.popup-form');
    const popupClose = document.querySelector('.popup-close');
    const popupInnerForm = document.querySelector('.popup-inner-form');

    if(openPopupBtn && popupForm){
        openPopupBtn.addEventListener('click', () => popupForm.classList.add('active'));
    }
    if(popupClose && popupForm){
        popupClose.addEventListener('click', () => popupForm.classList.remove('active'));
    }
    if(popupForm){
        window.addEventListener('click', (e) => {
            if(e.target === popupForm){
                popupForm.classList.remove('active');
            }
        });
    }
    if(popupInnerForm && popupForm){
        popupInnerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for subscribing!');
            popupForm.classList.remove('active');
        });
    }

    // Change background color
    const bgBtn = document.querySelector('.change-bg-btn');
    const bodyEl = document.body;
    const colors = ['#add8e6', '#90ee90', '#ffb6c1', '#f0e68c', '#ffa07a', '#e6e6fa'];
    let currentIndex = 0;
    if(bgBtn){
        bgBtn.addEventListener('click', () => {
            bodyEl.style.backgroundColor = colors[currentIndex];
            currentIndex = (currentIndex + 1) % colors.length;
        });
    }
});
