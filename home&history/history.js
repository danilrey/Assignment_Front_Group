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

updateTime();
setInterval(updateTime, 1000);

