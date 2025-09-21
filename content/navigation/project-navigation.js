let currentIndex = 0;

function updateDisplay() {
    const project = projectsData[currentIndex];
    
    const title = document.getElementById('projectTitle');
    const desc = document.getElementById('projectDescription');
    if (title) title.textContent = project.title;
    if (desc) desc.textContent = project.description;
    
    const img = document.getElementById('projectImage');
    if (img) img.src = project.image;
    
    const tech = document.getElementById('projectTechnologies');
    if (tech) {
        tech.innerHTML = project.technologies.map(t => `
            <div class="item">
                <img src="${t.icon}" class="icon">
                <span>${t.name}</span>
            </div>
        `).join('');
    }
    
    const counter = document.getElementById('projectCounter');
    if (counter) counter.textContent = `${currentIndex + 1} / 5`;
}

function next() {
    currentIndex = (currentIndex + 1) % projectsData.length;
    updateDisplay();
}

function prev() {
    currentIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
    updateDisplay();
}

function init() {
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    
    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);
}

window.initializeProjectNavigation = init;
