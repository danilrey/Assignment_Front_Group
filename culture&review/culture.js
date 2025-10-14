// Helper: expand panel smoothly
function openPanel(trigger, panel) {
  trigger.setAttribute('aria-expanded', 'true');
  panel.hidden = false;
  panel.classList.add('open');
  // сначала сброс, затем выставляем актуальную высоту
  panel.style.maxHeight = '0px';
  // принудительный reflow, чтобы анимация сработала
  panel.offsetHeight; // eslint-disable-line no-unused-expressions
  panel.style.maxHeight = panel.scrollHeight + 'px';
}

// Helper: collapse panel smoothly
function closePanel(trigger, panel) {
  trigger.setAttribute('aria-expanded', 'false');
  // Анимируем до 0, и только после окончания — hidden=true
  panel.style.maxHeight = panel.scrollHeight + 'px';
  panel.offsetHeight; // reflow
  panel.style.maxHeight = '0px';
  panel.classList.remove('open');
  panel.addEventListener('transitionend', function onEnd(e){
    if (e.propertyName === 'max-height') {
      panel.hidden = true;
      panel.removeEventListener('transitionend', onEnd);
    }
  });
}

function setupAccordion(root){
  const single = root.dataset.accordion === 'single';
  const triggers = root.querySelectorAll('.acc-trigger');

  // Клик мышью
  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const panelId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      const expanded = btn.getAttribute('aria-expanded') === 'true';

      if (single) {
        // Закрываем все, кроме текущего
        root.querySelectorAll('.acc-trigger[aria-expanded="true"]').forEach(openBtn => {
          if (openBtn !== btn) {
            const pid = openBtn.getAttribute('aria-controls');
            closePanel(openBtn, document.getElementById(pid));
          }
        });
      }

      if (expanded) closePanel(btn, panel);
      else openPanel(btn, panel);
    });
  });

  // Актуализируем высоты при ресайзе (чтобы не обрезало контент)
  window.addEventListener('resize', () => {
    root.querySelectorAll('.acc-trigger[aria-expanded="true"]').forEach(btn => {
      const pid = btn.getAttribute('aria-controls');
      const panel = document.getElementById(pid);
      panel.style.maxHeight = panel.scrollHeight + 'px';
    });
  });
}

// Инициализация
document.querySelectorAll('.accordion').forEach(setupAccordion);


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
