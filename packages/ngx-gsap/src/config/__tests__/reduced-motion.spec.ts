import { NgxGsapConfig } from '../ngx-gsap.config';
import { ReducedMotion } from '../reduced-motion';

describe('ReducedMotion.isPreferred()', () => {
  const respect: NgxGsapConfig = { reducedMotion: 'respect', plugins: {} };
  const ignore: NgxGsapConfig = { reducedMotion: 'ignore', plugins: {} };
  const systemAsks = (matches: boolean): jest.SpyInstance =>
    jest.spyOn(window, 'matchMedia').mockReturnValue({ matches } as MediaQueryList);

  afterEach(() => jest.restoreAllMocks());

  it('should be preferred when the system asks for it and the app respects it', () => {
    systemAsks(true);
    expect(ReducedMotion.isPreferred(respect)).toBe(true);
  });

  it('should not be preferred when the app ignores it', () => {
    systemAsks(true);
    expect(ReducedMotion.isPreferred(ignore)).toBe(false);
  });

  it('should not be preferred when the system does not ask for it', () => {
    systemAsks(false);
    expect(ReducedMotion.isPreferred(respect)).toBe(false);
  });

  it('should ask the system through prefers-reduced-motion', () => {
    const matchMedia = systemAsks(false);
    ReducedMotion.isPreferred(respect);
    expect(matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
  });
});
