// Form Validation for description.html
function initFormValidation() {
    console.log("✅ Initializing form validation for description page");
    
    const suggestionForm = document.querySelector('.suggestion-form');
    
    if (suggestionForm) {
        suggestionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const episode = document.getElementById('episode').value.trim();
            const reason = document.getElementById('reason').value.trim();
            
            clearErrors();
            
            let isValid = true;
            
            if (name === '') {
                showError('name', 'Please enter your name');
                isValid = false;
            }
            
            if (episode === '') {
                showError('episode', 'Please enter an episode title');
                isValid = false;
            } else if (episode.length < 2) {
                showError('episode', 'Episode title should be at least 2 characters');
                isValid = false;
            }
            
            if (reason === '') {
                showError('reason', 'Please tell us why you recommend this episode');
                isValid = false;
            } else if (reason.length < 10) {
                showError('reason', 'Please provide more details (at least 10 characters)');
                isValid = false;
            }
            
            if (isValid) {
                alert('Thank you for your suggestion! "' + episode + '" has been submitted.');
                suggestionForm.reset();
            }
        });
    }
}

// Form Validation for cartoon.html
function initCharacterFormValidation() {
    console.log("✅ Initializing form validation for cartoon page");
    
    const favoriteForm = document.querySelector('#favorite form');
    
    if (favoriteForm) {
        favoriteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const selectedCharacter = document.querySelector('input[name="favorite"]:checked');
            const whyReason = document.getElementById('why').value.trim();
            
            clearErrors();
            
            let isValid = true;
            
            if (!selectedCharacter) {
                showError('favorite', 'Please select your favorite character');
                isValid = false;
            }
            
            if (whyReason && whyReason.length < 5) {
                showError('why', 'Please provide a longer reason (at least 5 characters)');
                isValid = false;
            }
            
            if (isValid) {
                alert('Thank you! Your favorite character is ' + selectedCharacter.value + 
                      (whyReason ? '. Reason: ' + whyReason : ''));
                favoriteForm.reset();
            }
        });
    }
}

function showError(fieldId, message) {
    let errorDiv;
    
    if (fieldId === 'favorite') {
        const fieldset = document.querySelector('fieldset');
        errorDiv = fieldset.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-danger mt-2 small';
            fieldset.appendChild(errorDiv);
        }
    } else {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.mb-3');
        
        errorDiv = formGroup.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-danger mt-1 small';
            formGroup.appendChild(errorDiv);
        }
        
        field.classList.add('is-invalid');
    }
    
    errorDiv.textContent = message;
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    const invalidFields = document.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => field.classList.remove('is-invalid'));
}