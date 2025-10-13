document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const emailInput = document.querySelector('.email-form input');
    const textarea = document.querySelector('.feedback-form textarea');
    const submitBtn = document.querySelector('.submit-btn');

    const popUp = document.querySelector('.pop-up');
    const closeBtn = document.querySelector('.pop-up-close');
    const popUpAllow = document.querySelector('.pop-up-btn-allow');
    const popUpDeny = document.querySelector('.pop-up-btn-deny');

    // Отключаем стандартную отправку формы
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    // Проверка email
    emailInput.addEventListener('input', () => {
        const email = emailInput.value;
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        emailInput.classList.toggle('error', !isValid);
        toggleSubmit();
    });

    // Проверка текста
    textarea.addEventListener('input', () => {
        const feedback = textarea.value.trim();
        const isValid = feedback.length >= 5;
        textarea.classList.toggle('error', !isValid);
        toggleSubmit();
    });

    // Включение кнопки отправки только при валидных данных
    function toggleSubmit() {
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
        const feedbackValid = textarea.value.trim().length >= 5;
        submitBtn.disabled = !(emailValid && feedbackValid);
    }

    // Поп-ап показывается по клику на Send
    submitBtn.addEventListener('click', () => {
        popUp.classList.add('visible');
    });

    // Закрытие поп-апа
    closeBtn.addEventListener('click', () => {
        popUp.classList.remove('visible');
    });

    // Обработка кнопок внутри поп-апа
    popUpAllow.addEventListener('click', () => {
        popUpAllow.textContent = "Thanks!";
        setTimeout(() => {
            popUp.classList.remove('visible');
            popUpAllow.textContent = "OK";
        }, 2000);
    });

    popUpDeny.addEventListener('click', () => {
        popUpDeny.textContent = "Sorry!";
        setTimeout(() => {
            popUp.classList.remove('visible');
            popUpDeny.textContent = "No, thanks";
        }, 2000);
    });
});

// Accordion functionality
const accordionTitles = document.querySelectorAll('.accordion-title');

accordionTitles.forEach(title => {
    title.addEventListener('click', () => {
        const parent = title.parentElement;

        // Переключаем активный класс
        parent.classList.toggle('active');
    });
});

// Popup subscription form
const openPopupBtn = document.querySelector('.open-popup-btn');
const popupForm = document.querySelector('.popup-form');
const popupClose = document.querySelector('.popup-close');

// Открываем попап по кнопке
openPopupBtn.addEventListener('click', () => {
    popupForm.classList.add('active');
});

// Закрываем попап по крестику
popupClose.addEventListener('click', () => {
    popupForm.classList.remove('active');
});

// Закрываем по клику вне формы
window.addEventListener('click', (e) => {
    if (e.target === popupForm) {
        popupForm.classList.remove('active');
    }
});

// Отправка формы
const popupInnerForm = document.querySelector('.popup-inner-form');
popupInnerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    popupForm.classList.remove('active');
});


// Change backg col
const changeBgBtn = document.querySelector('.change-bg-btn');
const colors = ['#add8e6', '#90ee90', '#ffb6c1', '#f0e68c', '#ffa07a', '#e6e6fa'];
let currentIndex = 0;

changeBgBtn.addEventListener('click', () => {
    document.body.style.backgroundColor = colors[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length; // циклическая смена типо
});
