// Current Date and Time Display functionality
function displayDateTime() {
    console.log("🕒 Initializing date time display");
    
    const datetimeElement = document.createElement('div');
    datetimeElement.className = 'text-center mt-3 mb-3 text-muted small';
    datetimeElement.id = 'datetime';
    
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
        datetimeElement.textContent = 'Current time: ' + now.toLocaleDateString('en-US', options);
    }
    
    // Initial update and set interval
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Add to page - different placement for different pages
    const heroSection = document.querySelector('.hero');
    const introSection = document.querySelector('#intro');
    
    if (heroSection) {
        // For description.html
        heroSection.parentNode.insertBefore(datetimeElement, heroSection.nextSibling);
        console.log("✅ DateTime added to description page");
    } else if (introSection) {
        // For cartoon.html
        introSection.parentNode.insertBefore(datetimeElement, introSection.nextSibling);
        console.log("✅ DateTime added to cartoon page");
    } else {
        // Fallback
        document.body.prepend(datetimeElement);
        console.log("✅ DateTime added to page (fallback)");
    }
    
    console.log("✅ DateTime display initialized");
}