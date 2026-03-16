export enum ItemType {
  WEAPON,
  ARMOR,
  POTION,
}

export const ItemTypeLabel: Record<ItemType, string> = {
  [ItemType.WEAPON]: 'Weapon',
  [ItemType.ARMOR]: 'Armor',
  [ItemType.POTION]: 'Potion',
};

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  value: number;
}

export function createItem(name: string, type: ItemType, value: number): Item {
  return {
    id: crypto.randomUUID(),
    name,
    type,
    value,
  };
}

export function createStarterItems(): Item[] {
  return [
    createItem('Health Potion', ItemType.POTION, 20),
    createItem('Iron Sword', ItemType.WEAPON, 5),
    createItem('Leather Armor', ItemType.ARMOR, 10),
  ];
}