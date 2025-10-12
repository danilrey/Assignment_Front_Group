function createColorChanger() {
    console.log("🎨 Creating color changer");
    
    const colors = ['#ff4444', '#44ff44', '#4444ff', '#ffff44', '#ff44ff', '#44ffff'];
    let currentIndex = 0;
    
    if (document.getElementById('colorChangerBtn')) return;
    
    const colorBtn = document.createElement('button');
    colorBtn.id = 'colorChangerBtn';
    colorBtn.textContent = '🎨 Change Color';
    Object.assign(colorBtn.style, {
        position: 'fixed', bottom: '20px', right: '20px', zIndex: '10000',
        padding: '12px 24px', fontSize: '16px', fontWeight: 'bold',
        borderRadius: '25px', backgroundColor: '#ffc107', border: '3px solid #ff9800',
        color: '#000', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    });
    
    colorBtn.addEventListener('click', function() {
        console.log("Changing to:", colors[currentIndex]);
        
        // СПОСОБ 1: SetAttribute с !important
        document.body.setAttribute('style', 
            `background-color: ${colors[currentIndex]} !important; 
             background-image: none !important;
             transition: background-color 0.5s ease !important;`);
        
        // СПОСОБ 2: Дополнительно через style
        document.body.style.backgroundColor = colors[currentIndex];
        document.body.style.backgroundImage = 'none';
        
        colorBtn.textContent = `🎨 Color ${currentIndex + 1}`;
        currentIndex = (currentIndex + 1) % colors.length;
        
        // Проверка в консоли
        console.log("Actual background:", getComputedStyle(document.body).backgroundColor);
    });
    
    document.body.appendChild(colorBtn);
    console.log("✅ Color button added");
}

document.addEventListener('DOMContentLoaded', createColorChanger);