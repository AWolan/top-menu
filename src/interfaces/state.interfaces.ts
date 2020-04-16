import { MenuItem } from './common.interfaces';

export interface MenuState {
  loading: boolean;
  menuItems: MenuItem[];
  error: string;
}

export interface GlobalState {
  menu: MenuState;
}
