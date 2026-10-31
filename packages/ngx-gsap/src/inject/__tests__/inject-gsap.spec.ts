import { Component, NgZone, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { gsap } from 'gsap';
import { provideNgxGsap } from '../../config';
import { GsapScope, injectGsap } from '../inject-gsap';

let ranInZone: boolean | undefined;

@Component({ template: `<div class="box"></div>` })
class HostComponent {
  public readonly scope: GsapScope = injectGsap(() => {
    ranInZone = NgZone.isInAngularZone();
    gsap.to('.box', { x: 100, duration: 1 });
  });
}

@Component({ template: `<div class="box"></div>` })
class ManualComponent {
  public readonly scope: GsapScope = injectGsap();
}

describe('injectGsap()', () => {
  const box = (fixture: ComponentFixture<unknown>): HTMLElement => fixture.nativeElement.querySelector('.box');

  const render = async <T>(type: new () => T): Promise<ComponentFixture<T>> => {
    const fixture = TestBed.createComponent(type);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  };

  afterEach(() => {
    ranInZone = undefined;
    jest.restoreAllMocks();
  });

  it('should run its setup after the first render, resolving selectors inside the host', async () => {
    const fixture = await render(HostComponent);

    expect(gsap.getTweensOf(box(fixture))).toHaveLength(1);
  });

  it('should run outside the Angular zone', async () => {
    await render(HostComponent);

    expect(ranInZone).toBe(false);
  });

  it('should revert what it created when the host is destroyed', async () => {
    const fixture = await render(HostComponent);
    const element = box(fixture);
    gsap.getTweensOf(element)[0].progress(1);
    expect(gsap.getProperty(element, 'x')).toBe(100);

    fixture.destroy();

    expect(gsap.getTweensOf(element)).toHaveLength(0);
    expect(gsap.getProperty(element, 'x')).toBe(0);
  });

  it('should stay usable after a manual revert', async () => {
    const fixture = await render(ManualComponent);
    const { scope } = fixture.componentInstance;
    scope.run(() => gsap.to('.box', { x: 50 }));

    scope.revert();
    scope.run(() => gsap.to('.box', { y: 50 }));

    expect(gsap.getTweensOf(box(fixture))).toHaveLength(1);
  });

  it('should return what the function returns', async () => {
    const fixture = await render(ManualComponent);

    expect(fixture.componentInstance.scope.run(() => 42)).toBe(42);
  });

  it('should do nothing on the server', () => {
    TestBed.configureTestingModule({ providers: [{ provide: PLATFORM_ID, useValue: 'server' }] });
    const fixture = TestBed.createComponent(ManualComponent);
    const fn = jest.fn();

    expect(fixture.componentInstance.scope.run(fn)).toBeUndefined();
    expect(fn).not.toHaveBeenCalled();
  });

  it('should report reduced motion as the app config decides', async () => {
    jest.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList);
    expect((await render(ManualComponent)).componentInstance.scope.reducedMotion).toBe(true);

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [provideNgxGsap({ reducedMotion: 'ignore' })] });
    expect((await render(ManualComponent)).componentInstance.scope.reducedMotion).toBe(false);
  });
});
