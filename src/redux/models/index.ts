import { Models } from '@rematch/core';
import { app } from './app';
import { tikTakToe } from './tiktaktoe';

export interface RootModel extends Models<RootModel> {
  app: typeof app;
  tikTakToe: typeof tikTakToe;
}

export const models: RootModel = {
  app,
  tikTakToe,
};
