
const grid = document.querySelector('.grid'); //selects the class
const cellSize = 100; 

function createGrid() {

  //calculates how many cols & rows we need  
  const cols = Math.ceil(window.innerWidth / cellSize);
  const rows = Math.ceil(window.innerHeight / cellSize);

  //set dynamically based the 2 lines before
  grid.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
  grid.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`; 

  grid.innerHTML = '';

  // loop to add cells to fill the grid container
  for (let i = 0; i < cols * rows; i++) {
    const cell = document.createElement('div'); 
    cell.classList.add('cell'); 
    grid.appendChild(cell); 
  }
}

createGrid();
window.addEventListener('resize', createGrid); // will call the function if window is resized
