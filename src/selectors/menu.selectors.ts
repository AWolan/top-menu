import { createSelector } from 'reselect';

import {
  GlobalState,
  MenuState,
} from '../interfaces/state.interfaces';
import { MenuItem } from '../interfaces/common.interfaces';

export const selectMenuState = (state: GlobalState): MenuState => state.menu;

export const selectMenuItems = createSelector(selectMenuState, (state: MenuState): MenuItem[] => state.menuItems);

export const selectLoading = createSelector(selectMenuState, (state: MenuState): boolean => state.loading);

export const selectError = createSelector(selectMenuState, (state: MenuState): string => state.error);
