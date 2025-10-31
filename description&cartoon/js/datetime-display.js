// Current Date and Time Display functionality with jQuery
function displayDateTime() {
    console.log("🕒 Initializing date time display with jQuery");
    
    
    const $datetimeElement = $('<div>', {
        class: 'text-center mt-3 mb-3 text-muted small',
        id: 'datetime'
    });
    
    function updateDateTime() {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        $datetimeElement.text('Current time: ' + now.toLocaleDateString('en-US', options));
    }
    
    
    function addButtonHoverEffects() {
        $('button').hover(
            
            function() {
                $(this).css({
                    'background-color': '#ffd700',
                    'color': '#000',
                    'transform': 'scale(1.05)',
                    'transition': 'all 0.3s ease'
                });
            },
            
            function() {
                $(this).css({
                    'background-color': '',
                    'color': '',
                    'transform': 'scale(1)'
                });
            }
        );
    }
    
    
    function addSpecificButtonEffects() {
        
        $('.btn-primary').hover(
            function() {
                $(this).css('background-color', '#0a4eb8');
            },
            function() {
                $(this).css('background-color', '#0b5bd3');
            }
        );
        
        
        $('.btn-warning').hover(
            function() {
                $(this).css('background-color', '#e0a800');
            },
            function() {
                $(this).css('background-color', '#ffc107');
            }
        );
        
        
        $('.btn-info').hover(
            function() {
                $(this).css('background-color', '#138496');
            },
            function() {
                $(this).css('background-color', '#17a2b8');
            }
        );
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    
    const $heroSection = $('.hero');
    const $introSection = $('#intro');
    
    if ($heroSection.length) {
        
        $heroSection.after($datetimeElement);
        console.log("✅ DateTime added to description page");
    } else if ($introSection.length) {
       
        $introSection.after($datetimeElement);
        console.log("✅ DateTime added to cartoon page");
    } else {
        
        $('body').prepend($datetimeElement);
        console.log("✅ DateTime added to page (fallback)");
    }
    
    
    addButtonHoverEffects();
    addSpecificButtonEffects();
    
    console.log("✅ DateTime display and button hover effects initialized");
}


function displayDateTimeWithCSSClasses() {
    console.log("🕒 Initializing date time display with CSS classes");
    
    const $datetimeElement = $('<div>', {
        class: 'text-center mt-3 mb-3 text-muted small',
        id: 'datetime'
    });
    
    function updateDateTime() {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        $datetimeElement.text('Current time: ' + now.toLocaleDateString('en-US', options));
    }
    
    
    function addButtonHoverWithClasses() {
        $('button').hover(
            function() {
                $(this).addClass('button-hover');
            },
            function() {
                $(this).removeClass('button-hover');
            }
        );
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    
    const $heroSection = $('.hero');
    const $introSection = $('#intro');
    
    if ($heroSection.length) {
        $heroSection.after($datetimeElement);
    } else if ($introSection.length) {
        $introSection.after($datetimeElement);
    } else {
        $('body').prepend($datetimeElement);
    }
    
    addButtonHoverWithClasses();
    console.log("✅ DateTime display with CSS hover effects initialized");
}