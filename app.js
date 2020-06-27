// Select game grid and define width of the board
const width = 10; // 10 rows * 10 cols
const gameBoard = document.querySelector(".game-grid");
const blocks = []; //store all the blocks on game grid;
const ghostCount = 20; // number of bombs on game grid
let flags = 0; // number of flags placed on the field
let isGameOver = false;
let resultBox = document.querySelector(".result-board");

// Create and append 100 blocks to board
function createBoard() {
  // create an array of ghosts
  const ghostArray = Array(ghostCount).fill("ghost");
  // create an array of valid moves or those that don't have ghosts
  const emptyArray = Array(width * width - ghostCount).fill("valid");

  // concatenate ghost and empty array, into a new array
  // this array helps give blocks their classes

  let gameArray = emptyArray.concat(ghostArray);

  // shuffle game array and assign result to new array
  let shuffledArray = gameArray.sort(() => Math.random() - 0.5);

  for (var i = 0; i < width * width; i++) {
    let block = document.createElement("div");
    block.setAttribute("id", i);
    block.classList.add(shuffledArray[i]);
    gameBoard.appendChild(block);
    blocks.push(block);

    // add event listener for left click
    block.addEventListener("click", function (event) {
      click(block);
    });

    // ctrl & left click handler
    block.oncontextmenu = function (e) {
      e.preventDefault();
      addFlags(block);
    };
  }

  // add number to detect ghosts in surrounding blocks.
  for (let i = 0; i < blocks.length; i++) {
    let total = 0;
    const isLeftEdge = i % width === 0;
    const isRightEdge = i % width === width - 1;

    if (blocks[i].classList.contains("valid")) {
      if (i > 0 && !isLeftEdge && blocks[i - 1].classList.contains("ghost"))
        total++;
      if (
        i > 9 &&
        !isRightEdge &&
        blocks[i + 1 - width].classList.contains("ghost")
      )
        total++;
      if (i > 10 && blocks[i - width].classList.contains("ghost")) total++;
      if (
        i > 11 &&
        !isLeftEdge &&
        blocks[i - 1 - width].classList.contains("ghost")
      )
        total++;
      if (i < 98 && !isRightEdge && blocks[i + 1].classList.contains("ghost"))
        total++;
      if (
        i < 90 &&
        !isLeftEdge &&
        blocks[i - 1 + width].classList.contains("ghost")
      )
        total++;
      if (
        i < 88 &&
        !isRightEdge &&
        blocks[i + 1 + width].classList.contains("ghost")
      )
        total++;
      if (i < 89 && blocks[i + width].classList.contains("ghost")) total++;
      blocks[i].setAttribute("data", total);
    }
  }
}

// run the createboard function
createBoard();

// add lanterns with right click
function addFlags(block) {
  if (isGameOver) return;
  if (!block.classList.contains("checked") && flags < ghostCount) {
    if (!block.classList.contains("flag")) {
      block.classList.add("flag");
      block.style.background = "url('lantern.png')";
      block.style.backgroundRepeat = "no-repeat";
      block.style.backgroundPosition = "center";
      flags++;
      checkForWin();
    } else {
      block.classList.remove("flag");
      block.style.background = "none";
      flags--;
    }
  }
}

// click on square action
function click(block) {
  let blockId = block.id;
  if (isGameOver) return;
  if (block.classList.contains("checked") || block.classList.contains("flag"))
    return;
  if (block.classList.contains("ghost")) {
    gameOver(block);
  } else {
    let total = block.getAttribute("data");
    if (total != 0) {
      block.classList.add("checked");
      block.innerHTML = total;
      return;
    }
    checkSquare(block, blockId);
  }
  block.classList.add("checked");
}

// check the neightbouring square once a square is clicked
function checkSquare(block, blockId) {
  const isLeftEdge = blockId % width === 0;
  const isRightEdge = blockId % width === width - 1;

  setTimeout(() => {
    if (blockId > 0 && !isLeftEdge) {
      const newId = blocks[parseInt(blockId) - 1].id;
      const newBlock = document.getElementById(newId);
      click(newBlock);
    }
    if (blockId > 9 && !isRightEdge) {
      const newId = blocks[parseInt(blockId) + 1 - width].id;
      const newBlock = document.getElementById(newId);
      click(newBlock);
    }
    if (blockId > 10) {
      const newId = blocks[parseInt(blockId - width)].id;
      const newBlock = document.getElementById(newId);
      click(newBlock);
    }
    if (blockId > 11) {
      const newId = blocks[parseInt(blockId) - 1 - width].id;
      const newBlock = document.getElementById(newId);
      click(newBlock);
    }
    if (blockId < 98 && !isRightEdge) {
      const newId = blocks[parseInt(blockId) + 1].id;
      const newBlock = document.getElementById(newId);
      click(newBlock);
    }
    if (blockId < 90 && !isLeftEdge) {
      const newId = blocks[parseInt(blockId) - 1 + width].id;
      const newBlock = document.getElementById(newId);
      click(newBlock);
    }
    if (blockId < 88 && !isRightEdge) {
      const newId = blocks[parseInt(blockId) + 1 + width].id;
      const newBlock = document.getElementById(newId);
      click(newBlock);
    }
    if (blockId < 89) {
      const newId = blocks[parseInt(blockId) + width].id;
      const newBlock = document.getElementById(newId);
      click(newBlock);
    }
  }, 10);
}

// game over function
function gameOver(block) {
  isGameOver = true;
  // show all ghosts
  blocks.forEach((block) => {
    if (block.classList.contains("ghost")) {
      block.style.background = "url('ghost.png')";
      block.style.backgroundRepeat = "no-repeat";
      block.style.backgroundPosition = "center";
      block.classList.remove("ghost");
      block.classList.add("checked");
      resultBox.textContent =
        "The horrors of dark woods got to you. You should restart your journey";
    }
  });
}

// check for win function
function checkForWin() {
  let matches = 0;
  for (let i = 0; i < blocks.length; i++) {
    if (
      blocks[i].classList.contains("flag") &&
      blocks[i].classList.contains("ghost")
    ) {
      matches++;
    }
    if (matches === ghostCount) {
      resultBox.textContent = "You emerged VICTORIOUS from the dark woods!!";
    }
  }
}
