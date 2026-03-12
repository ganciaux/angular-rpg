export interface Hero {
  id: string;
  name: string;
  hp: number;
  level: number;
  stats: HeroStats;
}

export enum HeroStatLabel {
  Strength = 'Strength',
  Agility = 'Agility',
  Intelligence = 'Intelligence',
}

export type HeroStats = Record<HeroStatLabel, number>;

export const HERO_STAT_LIST = Object.values(HeroStatLabel) as HeroStatLabel[];

export const HERO_INITIAL_HP = 100;
export const HERO_INITIAL_LEVEL = 1;
export const HERO_INITIAL_NAME = 'Hero';

export const HERO_INITIAL_STATS: HeroStats = {
  Strength: 10,
  Agility: 9,
  Intelligence: 8,
};

export function createHero(partial?: Partial<Hero>): Hero {
  return {
    id: crypto.randomUUID(),
    name: HERO_INITIAL_NAME,
    hp: HERO_INITIAL_HP,
    level: HERO_INITIAL_LEVEL,
    stats: {...HERO_INITIAL_STATS},
    ...partial,
  };
}
