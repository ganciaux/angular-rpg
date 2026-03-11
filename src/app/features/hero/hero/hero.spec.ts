import { TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero';

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
    expect(component.hero().name).toEqual('Hero');
    expect(component.hero().hp).toEqual(100);
    expect(component.hero().level).toEqual(1);
  });
});