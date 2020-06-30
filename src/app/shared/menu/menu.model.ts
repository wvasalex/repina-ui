export interface MenuItem {
  label: string;
  routerLink: string;
}

export const MenuItems: MenuItem[] = [
  {
    label: 'Проекты',
    routerLink: '/projects',
  },
  {
    label: 'Услуги',
    routerLink: '/services',
  },
  {
    label: 'Агенство',
    routerLink: '/agency',
  },
  {
    label: 'Журнал',
    routerLink: '/blog',
  },
  {
    label: 'Контакты',
    routerLink: '/contacts',
  },
];
