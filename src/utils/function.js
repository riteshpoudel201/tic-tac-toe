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
    const availableIndex = Array.from({ length: 9 }, (_, i) => i).filter(
      (i) => !trackIndex.includes(i)
    );
    if (availableIndex.length === 0) return null; // No moves left
    const random = Math.floor(Math.random() * availableIndex.length);
    return availableIndex[random];
  };