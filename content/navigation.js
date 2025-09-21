document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.nav-link');
    
    showSection('home');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            
            links.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    function showSection(name) {
        const data = contentData[name];
        if (!data) return;
        
        const boxes = ['.box-1', '.box-2', '.box-4', '.box-5'];
        boxes.forEach(sel => {
            const box = document.querySelector(sel);
            box.classList.remove('animate');
        });
        
        document.querySelector('.box-1').innerHTML = data.box1;
        document.querySelector('.box-2').innerHTML = data.box2;
        document.querySelector('.box-4').innerHTML = data.box4;
        document.querySelector('.box-5').innerHTML = data.box5;
        
        setTimeout(() => {
            boxes.forEach(sel => {
                const box = document.querySelector(sel);
                box.classList.add('animate');
            });
            
            if (name === 'home' && window.initializeWordle) {
                setTimeout(() => window.initializeWordle(), 100);
            }
            
            if (name === 'projects' && window.initializeProjectNavigation) {
                setTimeout(() => window.initializeProjectNavigation(), 100);
            }
        }, 50);
    }
});
