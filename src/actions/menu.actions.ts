import {
  LoadDataAction,
  LoadDataSuccessAction,
  LoadDataFailureAction,
} from '../interfaces/menu.actions.interfaces';
import { MenuActionType } from '../enums/actions.enums';
import { fetchMenuItems } from '../services/menu.service';
import { MenuItem } from '../interfaces/common.interfaces';

export const loadData = (): LoadDataAction => ({
  type: MenuActionType.LoadData,
});

export const loadDataSuccess = (data: MenuItem[]): LoadDataSuccessAction => ({
  type: MenuActionType.LoadDataSuccess,
  payload: data,
});

export const loadDataFailure = (error: string): LoadDataFailureAction => ({
  type: MenuActionType.LoadDataFailure,
  payload: error,
});

export const loadMenuItems = (): Function => (dispatch: Function): Promise<void> => {
  dispatch(loadData());

  return fetchMenuItems()
    .then((menuItems: MenuItem[]): void => {
      dispatch(loadDataSuccess(menuItems));
    })
    .catch((error: any) => {
      dispatch(loadDataFailure(error?.toString()))
    });
};
