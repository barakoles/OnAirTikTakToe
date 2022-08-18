import { createModel } from '@rematch/core';
import type { RootModel } from './index';

type TikTakToeState = {
  board: any[];
  currentPlayer: number;
  winner: number;
  gameOver: boolean;
  round: number;
  draw: boolean;
};

const initialState: TikTakToeState = {
  board: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  currentPlayer: 1,
  winner: 0,
  gameOver: false,
  draw: false,
  round: 0,
};

export const tikTakToe = createModel<RootModel>()({
  state: initialState as TikTakToeState,
  reducers: {
    updateBoard(state, payload: { row: number; col: number }) {
      const { row, col } = payload;
      const newBoard: any[] = state.board.map((_row, rowIndex) => {
        return _row.map((tile: number, colIndex: number) => {
          if (rowIndex === row && colIndex === col) {
            return state.currentPlayer;
          }
          return tile;
        });
      });
      return {
        ...state,
        round: state.round + 1,
        board: newBoard,
      };
    },
    checkWinner(state) {
      const { board, currentPlayer, round, winner } = state;

      const tilesStreak = 3;
      const checkColumns = () => {
        for (let i = 0; i < tilesStreak; i++) {
          let sum = board[0][i] + board[1][i] + board[2][i];
          if (sum === 3) {
            return 1;
          } else if (sum === -3) {
            return -1;
          }
          return false;
        }
      };
      const checkRows = () => {
        for (let row = 0; row < 3; row++) {
          let sum = board[row][0] + board[row][1] + board[row][2];
          if (sum === 3) {
            return 1;
          }
          if (sum === -3) {
            return -1;
          }
        }
        return false;
      };
      const checkDiagonals = () => {
        let sumDiagonal = board[0][0] + board[1][1] + board[2][2];
        let sumAntiDiagonal = board[2][0] + board[1][1] + board[0][2];

        if (sumDiagonal === 3 || sumAntiDiagonal === 3) {
          return 1;
        }
        if (sumDiagonal === -3 || sumAntiDiagonal === -3) {
          return -1;
        }
        return false;
      };
      if (checkColumns() || checkRows() || checkDiagonals()) {
        return {
          ...state,
          gameOver: true,
          winner: currentPlayer === 1 ? 1 : -1,
        };
      }
      if (round === 9 && winner === 0) {
        return {
          ...state,
          gameOver: true,
          draw: true,
          winner: 0,
        };
      }
    },
    updatePlayer(state, payload) {
      return {
        ...state,
        currentPlayer: payload,
      };
    },
    setBoard(state, payload) {
      return {
        ...state,
        board: payload,
      };
    },
    resetBoard(state) {
      return {
        ...state,
        board: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
      };
    },
    setWinner(state, payload) {
      return {
        ...state,
        winner: payload,
      };
    },
    setGameOver(state, payload) {
      return {
        ...state,
        gameOver: payload,
      };
    },
  },
});
