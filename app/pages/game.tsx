"use client";

import { useGameStore } from "@/store/store";
import { useEffect, useState } from "react";

type BoardType = (string | null)[];

const TicTacToe: React.FC = () => {
  const {
    board,
    score,
    xScore,
    oScore,
    winStreak,
    xWins,
    oWins,
    isDraw,
    countdown,
    setBoard,
    setScore,
    setXScore,
    setOScore,
    setWinStreak,
    setXWins,
    setOWins,
    setIsDraw,
    setCountdown,
  } = useGameStore();

  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winnerMessage, setWinnerMessage] = useState<string>("");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && (winnerMessage || isDraw)) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      resetBoard();
    }
    return () => clearTimeout(timer);
  }, [countdown, winnerMessage, isDraw]);

  const handleClick = (index: number): void => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard: BoardType = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner) {
      if (winStreak + 1 === 3) {
        setScore(score + 2);
        setXScore(xScore + 2); // เพิ่มคะแนนของผู้เล่น X
        setWinStreak(0);
      } else {
        setScore(score + 1);
        setXScore(xScore + 1); // เพิ่มคะแนนของผู้เล่น X
        setWinStreak(winStreak + 1);
      }
      setWinnerMessage("X ชนะ + 1");
      setXWins(xWins + 1);
      setCountdown(6);
    } else if (!newBoard.includes(null)) {
      setWinStreak(0);
      setIsDraw(true);
      setCountdown(6);
    } else {
      botMove(newBoard);
    }
  };

  const botMove = (currentBoard: BoardType): void => {
    let availableMoves = currentBoard
      .map((value, index) => (value === null ? index : null))
      .filter((value): value is number => value !== null);
    if (availableMoves.length === 0) return;

    const botIndex =
      availableMoves[Math.floor(Math.random() * availableMoves.length)];
    const newBoard: BoardType = [...currentBoard];
    newBoard[botIndex] = "O";
    setBoard(newBoard);

    if (calculateWinner(newBoard)) {
      setScore(score - 1);
      setOScore(oScore + 1); // เพิ่มคะแนนของผู้เล่น O
      setWinStreak(0);
      setWinnerMessage("O ชนะ - 1");
      setOWins(oWins + 1); // Update oWins in the store
      setCountdown(6);
    } else if (!newBoard.includes(null)) {
      setScore(score - 1);
      setWinStreak(0);
      setIsDraw(true);
      setCountdown(6);
    }
  };

  const calculateWinner = (squares: BoardType): string | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const resetBoard = (): void => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setIsDraw(false);
    setWinnerMessage("");
    setCountdown(6);
  };

  const resetGame = (): void => {
    // Reset state variables
    setBoard(Array(9).fill(null));
    setXScore(0);
    setOScore(0);
    setXWins(0);
    setOWins(0); // Reset oWins in the store
    setIsXNext(true);
    setIsDraw(false);
    setWinnerMessage("");
    setCountdown(6);

    // Clear local storage
    localStorage.clear();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
      <h1 className="text-2xl mb-4 font-bold sm:text-4xl">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-1 sm:gap-4">
        {board.map((value, index) => (
          <button
            key={index}
            className="w-16 h-16 border-2 border-black flex items-center justify-center text-2xl sm:w-24 sm:h-24 sm:text-4xl"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-col sm:flex-row justify-between w-full sm:w-80">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0">
          <p>X Score: {xScore}</p>
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          <p>O Score: {oScore}</p>
        </button>
      </div>
      <div className="flex flex-col sm:flex-row justify-between w-full sm:w-80 mt-4">
        <p className="text-xl font-bold sm:text-2xl">X ชนะ: {xWins}</p>
        <p className="text-xl font-bold text-red-500 sm:text-2xl">
          O ชนะ: {oWins}
        </p>
      </div>
      {isDraw && <p className="text-lg mt-4 sm:text-xl">คะแนนเสมอกัน</p>}
      {winnerMessage && (
        <p
          className={`text-lg mt-4 sm:text-xl ${
            winnerMessage.includes("O ชนะ") ? "text-red-500" : ""
          }`}
        >
          {winnerMessage}
        </p>
      )}
      {(winnerMessage || isDraw) && (
        <p className="text-lg mt-4 sm:text-xl">
          เริ่มเกมใหม่ใน {countdown} วินาที
        </p>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-100"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
