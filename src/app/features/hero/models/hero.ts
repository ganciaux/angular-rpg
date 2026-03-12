export enum GameStatus {
  STOP,
  PLAYING,
  VICTORY,
  GAME_OVER,
}

export const GAME_STATUS_LABEL: Record<GameStatus, string> = {
  [GameStatus.STOP]: 'Stop',
  [GameStatus.PLAYING]: 'Playing',
  [GameStatus.VICTORY]: 'Victory',
  [GameStatus.GAME_OVER]: 'Game Over',
};

export interface Hero {
  id: string;
  name: string;
  hp: number;
  level: number;
  attack: number;
  stats: HeroStats;
}

export interface Enemy {
  id: string;
  name: string;
  hp: number;
  hpMax?: number;
  attack: number;
}

export enum HeroStatLabel {
  Strength = 'Strength',
  Agility = 'Agility',
  Intelligence = 'Intelligence',
}

export type HeroStats = Record<HeroStatLabel, number>;

export const HERO_STAT_LIST = Object.values(HeroStatLabel) as HeroStatLabel[];

export const HERO_INITIAL_HP = 100;
export const HERO_INITIAL_ATTACK = 10;
export const HERO_INITIAL_LEVEL = 1;
export const HERO_INITIAL_NAME = 'Hero';
export const HERO_MAX_HP = 100;

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
    attack: HERO_INITIAL_ATTACK,
    stats: { ...HERO_INITIAL_STATS },
    ...partial,
  };
}

export function createEnemy(partial?: Partial<Enemy>): Enemy {
  return {
    id: crypto.randomUUID(),
    name: 'Enemy',
    hp: HERO_INITIAL_HP,
    hpMax: HERO_INITIAL_HP,
    attack: HERO_INITIAL_ATTACK,
    ...partial,
  };
}

export function createGoblin(): Enemy {
  return createEnemy({
    name: 'Goblin',
    hp: 30,
    hpMax: 30,
    attack: 5,
  });
}
