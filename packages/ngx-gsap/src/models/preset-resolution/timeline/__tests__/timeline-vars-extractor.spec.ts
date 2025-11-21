import { PresetMatcher } from '../../preset-matcher';
import { TimelineVarsExtractor } from '../../timeline';

describe('TimelineVarsExtractor', () => {
  it('should extract timeline vars from preset with timeline parameter', () => {
    const matcher = new PresetMatcher('shake({ timeline: { repeat: 3, yoyo: true } })');
    const extractor = new TimelineVarsExtractor(matcher);
    const result = extractor.extract();

    expect(result).toEqual({ repeat: 3, yoyo: true });
  });

  it('should return empty object when no timeline parameter', () => {
    const matcher = new PresetMatcher('fadeIn({ x: "-100%" })');
    const extractor = new TimelineVarsExtractor(matcher);
    const result = extractor.extract();

    expect(result).toEqual({});
  });

  it('should return empty object when preset has no args', () => {
    const matcher = new PresetMatcher('fadeIn()');
    const extractor = new TimelineVarsExtractor(matcher);
    const result = extractor.extract();

    expect(result).toEqual({});
  });

  it('should return empty object when not a function preset', () => {
    const matcher = new PresetMatcher('fadeIn');
    const extractor = new TimelineVarsExtractor(matcher);
    const result = extractor.extract();

    expect(result).toEqual({});
  });

  it('should extract complex timeline vars', () => {
    const matcher = new PresetMatcher('pulse({ timeline: { repeat: -1, repeatDelay: 1, ease: "power2.inOut" } })');
    const extractor = new TimelineVarsExtractor(matcher);
    const result = extractor.extract();

    expect(result).toEqual({ repeat: -1, repeatDelay: 1, ease: 'power2.inOut' });
  });

  it('should handle timeline with other parameters', () => {
    const matcher = new PresetMatcher('fadeIn({ x: "-100%", duration: 2, timeline: { repeat: 2 } })');
    const extractor = new TimelineVarsExtractor(matcher);
    const result = extractor.extract();

    expect(result).toEqual({ repeat: 2 });
  });
});
