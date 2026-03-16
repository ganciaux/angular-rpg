import { TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero';
import {
  HERO_INITIAL_HP,
  HERO_INITIAL_LEVEL,
  HERO_INITIAL_NAME,
  HERO_INITIAL_STATS,
  HERO_MAX_HP,
  HERO_INITIAL_ATTACK,
} from '../models/hero';
import { HeroService } from '../services/hero';

describe('HeroComponent', () => {
  let heroService: HeroService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
      providers: [HeroService],
    }).compileComponents();
    heroService = TestBed.inject(HeroService);
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have correct initial hero stats', () => {
    
    expect(heroService.hero().name).toEqual(HERO_INITIAL_NAME);
    expect(heroService.hero().hp).toEqual(HERO_INITIAL_HP);
    expect(heroService.hero().level).toEqual(HERO_INITIAL_LEVEL);
    expect(heroService.hero().hpMax).toEqual(HERO_MAX_HP);
    expect(heroService.hero().attack).toEqual(HERO_INITIAL_ATTACK);
    expect(heroService.hero().stats).toEqual({ ...HERO_INITIAL_STATS });
  });

  it('should display dead message when hp is 0', () => {
    const fixture = TestBed.createComponent(HeroComponent);

    heroService.hero.set({ ...heroService.hero(), hp: 0 });
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('💀 Dead');
  });
});
