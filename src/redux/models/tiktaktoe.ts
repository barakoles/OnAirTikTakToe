import { createModel } from '@rematch/core';
import type { RootModel } from './index';
type Player = 1 | -1;
type TikTakToeState = {
  board: any[];
  currentPlayer: Player;
  winner: number;
  winnerLine: false | number[][];
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
  winnerLine: false,
  gameOver: false,
  draw: false,
  round: 0,
};
const checkColumns = (
  board: number[][],
  currentPlayer: 1 | -1,
  tilesStreak = 3,
) => {
  for (let i = 0; i < 3; i++) {
    // Logic can be altered to increase number of rows & columns
    let sum = board[0][i] + board[1][i] + board[2][i];
    if (sum === tilesStreak * currentPlayer) {
      return [
        [0, i, board[0][i]], // This returns a more detailed array of the winning line
        [1, i, board[1][i]],
        [2, i, board[2][i]],
      ];
    }
  }
  return false;
};
const checkRows = (
  board: number[][],
  currentPlayer: 1 | -1,
  tilesStreak = 3,
) => {
  for (let row = 0; row < 3; row++) {
    let sum = board[row][0] + board[row][1] + board[row][2];
    if (sum === tilesStreak * currentPlayer) {
      return [
        [row, 0, board[row][0]],
        [row, 1, board[row][1]],
        [row, 2, board[row][2]],
      ];
    }
  }
  return false;
};
const checkDiagonals = (
  board: number[][],
  currentPlayer: 1 | -1,
  tilesStreak = 3,
) => {
  let sumDiagonal = board[0][0] + board[1][1] + board[2][2];
  let sumAntiDiagonal = board[2][0] + board[1][1] + board[0][2];
  if (sumDiagonal === tilesStreak * currentPlayer) {
    return [
      [0, 0, board[0][0]],
      [1, 1, board[1][1]],
      [2, 2, board[2][2]],
    ];
  }
  if (sumAntiDiagonal === tilesStreak * currentPlayer) {
    return [
      [2, 0, board[2][0]],
      [1, 1, board[1][1]],
      [0, 2, board[0][2]],
    ];
  }
  return false;
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
      const winnerColumn = checkColumns(board, currentPlayer);
      const winnerRow = checkRows(board, currentPlayer);
      const winnerDiagonal = checkDiagonals(board, currentPlayer);
      if (!!winnerColumn || !!winnerRow || !!winnerDiagonal) {
        return {
          ...state,
          gameOver: true,
          winner: currentPlayer === 1 ? 1 : -1,
          winnerLine: winnerColumn || winnerRow || winnerDiagonal,
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
    resetGame() {
      return {
        ...initialState,
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
  effects: dispatch => ({
    async aiPlays(_, state) {
      const { board } = state.tikTakToe;
      // verify if AI can win
      const verify = (currentPlayer: 1 | -1) => {
        const winColumn = checkColumns(board, currentPlayer, 2);
        const winRow = checkRows(board, currentPlayer, 2);
        const winDiagonal = checkDiagonals(board, currentPlayer, 2);
        if (winColumn) {
          const column = winColumn.find(([_row, _col, tile]) => {
            return tile === 0;
          })!;

          dispatch.tikTakToe.updateBoard({
            row: column[0],
            col: column[1],
          });
          return true;
        }
        if (winRow) {
          const row = winRow.find(([_row, _col, tile]) => {
            return tile === 0;
          })!;

          dispatch.tikTakToe.updateBoard({ row: row[0], col: row[1] });
          return true;
        }
        if (winDiagonal) {
          const diagonal = winDiagonal.find(([_row, _col, tile]) => {
            return tile === 0;
          })!;

          dispatch.tikTakToe.updateBoard({
            row: diagonal[0],
            col: diagonal[1],
          });
          return true;
        }
        return false;
      };
      // Verify if player can win
      const aiWin = verify(-1);
      if (aiWin) {
        return;
      }
      const playerWin = verify(1);
      if (playerWin) {
        return;
      }
      // Play randomly
      const random = () => {
        const row = Math.floor(Math.random() * 3);
        const col = Math.floor(Math.random() * 3);
        if (board[row][col] === 0) {
          dispatch.tikTakToe.updateBoard({ row, col });
        } else {
          random();
        }
      };
      random();
    },
  }),
});
