import * as React from 'react';

import {
  MenuItem as IMenuItem,
  Item,
} from '../interfaces/common.interfaces';

import './menuItem.scss';

interface Props {
  item: IMenuItem;
  open: boolean;
  key?: string | number;
}

const MenuItem = (props: Props) => {
  return (
    <div className={`menu__item${props.open ? ' opened' : ''}`}>
      <div className='menu__item--name'
           data-id={props.item.id}>{props.item.name}</div>
      <div className='menu__item--list'>
        {props.item.subItems?.map((item: Item) => (
          <div key={item.id}
               className='list-item'>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuItem;
