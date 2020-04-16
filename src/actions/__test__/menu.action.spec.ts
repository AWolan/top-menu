import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';

import {
  loadData,
  loadDataSuccess,
  loadDataFailure,
  loadMenuItems,
} from '../menu.actions';
import { MenuActionType } from '../../enums/actions.enums';
import { MenuItem } from '../../interfaces/common.interfaces';
import { GlobalState } from '../../interfaces/state.interfaces';

const mockStore = configureMockStore<GlobalState>([thunk]);

describe('menu.action.ts', () => {
  test('should create action for load data', () => {
    // when
    const action = loadData();

    // then
    expect(action.type).toEqual(MenuActionType.LoadData);
    expect(action).not.toHaveProperty('payload');
  });
  
  test('should create action for load data success', () => {
    // given
    const data: MenuItem[] = [
      {
        id: 1,
        name: 'Test 1',
        subItems: [],
      },
    ];

    // when
    const action = loadDataSuccess(data);

    // then
    expect(action.type).toEqual(MenuActionType.LoadDataSuccess);
    expect(action).toHaveProperty('payload');
    expect(action.payload).toEqual(data);
  });

  test('should create action for load data failure', () => {
    // given
    const error: string = 'Some error';

    // when
    const action = loadDataFailure(error);

    // then
    expect(action.type).toEqual(MenuActionType.LoadDataFailure);
    expect(action).toHaveProperty('payload');
    expect(action.payload).toEqual(error);
  });

  test('should perform menu items load successfuly', async () => {
    // given
    const data: MenuItem[] = [
      {
        id: 1,
        name: 'Test 1',
        subItems: [],
      },
    ];
    // @ts-ignore
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data,
    }));
    const state: GlobalState = {
      menu: {
        loading: false,
        menuItems: [],
        error: null,
      },
    };
    const store = mockStore(state);

    // when
    // @ts-ignore
    await store.dispatch(loadMenuItems());

    // then
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: MenuActionType.LoadData,
      },
      {
        type: MenuActionType.LoadDataSuccess,
        payload: data,
      },
    ]);
  });

  test('should perform menu items failed to load', async () => {
    // given
    const error = 'There is some error';
    // @ts-ignore
    mockAxios.get.mockImplementationOnce(() => Promise.reject(error));
    const state: GlobalState = {
      menu: {
        loading: false,
        menuItems: [],
        error: null,
      },
    };
    const store = mockStore(state);

    // when
    // @ts-ignore
    await store.dispatch(loadMenuItems());

    // then
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: MenuActionType.LoadData,
      },
      {
        type: MenuActionType.LoadDataFailure,
        payload: error,
      },
    ]);
  });
});
