const winningMove = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

export const checkWinner = (grid) => {
  for (const combination of winningMove) {
    const [a, b, c] = combination;
    if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
      return grid[a];
    }
  }
  return null;
};

export const randomIndex = (trackIndex) => {
  const availableIndex = availableMoves(trackIndex);
  if (availableIndex.length === 0) return null; // No moves left
  const random = Math.floor(Math.random() * availableIndex.length);
  return availableIndex[random];
};

const availableMoves = (grid) => {
  return grid
    .map((cell, index) => (cell === null ? index : null))
    .filter((cell) => cell !== null);
};
const evaluateBoard = (grid) => {
  let score = 0;

  for (const combination of winningMove) {
    const [a, b, c] = combination;
    const line = [grid[a], grid[b], grid[c]];

    // Scoring based on AI and player moves
    const aiCount = line.filter((cell) => cell === "O").length;
    const playerCount = line.filter((cell) => cell === "X").length;
    const emptyCount = line.filter((cell) => cell === null).length;

    // Assign scores based on the pattern's state
    if (aiCount === 3) {
      return 100; // AI wins (highest score)
    } else if (playerCount === 3) {
      return -100; // Player wins (lowest score)
    } else if (aiCount === 2 && emptyCount === 1) {
      score += 10; // AI has 2 in a row, one empty (high priority)
    } else if (playerCount === 2 && emptyCount === 1) {
      score -= 10; // Player has 2 in a row, one empty (block this move)
    } else if (aiCount === 1 && emptyCount === 2) {
      score += 1; // AI has 1 in a row, two empty (low priority)
    } else if (playerCount === 1 && emptyCount === 2) {
      score -= 1; // Player has 1 in a row, two empty (low priority)
    }
  }

  return score;
};

export const evaluateBestMoveForMediumDifficulty = (grid, setWinner, setIsXTurn) => {
  let bestScore = -Infinity;
  let bestMove;

  const possibleMoves = availableMoves(grid);
  for (const move of possibleMoves) {
    const newGrid = [...grid];
    newGrid[move] = "O";

    const score = evaluateBoard(newGrid);
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }

    const gameWinner = checkWinner(newGrid);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setIsXTurn((prev) => !prev);
    }
  }

  return bestMove;
};

export const minimax = (grid, depth, isMaximizing) => {
  const score = evaluateBoard(grid);

  // Terminal state: Return the score
  if (score === 100 || score === -100 || !grid.includes(null)) {
    return score - depth; // Prefer faster wins
  }

  if (isMaximizing) {
    let bestScore = -Infinity;

    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === null) {
        grid[i] = "O"; // AI's move
        bestScore = Math.max(bestScore, minimax(grid, depth + 1, false));
        grid[i] = null; // Undo move
      }
    }

    return bestScore;
  } else {
    let bestScore = Infinity;

    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === null) {
        grid[i] = "X"; // Opponent's move
        bestScore = Math.min(bestScore, minimax(grid, depth + 1, true));
        grid[i] = null; // Undo move
      }
    }

    return bestScore;
  }
};


export const evaluateBestMoveForHardDifficulty = (grid)=>{
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === null) {
      grid[i] = "O"; // Simulate AI's move
      const score = minimax(grid, 0, false);
      grid[i] = null; // Undo move

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}