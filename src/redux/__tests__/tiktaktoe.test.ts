import { models, RootModel } from '@redux/models';
import { init } from '@rematch/core';

describe('tiktaktoe store', () => {
  describe('[tiktaktoe] reducer', () => {
    it('updateBoard should change', () => {
      const store = init<RootModel>({
        models,
      });
      store.dispatch.tikTakToe.updateBoard({ row: 0, col: 0 });
      const myModelData = store.getState().tikTakToe.board;
      const result = [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      expect(myModelData).toStrictEqual(result);
    });
    it('checkWinner should change', () => {
      const store = init<RootModel>({
        models,
      });
      const currentBoard = [
        [1, 2, 0],
        [1, 2, 0],
        [1, 0, 2],
      ];
      store.dispatch.tikTakToe.setBoard(currentBoard);
      store.dispatch.tikTakToe.checkWinner();
      const myModelData = store.getState().tikTakToe.winner;

      expect(myModelData).toStrictEqual('Player 1');
    });
    it('gameOver should change', () => {
      const store = init<RootModel>({
        models,
      });
      const currentBoard = [
        [2, 0, 0],
        [1, 2, 0],
        [1, 0, 2],
      ];
      store.dispatch.tikTakToe.setBoard(currentBoard);
      store.dispatch.tikTakToe.checkWinner();
      const myModelData = store.getState().tikTakToe.gameOver;

      expect(myModelData).toBeTruthy();
    });
  });
});
