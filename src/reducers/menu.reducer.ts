import { MenuState } from '../interfaces/state.interfaces';
import { MenuAction } from '../interfaces/menu.actions.interfaces';
import { MenuActionType } from '../enums/actions.enums';

const initialState: MenuState = {
  loading: false,
  menuItems: [],
  error: null,
};

export const menuReducer = (state: MenuState = initialState, action: MenuAction) => {
  switch (action.type) {
    case MenuActionType.LoadData: {
      return {
        ...state,
        loading: true,
      };
    }
    case MenuActionType.LoadDataSuccess: {
      return {
        ...state,
        menuItems: action.payload,
        loading: false,
      };
    }
    case MenuActionType.LoadDataFailure: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
