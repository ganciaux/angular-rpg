import { TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero';
import {
  HeroStatLabel,
  HERO_INITIAL_HP,
  HERO_INITIAL_LEVEL,
  HERO_INITIAL_NAME,
  HERO_INITIAL_STATS_STRENGTH,
  HERO_INITIAL_STATS_AGILITY,
  HERO_INITIAL_STATS_INTELLIGENCE,
} from '../models/hero';

describe('HeroComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have correct initial hero stats', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    const component = fixture.componentInstance;
    expect(component.hero().name).toEqual(HERO_INITIAL_NAME);
    expect(component.hero().hp).toEqual(HERO_INITIAL_HP);
    expect(component.hero().level).toEqual(HERO_INITIAL_LEVEL);
    expect(component.hero().stats).toEqual([
      { label: HeroStatLabel.Strength, value: HERO_INITIAL_STATS_STRENGTH },
      { label: HeroStatLabel.Agility, value: HERO_INITIAL_STATS_AGILITY },
      { label: HeroStatLabel.Intelligence, value: HERO_INITIAL_STATS_INTELLIGENCE },
    ]);
  });

  it('should display dead message when hp is 0', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    const component = fixture.componentInstance;

    component.hero.set({ ...component.hero(), hp: 0 });
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('💀 Héros mort');
  });
});
