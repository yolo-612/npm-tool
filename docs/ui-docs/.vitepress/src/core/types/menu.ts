export type MenuItem = MenuItemWithLink | MenuItemWithChildren;

export interface MenuItemWithLink {
  text: string;
  link: string;
  self: boolean;
}

export interface MenuItemWithChildren {
  text: string;
  items: MenuItemChild[];
}

export type MenuItemChild = MenuItemWithLink | MenuItemChildWithChildren;

export interface MenuItemChildWithChildren {
  text?: string;
  items: MenuItemWithLink[];
}
