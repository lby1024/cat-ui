import MenuGroup from './MenuGroup';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

type MenuGroupType = typeof MenuGroup;

interface MenuProps extends MenuGroupType {
  Item: typeof MenuItem;
  Sub: typeof SubMenu;
}

const Menu = MenuGroup as MenuProps;
Menu.Item = MenuItem;
Menu.Sub = SubMenu;

export default Menu;
