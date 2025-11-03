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


/* Change background color 
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
*/




// 1) Выбираем контейнер и группу звёзд
const ratingEl = document.getElementById('rating1');
const stars = ratingEl.querySelectorAll('.star'); // querySelectorAll — сразу группу
const hidden = document.getElementById('ratingValue');
const text = document.getElementById('ratingText');

let current = 0; // текущее значение рейтинга

// 2) Функция подсветки до N
function paint(n){
  stars.forEach(star => {
    const v = Number(star.dataset.value);
    star.classList.toggle('filled', v <= n);
  });
}

// 3) Наводка мышью — показываем предпросмотр
stars.forEach(star => {
  star.addEventListener('mouseenter', () => paint(Number(star.dataset.value)));
  star.addEventListener('mouseleave', () => paint(current));
});

// 4) Клик — фиксируем рейтинг
stars.forEach(star => {
  star.addEventListener('click', () => {
    current = Number(star.dataset.value);
    hidden.value = current;                 // можно отправить с формой
    text.textContent = `Your rating: ${current}`;
    paint(current);
  });
});

// Инициал
paint(current);


//changing background color
const image = document.querySelector('header img');
const header = document.querySelector('header');
const colors = ['#f0e68c', '#add8e6', '#90ee90', '#ffb6c1', '#ffa07a', '#c8c8ff'];
const colorsNight = ['#bfb66a', '#7cadbc', '#61b861', '#c88189', '#c57757', '#8a8abf'];
let currentIndex = 0;
header.style.backgroundColor = colors[0];

image.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % colors.length;
    if (document.body.classList.contains('night')) {
        header.style.backgroundColor = colorsNight[currentIndex];
    } else {
        header.style.backgroundColor = colors[currentIndex];
    }
})

// 1) textContent — безопасно вставляет ТЕКСТ (HTML-тэги не работают)
document.getElementById('btnText').addEventListener('click', () => {
  const box = document.getElementById('outText');
  const userValue = '8,2/10'; // имитация «опасной строки»
  box.textContent = `Rating on IMDb: ${userValue}`;
  setMode('textContent');
});

// 2) innerHTML — вставляет РАЗМЕТКУ (используй осторожно; не подставляй сырые пользовательские данные)
document.getElementById('btnHTML').addEventListener('click', () => {
  const box = document.getElementById('outHTML');
  const safeMarkup = `
     Rating on :
    <a href="https://www.ratingraph.com/tv-shows/spongebob-squarepants-ratings-9455/">Rating Graph:</a>
    <strong>7,1/10</strong>
  `;
  box.innerHTML = safeMarkup;
  setMode('innerHTML');
});



// Получаем кнопку и блок с дополнительным текстом
const btn2 = document.getElementById('readMoreBtn');
const moreText = document.querySelector('.card-more');

// Функция для переключения текста
btn2.addEventListener('click', () => {
  // Проверяем, скрыт ли текст
  const isHidden = moreText.style.display === 'none';

  moreText.style.display = isHidden ? 'block' : 'none';

  // Меняем текст на кнопке
  btn2.textContent = isHidden ? 'Hid' : 'Read again';
});


// Функция для получения приветствия в зависимости от времени суток
function getGreeting() {
  const currentHour = new Date().getHours(); // Получаем текущий час
  let greetingMessage;

  if (currentHour >= 6 && currentHour < 12) {
    greetingMessage = "Good Morning, Bikini-Bottom!";
  } else if (currentHour >= 12 && currentHour < 18) {
    greetingMessage = "Good Afternoon , Bikini-Bottom!";
  } else {
    greetingMessage = "Good Night, Bikini-Bottom!";
  }

  return greetingMessage;
}

// Отображаем приветствие в элементе с id="greeting"
document.getElementById("greeting").textContent = getGreeting();




$(document).ready(function() {
  function showNotification(message) {
    const $notification = $("#notification");
    $notification.text(message).fadeIn(400).css("opacity", "1");

    // Fade out after 3 seconds
    setTimeout(() => {
      $notification.fadeOut(400, function() {
        $(this).css("opacity", "0");
      });
    }, 3000);
  } 

  $("#addToCart").click(function() {
    showNotification("🛒 Link is copied!");
  });

  $("#loginSuccess").click(function() {
    showNotification("✅ Picture is downloaded!");
  });

  $("#formSubmit").click(function() {
    showNotification("📤 Form submitted successfully!");
  });
});
