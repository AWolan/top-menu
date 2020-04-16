import axios, { AxiosResponse } from 'axios';

import { MenuItem } from '../interfaces/common.interfaces';

export const fetchMenuItems = () =>
  axios.get('http://www.mocky.io/v2/5d3fec2b33000062009d27bc')
    .then((response: AxiosResponse<MenuItem[]>): MenuItem[] => response.data);
