export interface Dynamic<T> {
  [key: string]: T;
}

export interface DynamicObject<T> {
	[key: string]: T | DynamicObject<T>;
}

export interface Item {
  id: number;
  name: string;
}

export interface MenuItem extends Item {
  subItems: Item[];
}
