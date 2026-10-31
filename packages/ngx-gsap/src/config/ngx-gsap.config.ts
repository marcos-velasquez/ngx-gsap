import {
  EnvironmentProviders,
  InjectionToken,
  PLATFORM_ID,
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GsapPlugins, NgxGsapPlugins } from '../models/plugins';

export type NgxGsapConfig = {
  /** `respect` rests every animation at its end when the system asks for reduced motion; `ignore`
   *  always animates. */
  reducedMotion: 'respect' | 'ignore';
  /** Plugins to register up front instead of loading them the first time a sequence needs them. */
  plugins: NgxGsapPlugins;
};

const DEFAULT_CONFIG: NgxGsapConfig = { reducedMotion: 'respect', plugins: {} };

export const NGX_GSAP_CONFIG = new InjectionToken<NgxGsapConfig>('NGX_GSAP_CONFIG', {
  providedIn: 'root',
  factory: () => DEFAULT_CONFIG,
});

export function provideNgxGsap(config: Partial<NgxGsapConfig> = {}): EnvironmentProviders {
  const resolved: NgxGsapConfig = { ...DEFAULT_CONFIG, ...config };
  return makeEnvironmentProviders([
    { provide: NGX_GSAP_CONFIG, useValue: resolved },
    provideEnvironmentInitializer(() => {
      if (isPlatformBrowser(inject(PLATFORM_ID))) GsapPlugins.register(resolved.plugins);
    }),
  ]);
}
