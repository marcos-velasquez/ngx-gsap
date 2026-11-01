import { NgxGsapConfig } from './ngx-gsap.config';

export class ReducedMotion {
  private static readonly QUERY = '(prefers-reduced-motion: reduce)';

  public static isPreferred(config: NgxGsapConfig): boolean {
    return (
      config.reducedMotion === 'respect' && typeof matchMedia === 'function' && matchMedia(ReducedMotion.QUERY).matches
    );
  }
}
