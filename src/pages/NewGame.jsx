/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { NavLink } from "react-router";
import Layout from "../components/Layout";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import { useSettings } from "../context/SettingsContext";
import {checkWinner, evaluateBestMoveForHardDifficulty, evaluateBestMoveForMediumDifficulty, randomIndex } from "../utils/function";

const NewGame = () => {
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const { settings } = useSettings();

  //easy difficulty starts here
  const easyDifficullty = () => {
    const aiIndex = randomIndex(grid);
    if (aiIndex !== null) {
      const newGrid = [...grid];
      newGrid[aiIndex] = isXTurn ? "X" : "O";
      setGrid(newGrid);
      const gameWinner = checkWinner(newGrid);
      if (gameWinner) {
        setWinner(gameWinner);
      } else {
        setIsXTurn((prev) => !prev);
      }
    }
  };

  //medium difficulty function starts here
  const mediumDifficulty = () => {
    const bestMove = evaluateBestMoveForMediumDifficulty(grid, setWinner, setIsXTurn);
    console.log(bestMove);
    if (bestMove !== -1) {
      const newBoard = [...grid];
      newBoard[bestMove] = "O";
      setGrid(newBoard);
      setIsXTurn(true);
    }
  };

const hardDifficulty = () => {
  const bestMove = evaluateBestMoveForHardDifficulty(grid);
  if (bestMove !== -1) {
    const newBoard = [...grid];
    newBoard[bestMove] = "O";
    setGrid(newBoard);
    setIsXTurn(true);
  }
}

  const moveByComputer = () => {
    settings.currentDifficulty === "easy" && easyDifficullty();
    settings.currentDifficulty === "medium" && mediumDifficulty();
    settings.currentDifficulty === "hard" && hardDifficulty();
  };

  const moveByHuman = (index) => {
    const newGrid = [...grid];
    newGrid[index] = isXTurn ? "X" : "O";
    setGrid(newGrid);
    const gameWinner = checkWinner(newGrid);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setIsXTurn((prev) => !prev);
    }
  };

  const handleCellClick = (index) => {
    if (grid[index] || winner) return;
    moveByHuman(index);
  };

  const resetGame = () => {
    setGrid(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  };

  const isDraw = grid.every((cell) => cell !== null) && !winner;

  useEffect(() => {
    if (!isXTurn && winner === null && settings.currentPlayer === "computer") {
      console.log("Move by AI is triggered.");
      setTimeout(moveByComputer(), 1000);
    }
  }, [isXTurn, winner]);

  return (
    <Layout>
      <Title />
      <h2 className="text-center text-2xl font-semibold mt-4">
        {winner
          ? `${winner} Wins!`
          : isDraw
          ? "It's a Draw!"
          : `Turn: ${isXTurn ? "X" : "O"}`}
      </h2>
      {!winner && !isDraw && (
        <div className="grid grid-cols-3 grid-rows-3 gap-4 mt-8">
          {grid.map((value, index) => (
            <GridCell
              key={index}
              value={value}
              onClick={() => handleCellClick(index)}
            />
          ))}
        </div>
      )}
      {(winner || isDraw) && (
        <div className="flex flex-col gap-4">
          <button
            className="mt-4 px-4 py-2 bg-white text-gray-500 font-bold rounded"
            onClick={resetGame}
          >
            Restart Game
          </button>
          <NavLink
            to={"/"}
            className="px-3 py-2 border-[1px] border-gray-300 rounded-md hover:bg-gray-700 hover:border-gray-700 text-center"
          >
            Exit
          </NavLink>
        </div>
      )}
    </Layout>
  );
};

export default NewGame;

const GridCell = ({ value, onClick }) => {
  return (
    <button
      className="p-4 w-20 h-20 bg-gray-200 text-4xl text-gray-500 font-bold flex justify-center items-center rounded-sm"
      onClick={onClick}
    >
      {value}
    </button>
  );
};
