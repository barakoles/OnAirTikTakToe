import { models, RootModel } from '@redux/models';
import { init } from '@rematch/core';

describe('app store', () => {
  describe('[app] reducer', () => {
    it('setFirstTime effect should change', async () => {
      const store = init<RootModel>({
        models,
      });
      await store.dispatch.app.setFirstTime();
      const myModelData = store.getState().app.firstTime;
      expect(myModelData).toBeFalsy();
    });
  });
});
