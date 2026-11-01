import { DestroyRef, ElementRef, Injector, NgZone, PLATFORM_ID, afterNextRender, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { NGX_GSAP_CONFIG, ReducedMotion } from '../config';

export type GsapScope = {
  /** Runs `fn` in the scope's GSAP context, outside Angular's zone. Everything it creates is reverted
   *  when the host is destroyed. Returns `undefined` on the server, where nothing runs. */
  run<T>(fn: (context: gsap.Context) => T): T | undefined;
  /** Reverts everything created so far. The scope stays usable. */
  revert(): void;
  /** Whether the system asks for reduced motion and the app respects it (`provideNgxGsap`). */
  readonly reducedMotion: boolean;
};

export type InjectGsapOptions = {
  /** What selector strings resolve against. Defaults to the host element. */
  scope?: Element | ElementRef<Element>;
  /** For calls outside an injection context. */
  injector?: Injector;
};

/**
 * Angular's counterpart to `useGSAP`: a GSAP context tied to the host's lifecycle.
 *
 * @example
 * private readonly gsap = injectGsap(() => {
 *   gsap.from('.card', { y: 24, opacity: 0, stagger: 0.1 });
 * });
 */
export function injectGsap(setup?: (context: gsap.Context) => void, options: InjectGsapOptions = {}): GsapScope {
  const injector = options.injector ?? inject(Injector);
  const ngZone = injector.get(NgZone);
  const config = injector.get(NGX_GSAP_CONFIG);
  const isBrowser = isPlatformBrowser(injector.get(PLATFORM_ID));
  const scope = options.scope ?? injector.get(ElementRef, null);
  const element = scope instanceof ElementRef ? scope.nativeElement : scope ?? undefined;

  let context: gsap.Context | undefined;
  const current = (): gsap.Context => (context ??= gsap.context(() => undefined, element));

  const gsapScope: GsapScope = {
    run: (fn) => (isBrowser ? ngZone.runOutsideAngular(() => current().add(() => fn(current()))) : undefined),
    revert: () => {
      context?.revert();
      context = undefined;
    },
    get reducedMotion() {
      return isBrowser && ReducedMotion.isPreferred(config);
    },
  };

  injector.get(DestroyRef).onDestroy(() => gsapScope.revert());
  if (setup) afterNextRender(() => gsapScope.run(setup), { injector });

  return gsapScope;
}
