import { SvgType } from "../shared/components/svg-icon/svg-icon.component"

export type NavLink = {
  icon: SvgType,
  url: string,
  title: string,
}

export const NAV_LINK: Array<NavLink> = [
  {
    icon: 'dashboard',
    url: '/dashboard',
    title: 'Dasboard',
  },
  {
    icon: 'list',
    url: '/activities',
    title: 'Activities',
  },
  {
    icon: 'graph',
    url: '/statistics',
    title: 'Statistics',
  },
  {
    icon: 'runner',
    url: '/profile',
    title: 'Profile',
  },
  {
    icon: 'settings',
    url: '/settings',
    title: 'Settings',
  },
  {
    icon: 'admin',
    url: '/admin',
    title: 'Admin',
  },
]

export const getNavLink = (route: string) => {
  return NAV_LINK.find(link => link.url === route)
}
