import { Component, ErrorHandler, NgZone, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimateClickDirective } from '../animate-click.directive';
import { AnimateEnterDirective } from '../animate-enter.directive';
import { AnimateHoverDirective } from '../animate-hover.directive';
import { AnimateLoadDirective } from '../animate-load.directive';
import { AnimateScrollDirective } from '../animate-scroll.directive';
import { AnimateDirective } from '../animate.directive';

const IMPORTS = [
  AnimateDirective,
  AnimateClickDirective,
  AnimateEnterDirective,
  AnimateHoverDirective,
  AnimateLoadDirective,
  AnimateScrollDirective,
];

const host = (template: string): Type<unknown> => {
  @Component({ imports: IMPORTS, template })
  class HostComponent {
    public started = 0;
    public startedInZone?: boolean;
    public onStart(): void {
      this.started += 1;
      this.startedInZone = NgZone.isInAngularZone();
    }
  }
  return HostComponent;
};

const render = async (template: string): Promise<ComponentFixture<unknown>> => {
  const fixture = TestBed.createComponent(host(template));
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
};

const directiveOf = <T extends AnimateDirective>(fixture: ComponentFixture<unknown>, type: Type<T>): T =>
  fixture.debugElement.query(By.directive(type)).injector.get(type);

const elementOf = (fixture: ComponentFixture<unknown>): HTMLElement =>
  fixture.debugElement.query(By.css('[data-target]')).nativeElement;

describe('AnimateDirective', () => {
  afterEach(() => jest.restoreAllMocks());

  it('should run GSAP outside the Angular zone, even when played from inside it', async () => {
    const fixture = await render(`<div data-target animateClick="to:x:100:0"></div>`);
    const directive = directiveOf(fixture, AnimateClickDirective);
    let playedInZone: boolean | undefined;
    jest.spyOn(directive.timeline().timeline, 'play').mockImplementation(function (this: gsap.core.Timeline) {
      playedInZone = NgZone.isInAngularZone();
      return this;
    });

    TestBed.inject(NgZone).run(() => directive.play());

    expect(playedInZone).toBe(false);
  });

  it('should emit its outputs inside the Angular zone', async () => {
    const fixture = await render(`<div data-target animateClick="to:x:100:0" (animateStart)="onStart()"></div>`);
    const directive = directiveOf(fixture, AnimateClickDirective);

    TestBed.inject(NgZone).runOutsideAngular(() => directive.timeline().timeline.progress(1, false));

    const component = fixture.componentInstance as { started: number; startedInZone: boolean };
    expect(component.started).toBe(1);
    expect(component.startedInZone).toBe(true);
  });

  it('should not fail when destroyed before it ever rendered, as on the server', () => {
    const server = globalThis as { ngServerMode?: boolean };
    const handleError = jest.fn();
    TestBed.configureTestingModule({ providers: [{ provide: ErrorHandler, useValue: { handleError } }] });
    server.ngServerMode = true;
    try {
      const fixture = TestBed.createComponent(host(`<div data-target animateClick="to:x:100:0"></div>`));
      fixture.detectChanges();

      expect(() => fixture.destroy()).not.toThrow();
      expect(handleError).not.toHaveBeenCalled();
    } finally {
      delete server.ngServerMode;
    }
  });

  it('should revert the ScrollTrigger it created when destroyed', async () => {
    const before = ScrollTrigger.getAll().length;
    const fixture = await render(`<div data-target animateScroll="to:x:100:0"></div>`);
    expect(ScrollTrigger.getAll()).toHaveLength(before + 1);

    fixture.destroy();

    expect(ScrollTrigger.getAll()).toHaveLength(before);
  });

  it('should put the text it split back together when destroyed', async () => {
    const fixture = await render(`<p data-target animateLoad="from:opacity:0:>;splitText@type='chars'">Hola</p>`);
    const element = elementOf(fixture);
    expect(element.children.length).toBeGreaterThan(0);

    fixture.destroy();

    expect(element.children).toHaveLength(0);
    expect(element.textContent).toBe('Hola');
  });

  it('should take a typed preset as well as its string form', async () => {
    const fixture = await render(`<div data-target [animateClick]="{ preset: 'fadeIn', x: '-100%' }"></div>`);

    expect(directiveOf(fixture, AnimateClickDirective).timeline().timeline.getChildren().length).toBeGreaterThan(0);
  });

  it('should rest a load animation at its end when the system asks for reduced motion', async () => {
    jest.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList);

    const fixture = await render(`<div data-target animateLoad="to:x:100:0@duration=5"></div>`);

    expect(gsap.getProperty(elementOf(fixture), 'x')).toBe(100);
  });

  it('should take its trigger as an input on the universal directive', async () => {
    const fixture = await render(`<div data-target animate="to:x:100:0" trigger="click"></div>`);
    const play = jest.spyOn(directiveOf(fixture, AnimateDirective).timeline(), 'play');

    elementOf(fixture).click();

    expect(play).toHaveBeenCalledTimes(1);
  });

  it('should play on hover', async () => {
    const fixture = await render(`<div data-target animateHover="to:x:100:0"></div>`);
    const play = jest.spyOn(directiveOf(fixture, AnimateHoverDirective).timeline(), 'play');

    elementOf(fixture).dispatchEvent(new MouseEvent('mouseenter'));

    expect(play).toHaveBeenCalledTimes(1);
  });

  it('should keep the 1.x name working, warning once that it is deprecated', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    const fixture = await render(
      `<div data-target animateEnter="to:x:100:0"></div><div animateEnter="to:y:10:0"></div>`
    );
    const play = jest.spyOn(directiveOf(fixture, AnimateEnterDirective).timeline(), 'play');

    elementOf(fixture).dispatchEvent(new MouseEvent('mouseenter'));

    expect(play).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('[animateEnter] is deprecated');
  });
});
