import { createModel } from '@rematch/core';
import type { RootModel } from './index';

type TikTakToeState = {
  board: number[];
  player: string;
  winner: string;
  gameOver: boolean;
};

const initialState: TikTakToeState = {
  board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  player: 'X',
  winner: '',
  gameOver: false,
};

export const tikTakToe = createModel<RootModel>()({
  state: initialState as TikTakToeState,
  reducers: {
    setBoard(state, payload) {
      return {
        ...state,
        board: payload,
      };
    },
    setPlayer(state, payload) {
      return {
        ...state,
        player: payload,
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
  effects: () => ({}),
});
