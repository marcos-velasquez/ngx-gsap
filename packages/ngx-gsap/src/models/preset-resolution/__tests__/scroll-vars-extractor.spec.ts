import { PresetMatcher } from '../preset-matcher';
import { ScrollVarsExtractor } from '../scroll';

describe('ScrollVarsExtractor', () => {
  it('should extract scroll from preset function', () => {
    const matcher = new PresetMatcher('fadeIn({ scroll: { scrub: true, pin: true } })');
    const extractor = new ScrollVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({ scrub: true, pin: true });
  });

  it('should extract scroll with multiple properties', () => {
    const matcher = new PresetMatcher(
      'slideIn({ scroll: { start: "top center", end: "bottom top", scrub: 1, markers: true } })'
    );
    const extractor = new ScrollVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({
      start: 'top center',
      end: 'bottom top',
      scrub: 1,
      markers: true,
    });
  });

  it('should extract scroll with toggleActions', () => {
    const matcher = new PresetMatcher('fadeOut({ scroll: { toggleActions: "play reverse play reverse" } })');
    const extractor = new ScrollVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({ toggleActions: 'play reverse play reverse' });
  });

  it('should return empty object when no scroll property', () => {
    const matcher = new PresetMatcher('fadeIn({ x: 100, duration: 2 })');
    const extractor = new ScrollVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({});
  });

  it('should return empty object when preset has no arguments', () => {
    const matcher = new PresetMatcher('fadeIn()');
    const extractor = new ScrollVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({});
  });

  it('should return empty object when not a function preset', () => {
    const matcher = new PresetMatcher('fadeIn');
    const extractor = new ScrollVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({});
  });

  it('should extract scroll alongside other properties', () => {
    const matcher = new PresetMatcher(
      'fadeIn({ x: 100, duration: 2, scroll: { scrub: true }, timeline: { repeat: 2 } })'
    );
    const extractor = new ScrollVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({ scrub: true });
  });

  it('should handle boolean values correctly', () => {
    const matcher = new PresetMatcher('fadeIn({ scroll: { scrub: false, pin: true, markers: false } })');
    const extractor = new ScrollVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({ scrub: false, pin: true, markers: false });
  });

  it('should handle numeric scrub value', () => {
    const matcher = new PresetMatcher('fadeIn({ scroll: { scrub: 2.5 } })');
    const extractor = new ScrollVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({ scrub: 2.5 });
  });
});
