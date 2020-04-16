import * as React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import TopMenu from '../TopMenu';
import { GlobalState } from '../../interfaces/state.interfaces';
import { Position } from '../../enums/common.enums';

const mockStore = configureMockStore<GlobalState>([thunk]);

describe('TopMenu.tsx', () => {
  test('should reder empty menu with default position', () => {
    // given
    const state: GlobalState = {
      menu: {
        loading: false,
        menuItems: [],
        error: null,
      }
    };
    const store = mockStore(state);

    // when
    const wrapper = mount((
      // @ts-ignore
      <Provider store={store}>
        <TopMenu />
      </Provider>
    ));
    const component = wrapper.find('nav.menu');
    
    // then
    expect(component.prop('className')).toEqual('menu');
    expect(component.prop('style')).toEqual({
      position: 'fixed',
    });
    expect(component.children()).toHaveLength(0);
  });

  test('should reder empty menu with given position', () => {
    // given
    const state: GlobalState = {
      menu: {
        loading: false,
        menuItems: [],
        error: null,
      }
    };
    const store = mockStore(state);
    const position = Position.sticky;

    // when
    const wrapper = mount((
      // @ts-ignore
      <Provider store={store}>
        <TopMenu position={position} />
      </Provider>
    ));
    const component = wrapper.find('nav.menu');
    
    // then
    expect(component.prop('className')).toEqual('menu');
    expect(component.prop('style')).toEqual({
      position,
    });
    expect(component.children()).toHaveLength(0);
  });

  test('should not reder menu with wrong position', () => {
    // given
    const state: GlobalState = {
      menu: {
        loading: false,
        menuItems: [],
        error: null,
      }
    };
    const store = mockStore(state);
    const position = 'wrong value';

    // when
    const wrapper = mount((
      // @ts-ignore
      <Provider store={store}>
        <TopMenu position={position as Position} />
      </Provider>
    ));
    
    // then
    expect(wrapper.find('nav.menu')).toHaveLength(0);
  });

  test('should reder menu based on retrieved data', () => {
    // given
    const state: GlobalState = {
      menu: {
        loading: false,
        menuItems: [
          {
            id: 1,
            name: 'Test 1',
            subItems: [
              {
                id: 1,
                name: 'Sub Test 1',
              },
            ],
          },
          {
            id: 2,
            name: 'Test 2',
            subItems: [],
          },
        ],
        error: null,
      }
    };
    const store = mockStore(state);

    // when
    const wrapper = mount((
      // @ts-ignore
      <Provider store={store}>
        <TopMenu />
      </Provider>
    ));
    const component = wrapper.find('nav.menu');
    
    // then
    expect(component.prop('className')).toEqual('menu');
    expect(component.children()).toHaveLength(2);
  });

  test('should open submenu on click', () => {
    // given
    const state: GlobalState = {
      menu: {
        loading: false,
        menuItems: [
          {
            id: 1,
            name: 'Test 1',
            subItems: [
              {
                id: 1,
                name: 'Sub Test 1',
              },
            ],
          },
          {
            id: 2,
            name: 'Test 2',
            subItems: [
              {
                id: 2,
                name: 'Sub Test 2',
              },
            ],
          },
        ],
        error: null,
      }
    };
    const store = mockStore(state);

    // when
    const wrapper = mount((
      // @ts-ignore
      <Provider store={store}>
        <TopMenu />
      </Provider>
    ));
    const component = wrapper.find('.menu__item').at(0);
    component.find('.menu__item--name').simulate('click');
    
    // then
    expect(wrapper.find('.menu__item.opened')).toHaveLength(1);
  });

  test('should close submenu on click outside', () => {
    // given
    const state: GlobalState = {
      menu: {
        loading: false,
        menuItems: [
          {
            id: 1,
            name: 'Test 1',
            subItems: [
              {
                id: 1,
                name: 'Sub Test 1',
              },
            ],
          },
          {
            id: 2,
            name: 'Test 2',
            subItems: [
              {
                id: 2,
                name: 'Sub Test 2',
              },
            ],
          },
        ],
        error: null,
      }
    };
    const store = mockStore(state);

    // when
    const wrapper = mount((
      // @ts-ignore
      <Provider store={store}>
        <TopMenu />
      </Provider>
    ));
    const component = wrapper.find('.menu__item').at(0);
    component.find('.menu__item--name').simulate('click');
    component.simulate('click');
    
    // then
    expect(wrapper.find('.menu__item.opened')).toHaveLength(0);
  });
});
