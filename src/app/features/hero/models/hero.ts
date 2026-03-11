export interface Hero {
  id: number;
  name: string;
  hp: number;
  level: number;
  stats: HeroStats[];
}

export enum HeroStatLabel {
  Strength = 'Strength',
  Agility = 'Agility',
  Intelligence = 'Intelligence',
}

export interface HeroStats {
  label: HeroStatLabel;
  value: number;
}

export const HERO_INITIAL_HP = 100;
export const HERO_INITIAL_LEVEL = 1;
export const HERO_INITIAL_NAME = 'Hero';

export const HERO_INITIAL_STATS_STRENGTH = 10;
export const HERO_INITIAL_STATS_AGILITY = 9;
export const HERO_INITIAL_STATS_INTELLIGENCE = 8;

export function createHero(partial?: Partial<Hero>): Hero {
  return {
    id: 0,
    name: HERO_INITIAL_NAME,
    hp: HERO_INITIAL_HP,
    level: HERO_INITIAL_LEVEL,
    stats: [
      { label: HeroStatLabel.Strength, value: HERO_INITIAL_STATS_STRENGTH },
      { label: HeroStatLabel.Agility, value: HERO_INITIAL_STATS_AGILITY },
      { label: HeroStatLabel.Intelligence, value: HERO_INITIAL_STATS_INTELLIGENCE },
    ],
    ...partial,
  };
}
