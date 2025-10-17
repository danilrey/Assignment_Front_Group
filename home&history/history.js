//changing background color
const image = document.querySelector('header img');
const header = document.querySelector('header');
const colors = ['#f0e68c', '#add8e6', '#90ee90', '#ffb6c1', '#ffa07a', '#c8c8ff'];
const colorsNight = ['#bfb66a', '#7cadbc', '#61b861', '#c88189', '#c57757', '#8a8abf'];
let currentIndex = 0;
header.style.backgroundColor = colors[0];
let color = '#c8c8ff'

image.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % colors.length;
    if (document.body.classList.contains('night')) {
        header.style.backgroundColor = colorsNight[currentIndex];
    } else {
        header.style.backgroundColor = colors[currentIndex];
    }
})

//night toggler
const toggleBtn = document.getElementById('theme-toggle');
const logoImg = document.querySelector('header img');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('night');
    const isNight = document.body.classList.contains('night');
    toggleBtn.textContent = isNight ? '☀️' : '🌙';
    logoImg.src = isNight ? '../assets/gary.png' : '../assets/sponge_bob.png';
    header.style.backgroundColor = isNight ? colorsNight[currentIndex] : colors[currentIndex];
});

//hide text
const citation = document.querySelector('.citation');
const quoteSpan = document.querySelectorAll('span');

quoteSpan.forEach(span => {
    span.addEventListener('click', () => {
        if (!citation.classList.contains('visible')) {
            citation.classList.add('visible');
        } else {
            citation.classList.remove('visible');
        }
    });
})

//current date
const date = document.querySelector('.date');
function updateTime() {
    const currentDate = new Date();
    const options = {
        weekday: 'long', year: 'numeric', month: 'long',
        day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'
    };
    date.textContent = currentDate.toLocaleDateString('en-US', options);
}

//audio function
async function toggleAudio() {
    const audio =document.querySelector('audio');
    try {
        if (audio.paused) {await audio.play();}
        else {
            audio.pause();
            audio.currentTime = 0;
        }
    } catch (error) {
        console.error('Error playing audio:', error);
    }
}

//keyboard navigation
document.addEventListener('keydown', (e) => {
    const ae = document.activeElement;
    if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA' || ae.tagName === 'SELECT' || ae.isContentEditable)) return;
    if (e.ctrlKey || e.altKey || e.metaKey || e.repeat) return;

    if (e.key === 'p') {
        e.preventDefault();
        toggleAudio();
        return;
    }

    let index = -1;
    switch (e.key) {
        case '1': index = 0; break;
        case '2': index = 1; break;
        case '3': index = 2; break;
        case '4': index = 3; break;
        case '5': index = 4; break;
        case '6': index = 5; break;
        case '7': index = 6; break;
        case '8': index = 7; break;
        default: return;
    }

    const links = Array.from(document.querySelectorAll('header a'));
    if (index < 0 || index >= links.length) return;

    links.forEach((a, i) => a.classList.toggle('active', i === index));
    links[index].focus();
});

updateTime();
setInterval(updateTime, 1000);

