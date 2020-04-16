import * as React from 'react';
import {
  useState,
  useEffect,
  useRef,
  MouseEvent as SynteticMouseEvent,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { Position } from '../enums/common.enums';
import { MenuItem as IMenuItem } from '../interfaces/common.interfaces';
import MenuItem from './MenuItem';
import { selectMenuItems } from '../selectors/menu.selectors';
import { loadMenuItems } from '../actions/menu.actions';

interface Props {
  position?: Position;
  className?: string;
}

const TopMenu = (props: Props) => {
  const dispatch = useDispatch();
  const menu = useRef(null);
  const [selected, setSelected] = useState(null);
  const menuItems = useSelector(selectMenuItems);
  const position = props.position || Position.fixed;
  const itemClickHandler = (event: SynteticMouseEvent<HTMLElement, MouseEvent>) => {
    // @ts-ignore
    const id = event?.target?.dataset?.id;
    
    setSelected(selected !== id ? id : null);
  };

  useEffect(() => {
    dispatch(loadMenuItems());
  }, []);
  useEffect(() => {
    const globalClickHandler = (event: SynteticMouseEvent<HTMLElement, MouseEvent>) => {
      if (!menu.current.contains(event.target)) {
        setSelected(null);
      }
    };
    // @ts-ignore
    document.addEventListener('click', globalClickHandler);

    return () => {
      // @ts-ignore
      document.removeEventListener('click', globalClickHandler);
    };
  }, [menu]);

  if (props.position && !Position[props.position]) {
    return (
      <div>
        Please use correct position
      </div>
    );
  }
  
  return (
    <nav ref={menu}
         className={`menu${props.className ? ` ${props.className}` : ''}`}
         style={{
           position,
         }}
         onClick={itemClickHandler}>
        {menuItems.map((item: IMenuItem) => (
          <MenuItem key={item.id}
                    item={item}
                    open={item.id.toString() === selected} />
        ))}
    </nav>
  );
}

export default TopMenu;
