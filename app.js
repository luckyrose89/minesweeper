// Select game grid and define width of the board
const width = 10; // 10 rows * 10 cols
const gameBoard = document.querySelector(".game-grid");
const blocks = []; //store all the blocks on game grid;
const bombCount = 20; // number of bombs on game grid

// Create and append 100 blocks to board
const createBoard = () => {
  // create an array of ghosts
  const ghostArray = Array(bombCount).fill("ghost");
  // create an array of valid moves or those that don't have ghosts
  const emptyArray = Array(width * width - bombCount).fill("valid");

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
  }

  // add number to detect ghosts in surrounding blocks.
  for (let i = 0; i < blocks.length; i++) {
    let total = 0;
    //check for left edge (hint: all left edge numbers are divisible by 10)
    const isLeftEdge = i % width === 0;
    //check for right edge (hint: all right edge no. give a remainder of 9 when divided by 10)
    const isRightEdge = i % width === width - 1;

    // check valid blocks
    if (blocks[i].classList.contains("valid")) {
      if (i > 0 && !isLeftEdge && blocks[i - 1].classList.contains("bomb"))
        total++;
      if (
        i > 9 &&
        !isRightEdge &&
        blocks[i + 1 - width].classList.contains("bomb")
      )
        total++;
      if (i > 10 && blocks[i - width].classList.contains("bomb")) total++;
      if (
        i > 11 &&
        !isLeftEdge &&
        blocks[i - 1 - width].classList.contains("bomb")
      )
        total++;
      if (i < 98 && !isRightEdge && blocks[i + 1].classList.contains("bomb"))
        total++;
      if (
        i < 90 &&
        !isLeftEdge &&
        blocks[i - 1 + width].classList.contains("bomb")
      )
        total++;
      if (
        i < 88 &&
        !isRightEdge &&
        blocks[i + 1 + width].classList.contains("bomb")
      )
        total++;
      if (i < 89 && blocks[i + width].classList.contains("bomb")) total++;
      blocks[i].setAttribute("data", total);
    }
  }
};

// run the createboard function
createBoard();

// click on square action
function click(block) {
  if (block.classList.contains("ghost")) {
    alert("game over");
  }
}
