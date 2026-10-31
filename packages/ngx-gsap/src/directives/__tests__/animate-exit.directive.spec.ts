import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { AnimateExitDirective } from '../animate-exit.directive';

@Component({
  imports: [AnimateExitDirective],
  template: `@if (shown()) {
    <p animateExit="to:opacity:0:0@duration=2">Bye</p>
    }`,
})
class HostComponent {
  public readonly shown = signal(true);
}

const flush = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0));

describe('AnimateExitDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let directive: AnimateExitDirective;
  let element: HTMLElement;

  const remove = async (): Promise<void> => {
    fixture.componentInstance.shown.set(false);
    fixture.detectChanges();
    await flush();
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({ animationsEnabled: true });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const debug = fixture.debugElement.query(By.directive(AnimateExitDirective));
    directive = debug.injector.get(AnimateExitDirective);
    element = debug.nativeElement;
  });

  afterEach(() => jest.restoreAllMocks());

  it('should keep the element in the DOM until its exit animation ends', async () => {
    await remove();
    expect(fixture.nativeElement.contains(element)).toBe(true);

    directive.timeline().timeline.progress(1, false);
    await flush();

    expect(fixture.nativeElement.contains(element)).toBe(false);
  });

  it('should play the exit animation when the element is removed', async () => {
    const play = jest.spyOn(directive.timeline(), 'play');

    await remove();

    expect(play).toHaveBeenCalledTimes(1);
  });

  it('should keep what it animates alive until the exit ends, and revert it after', async () => {
    await remove();
    expect(gsap.getTweensOf(element)).toHaveLength(1);

    directive.timeline().timeline.progress(1, false);
    await flush();

    expect(gsap.getTweensOf(element)).toHaveLength(0);
  });

  it('should let the element go at once when the system asks for reduced motion', async () => {
    jest.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList);

    await remove();

    expect(fixture.nativeElement.contains(element)).toBe(false);
  });
});
