import * as React from 'react';
import { shallow } from 'enzyme';

import MenuItem from '../MenuItem';
import { MenuItem as IMenuItem } from '../../interfaces/common.interfaces';

describe('MenuItem.tsx', () => {
  test('should render menu item withoout subItems', () => {
    // given
    const item: IMenuItem = {
      id: 1,
      name: 'Test 1',
      subItems: null,
    };
    const open = false;

    // when
    const wrapper = shallow((
      <MenuItem item={item}
                open={open} />
    ));

    // then
    expect(wrapper.prop('className')).toEqual('menu__item');
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.childAt(0).getElement()).toEqual((
      <div className='menu__item--name'
           data-id={1}>Test 1</div>
    ));
    expect(wrapper.childAt(1).prop('className')).toEqual('menu__item--list');
    expect(wrapper.childAt(1).children()).toHaveLength(0);
  });

  test('should render menu item with subItems', () => {
    // given
    const item: IMenuItem = {
      id: 1,
      name: 'Test 1',
      subItems: [
        {
          id: 1,
          name: 'Sub Test 1',
        },
        {
          id: 2,
          name: 'Sub Test 2',
        },
      ],
    };
    const open = false;

    // when
    const wrapper = shallow((
      <MenuItem item={item}
                open={open} />
    ));

    // then
    expect(wrapper.prop('className')).toEqual('menu__item');
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.childAt(0).getElement()).toEqual((
      <div className='menu__item--name'
           data-id={1}>Test 1</div>
    ));
    expect(wrapper.childAt(1).prop('className')).toEqual('menu__item--list');
    expect(wrapper.childAt(1).children()).toHaveLength(2);
    expect(wrapper.childAt(1).childAt(0).getElement()).toEqual((
      <div key={1} className='list-item'>Sub Test 1</div>
    ));
    expect(wrapper.childAt(1).childAt(1).getElement()).toEqual((
      <div key={2} className='list-item'>Sub Test 2</div>
    ));
  });

  test('should render opened menu item with subItems', () => {
    // given
    const item: IMenuItem = {
      id: 1,
      name: 'Test 1',
      subItems: [
        {
          id: 1,
          name: 'Sub Test 1',
        },
        {
          id: 2,
          name: 'Sub Test 2',
        },
      ],
    };
    const open = true;

    // when
    const wrapper = shallow((
      <MenuItem item={item}
                open={open} />
    ));

    // then
    expect(wrapper.prop('className')).toEqual('menu__item opened');
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.childAt(0).getElement()).toEqual((
      <div className='menu__item--name'
           data-id={1}>Test 1</div>
    ));
    expect(wrapper.childAt(1).prop('className')).toEqual('menu__item--list');
    expect(wrapper.childAt(1).children()).toHaveLength(2);
    expect(wrapper.childAt(1).childAt(0).getElement()).toEqual((
      <div key={1} className='list-item'>Sub Test 1</div>
    ));
    expect(wrapper.childAt(1).childAt(1).getElement()).toEqual((
      <div key={2} className='list-item'>Sub Test 2</div>
    ));
  });
});
