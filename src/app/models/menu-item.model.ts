import { SvgType } from "../shared/components/svg-icon/svg-icon.component";

export type MenuItem = {
  icon: SvgType,
  title: string,
  link: string,
  exact?: boolean,
}

export const MENU_ITEMS: Array<MenuItem> = [
  {
    icon: 'dashboard',
    title: 'Dasboard',
    link: '/',
    exact: true,
  },
  {
    icon: 'list',
    title: 'Activities',
    link: '/activities',
  },
  {
    icon: 'graph',
    title: 'Statistics',
    link: '/statistics',
  },
  {
    icon: 'runner',
    title: 'Profile',
    link: '/profile',
  },
  {
    icon: 'settings',
    title: 'Settings',
    link: '/settings',
  },
  {
    icon: 'admin',
    title: 'Admin',
    link: '/admin',
  },
]

export const getMenuItem = (route: string) => {
  return MENU_ITEMS.find(menuItem => menuItem.link === route);
}
