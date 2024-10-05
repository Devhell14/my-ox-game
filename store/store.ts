import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface GameState {
  board: (string | null)[]; 
  score: number; 
  xScore: number; 
  oScore: number; 
  winStreak: number; 
  xWins: number; 
  oWins: number; 
  isDraw: boolean; 
  countdown: number; 
  setBoard: (board: (string | null)[]) => void; 
  setScore: (score: number) => void; 
  setXScore: (xScore: number) => void; 
  setOScore: (oScore: number) => void; 
  setWinStreak: (winStreak: number) => void; 
  setXWins: (xWins: number) => void; 
  setOWins: (oWins: number) => void; 
  setIsDraw: (isDraw: boolean) => void; 
  setCountdown: (countdown: number) => void; 
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      board: Array(9).fill(null), 
      score: 0, 
      xScore: 0, 
      oScore: 0, 
      winStreak: 0, 
      xWins: 0, 
      oWins: 0, 
      isDraw: false, 
      countdown: 0, 
      setBoard: (board) => set({ board }), 
      setScore: (score) => set({ score }), 
      setXScore: (xScore) => set({ xScore }), 
      setOScore: (oScore) => set({ oScore }), 
      setWinStreak: (winStreak) => set({ winStreak }), 
      setXWins: (xWins) => set({ xWins }), 
      setOWins: (oWins) => set({ oWins }), 
      setIsDraw: (isDraw) => set({ isDraw }), 
      setCountdown: (countdown) => set({ countdown }), 
    }),
    {
      name: "game-storage", 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);