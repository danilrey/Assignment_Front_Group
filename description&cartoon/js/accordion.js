// Accordion functionality for FAQ section
function initAccordion() {
    console.log("✅ Initializing accordion for FAQ");
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) {
        console.log("❌ No FAQ items found");
        return;
    }
    
    faqItems.forEach((item, index) => {
        const answer = item.querySelector('p');
        if (answer) {
            // Hide answers by default
            answer.style.display = 'none';
            
            // Add click functionality
            item.style.cursor = 'pointer';
            item.addEventListener('click', function() {
                const isVisible = answer.style.display === 'block';
                
                // Toggle visibility with smooth transition
                if (isVisible) {
                    answer.style.display = 'none';
                    item.style.background = '#e6f3ff';
                    console.log(`🔽 FAQ ${index + 1} collapsed`);
                } else {
                    answer.style.display = 'block';
                    item.style.background = '#d4e9ff';
                    console.log(`🔼 FAQ ${index + 1} expanded`);
                }
                
                // Smooth transition effect
                answer.style.transition = 'all 0.3s ease';
            });
            
            console.log(`✅ FAQ item ${index + 1} initialized`);
        }
    });
    
    console.log(`✅ ${faqItems.length} FAQ items initialized`);
}