import { MenuActionType } from "../enums/actions.enums";
import { MenuItem } from "./common.interfaces";

export interface LoadDataAction {
  type: MenuActionType.LoadData;
}

export interface LoadDataSuccessAction {
  type: MenuActionType.LoadDataSuccess;
  payload: MenuItem[];
}

export interface LoadDataFailureAction {
  type: MenuActionType.LoadDataFailure;
  payload: string;
}

export type MenuAction = LoadDataAction
  | LoadDataSuccessAction
  | LoadDataFailureAction;