const colors = ['#f0e68c', '#add8e6', '#90ee90', '#ffb6c1', '#ffa07a', '#c8c8ff'];
const colorsNight = ['#bfb66a', '#7cadbc', '#61b861', '#c88189', '#c57757', '#8a8abf'];
let currentIndex = localStorage.getItem('colorIndex') || 0;
const emailInput = $("input[type='email']")
const submitBtn = $(".submit-btn")
const textarea = $("textarea")

$(document).ready(function() {
    const savedTheme = localStorage.getItem('isNight') === 'true'
    applyTheme(savedTheme)

    //prevent form from submitting
    $("form").submit(function(event) {
        event.preventDefault();
    })

    //night toggler
    const logoImg = $("header img")
    const body = $("body")
    $("#theme-toggle").click(function () {
        const isNight = body.hasClass("night")
        applyTheme(!isNight)
    })

    //form validation
    emailInput.on("input", function() {
        updateSubmitState();
    });

    textarea.on("input", function() {
        updateSubmitState();
    });

    updateSubmitState();

    //pop-up window
    const closeBtn = $(".pop-up-close")
    const popUpAllow = $(".pop-up-btn-allow")
    const popUpDeny = $(".pop-up-btn-deny")
    const popUp = $(".pop-up")
    popUp.hide()

    //submit spinner
    submitBtn.click(function () {
        const $btn = $(this);
        if ($btn.prop("disabled")) return;

        const originalHtml = $btn.html();

        $btn
            .prop("disabled", true)
            .attr("aria-busy", "true")
            .html('<span class="spinner" aria-hidden="true"></span> Wait\u2026');

        setTimeout(function () {
            $btn
                .prop("disabled", false)
                .removeAttr("aria-busy")
                .html(originalHtml);

            popUp.show();
        }, 1500);
    });


    closeBtn.click(function() {
        popUp.hide()
    })

    popUpAllow.click(function() {
        popUpAllow.text("Thanks!")
        setTimeout(function() {
            popUp.hide()
            popUpAllow.text("OK")
        }, 2000)
    })

    popUpDeny.click(function() {
        popUpDeny.text("Sorry!")
        setTimeout(function() {
            popUp.hide()
            popUpDeny.text("No, thanks")
        }, 2000)
    })

    //changing background color
    $('header').css('background-color', savedTheme ? colorsNight[currentIndex] : colors[currentIndex])
    logoImg.click(function() {
        currentIndex = (currentIndex + 1) % colors.length;
        localStorage.setItem('colorIndex', currentIndex)
        const isNight = body.hasClass("night")
        applyTheme(isNight)
    })

    //hide text or read more
    $('span').each(function() {
        $(this).click(function() {
            $('.citation').fadeToggle(600)
        })
    })

    //scroll progress bar
    $(window).scroll(function() {
        const scroll = $(window).scrollTop()
        const maxScroll = $(document).height() - $(window).height()
        const progress = scroll / maxScroll
        $('.progress-bar').css('width', progress * 100 + '%')
    })

    //keyboard handler
}).keydown(function(e) {
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
    const links = $('header a')
    if (index < 0 || index >= links.length) return;
    links.each(function(i, a) {
        a.classList.toggle('active', i === index)
    })
    const domLink = links.get(index)
    if (domLink && typeof domLink.focus === 'function') domLink.focus()
})

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function toggleAudio() {
    const audio = $('audio').get(0)
    try {
        if (audio.paused) {await audio.play();}
        else {
            audio.pause();
            audio.currentTime = 0;
        }
    } catch (e) {console.log('Error playing audio:', e)}
}

function applyTheme(isNight) {
    localStorage.setItem('isNight', isNight)
    $('body').toggleClass('night', isNight)
    $('#theme-toggle').text(isNight ? '☀️' : '🌙')
    const basePath = window.location.hostname.includes('github.io') ? '/Assignment_Front_Group' : '..'
    $('header img').attr('src', isNight ? `${basePath}/assets/gary.png` : `${basePath}/assets/sponge_bob.png`)
    $('header').css('background-color', isNight ? colorsNight[currentIndex] : colors[currentIndex])
}

function updateSubmitState() {
    const emailValid = isValidOrEmpty(emailInput, validateEmail);
    const textValid = isValidOrEmpty(textarea, v => v.length >= 5);

    emailInput.toggleClass('error', !emailValid);
    textarea.toggleClass('error', !textValid);

    if (submitBtn) submitBtn.prop('disabled', !(emailValid && textValid));
}

function isValidOrEmpty($el, validator) {
    const val = ($el.val() || '').trim();
    const required = $el.prop('required') || $el.attr('data-required') === 'true';
    if (!val) return !required;
    return validator ? validator(val) : true;
}