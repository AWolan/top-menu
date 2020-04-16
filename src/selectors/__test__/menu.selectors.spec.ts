import {
  selectMenuState,
  selectLoading,
  selectMenuItems,
  selectError,
} from '../menu.selectors';
import { GlobalState } from '../../interfaces/state.interfaces';


describe('menu.selector.ts', () => {
  const globalState: GlobalState = {
    menu: {
      loading: true,
      menuItems: [
        {
          id: 1,
          name: 'Test 1',
          subItems: [],
        },
      ],
      error: 'There was some error',
    },
  };

  test('should get menu state', () => {
    // when
    const state = selectMenuState(globalState);

    // then
    expect(state).toEqual(globalState.menu);
  });

  test('should get loading flag', () => {
    // when
    const loading = selectLoading(globalState);

    // then
    expect(loading).toEqual(globalState.menu.loading);
  });

  test('should get menu items', () => {
    // when
    const menuItems = selectMenuItems(globalState);

    // then
    expect(menuItems).toEqual(globalState.menu.menuItems);
  });

  test('should get error', () => {
    // when
    const error = selectError(globalState);

    // then
    expect(error).toEqual(globalState.menu.error);
  });
});
