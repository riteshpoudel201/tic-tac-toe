/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { NavLink } from "react-router";
import Layout from "../components/Layout";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import { useSettings } from "../context/SettingsContext";
import { checkWinner, randomIndex } from "../utils/function";

const NewGame = () => {
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(false);
  const [trackIndex, setTrackIndex] = useState([]);
  const [winner, setWinner] = useState(null);
  const { settings } = useSettings();

  console.log("Settings: ",settings)

  const moveByAi = () => {
    const aiIndex = randomIndex(trackIndex);
    if (aiIndex !== null) {
      const newGrid = [...grid];
      newGrid[aiIndex] = isXTurn ? "X" : "O";
      setGrid(newGrid);
      setTrackIndex((prev) => [...prev, aiIndex]);
      const gameWinner = checkWinner(newGrid);
      if (gameWinner) {
        setWinner(gameWinner);
      } else {
        setIsXTurn((prev) => !prev);
      }
    }
  };
  
  const moveByHuman = (index) => {
    const newGrid = [...grid];
    newGrid[index] = isXTurn ? "X" : "O";
    setGrid(newGrid);
    setTrackIndex((prev) => [...prev, index]);
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
    setTrackIndex([]);
  };

  const isDraw = grid.every((cell) => cell !== null) && !winner;

  useEffect(() => {
    if (!isXTurn && winner === null) {
      moveByAi();
    }
  }, [isXTurn, winner]);

  return (
    <Layout>
      <Title />
      <h2 className="text-center text-2xl font-semibold mt-4">
        {winner ? `${winner} Wins!` : isDraw ? "It's a Draw!" : `Turn: ${isXTurn ? "X" : "O"}`}
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
