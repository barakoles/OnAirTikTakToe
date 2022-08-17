import { createModel } from '@rematch/core';
import type { RootModel } from './index';

type AppState = {
  firstTime: boolean;
};

const initialState: AppState = {
  firstTime: true,
};

export const app = createModel<RootModel>()({
  state: initialState as AppState,
  reducers: {
    setFirstTime(state) {
      return {
        ...state,
        firstTime: false,
      };
    },
  },
  effects: () => ({}),
});
