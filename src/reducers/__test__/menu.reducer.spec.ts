import { menuReducer } from '../menu.reducer';
import { MenuState } from '../../interfaces/state.interfaces';
import { MenuAction, LoadDataAction, LoadDataSuccessAction, LoadDataFailureAction } from '../../interfaces/menu.actions.interfaces';
import { MenuActionType } from '../../enums/actions.enums';
import { MenuItem } from '../../interfaces/common.interfaces';

describe('menu.reducer.ts', () => {
  test('should return initial state for undefined previous state', () => {
    // given
    const action = {
      type: 'Wrong type',
    };

    // when
    const newState = menuReducer(undefined, action as MenuAction);

    // then
    expect(newState).toEqual({
      loading: false,
      menuItems: [],
      error: null,
    });
  });

  test('should return same state for not maching action', () => {
    // given
    const state: MenuState = {
      loading: false,
      menuItems: [],
      error: null,
    };
    const action = {
      type: 'Wrong type',
    };

    // when
    const newState = menuReducer(state, action as MenuAction);

    // then
    expect(newState).toEqual(state);
  });

  test('should return new state for loadData action', () => {
    // given
    const state: MenuState = {
      loading: false,
      menuItems: [],
      error: null,
    };
    const action: LoadDataAction = {
      type: MenuActionType.LoadData,
    };

    // when
    const newState = menuReducer(state, action as MenuAction);

    // then
    expect(newState).toEqual({
      loading: true,
      menuItems: [],
      error: null,
    });
  });

  test('should return new state for loadDataSuccess action', () => {
    // given
    const state: MenuState = {
      loading: true,
      menuItems: [],
      error: null,
    };
    const data: MenuItem[] = [
      {
        id: 1,
        name: 'Test 1',
        subItems: [],
      },
    ];
    const action: LoadDataSuccessAction = {
      type: MenuActionType.LoadDataSuccess,
      payload: data,
    };

    // when
    const newState = menuReducer(state, action as MenuAction);

    // then
    expect(newState).toEqual({
      loading: false,
      menuItems: data,
      error: null,
    });
  });

  test('should return new state for loadDataFailure action', () => {
    // given
    const state: MenuState = {
      loading: true,
      menuItems: [],
      error: null,
    };
    const error = 'There is soomething wrong';
    const action: LoadDataFailureAction = {
      type: MenuActionType.LoadDataFailure,
      payload: error,
    };

    // when
    const newState = menuReducer(state, action as MenuAction);

    // then
    expect(newState).toEqual({
      loading: false,
      menuItems: [],
      error,
    });
  });
});
