// Select game grid and define width of the board
const width = 10; // 10 rows * 10 cols
const gameBoard = document.querySelector(".game-grid");
const blocks = []; //store all the blocks on game grid;
const bombCount = 20; // number of bombs on game grid

// Create and append 100 blocks to board
const createBoard = () => {
  // create an array of bombs
  const bombArray = Array(bombCount).fill("bomb");
  // create an array of valid moves or those that don't have bombs
  const emptyArray = Array(width * width - bombCount).fill("valid");

  // concatenate bombs and empty array, into a new array
  // this array helps give blocks their classes

  let gameArray = emptyArray.concat(bombArray);

  // shuffle game array and assign result to new array
  let shuffledArray = gameArray.sort(() => Math.random() - 0.5);

  for (var i = 0; i < width * width; i++) {
    let block = document.createElement("div");
    block.setAttribute("id", i);
    block.classList.add(shuffledArray[i]);
    gameBoard.appendChild(block);
    blocks.push(block);
  }
};

// run the createboard function
createBoard();
