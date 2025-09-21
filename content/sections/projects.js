// Projects section content
const projectsContent = {
    box1: `
        <div class="project-info">
            <h2 id="projectTitle">${projectsData[0].title}</h2>
            <p id="projectDescription">${projectsData[0].description}</p>
        </div>
    `,
    box2: `
        <div class="project-visual">
            <img id="projectImage" src="${projectsData[0].image}" class="project-image">
            <div class="project-navigation">
                <button id="prevProject" class="nav-btn">‹</button>
                <span id="projectCounter">1 / 5</span>
                <button id="nextProject" class="nav-btn">›</button>
            </div>
        </div>
    `,
    box4: `
        <h3>Technologies Used</h3>
        <div id="projectTechnologies" class="stack">
            ${projectsData[0].technologies.map(tech => `
                <div class="item">
                    <img src="${tech.icon}" class="icon">
                    <span>${tech.name}</span>
                </div>
            `).join('')}
        </div>
    `,
    box5: `
        <h3>...</h3>
        <p>...</p>
    `
};
