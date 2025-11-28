import { TweenVarsExtractor } from '../tween-vars-extractor';
import { PresetMatcher } from '../../preset-matcher';

describe('TweenVarsExtractor', () => {
  describe('extract()', () => {
    it('should extract customVars and exclude preset params', () => {
      const matcher = new PresetMatcher('fadeIn({ x: "100%", duration: 2, ease: "power2.out" })');
      const extractor = new TweenVarsExtractor(matcher);

      const result = extractor.extract();

      expect(result).toEqual({ duration: 2, ease: 'power2.out' });
    });

    it('should return empty object when no customVars', () => {
      const matcher = new PresetMatcher('fadeIn({ x: "100%", y: "-50%" })');
      const extractor = new TweenVarsExtractor(matcher);

      const result = extractor.extract();

      expect(result).toEqual({});
    });

    it('should return empty object when no args', () => {
      const matcher = new PresetMatcher('fadeIn()');
      const extractor = new TweenVarsExtractor(matcher);

      const result = extractor.extract();

      expect(result).toEqual({});
    });

    it('should return empty object when not a function', () => {
      const matcher = new PresetMatcher('fadeIn');
      const extractor = new TweenVarsExtractor(matcher);

      const result = extractor.extract();

      expect(result).toEqual({});
    });

    it('should handle multiple customVars', () => {
      const matcher = new PresetMatcher('fadeIn({ duration: 2, delay: 0.5, ease: "bounce.out", yoyo: true })');
      const extractor = new TweenVarsExtractor(matcher);

      const result = extractor.extract();

      expect(result).toEqual({ duration: 2, delay: 0.5, ease: 'bounce.out', yoyo: true });
    });

    it('should throw error for preset without destructured parameters', () => {
      const matcher = new PresetMatcher('fadeIn({ duration: 2 })');
      const extractor = new TweenVarsExtractor(matcher);

      expect(() => extractor.extract()).not.toThrow();
    });

    it('should exclude timeline parameter from customVars', () => {
      const matcher = new PresetMatcher('shake({ timeline: { repeat: 3 }, duration: 2 })');
      const extractor = new TweenVarsExtractor(matcher);

      const result = extractor.extract();

      expect(result).toEqual({ duration: 2 });
      expect(result).not.toHaveProperty('timeline');
    });

    it('should handle only timeline parameter', () => {
      const matcher = new PresetMatcher('shake({ timeline: { repeat: 1, yoyo: true } })');
      const extractor = new TweenVarsExtractor(matcher);

      const result = extractor.extract();

      expect(result).toEqual({});
    });

    it('should extract method-specific vars when to/from/set are present', () => {
      const matcher = new PresetMatcher('fadeIn({ to: { stagger: 0.5 }, from: { ease: "power2" } })');
      const extractor = new TweenVarsExtractor(matcher);

      const result = extractor.extract();

      expect(result).toEqual({ to: { stagger: 0.5 }, from: { ease: 'power2' } });
    });

    it('should extract only to vars when only to is specified', () => {
      const matcher = new PresetMatcher('zoomIn({ to: { stagger: 0.5, duration: 1 } })');
      const extractor = new TweenVarsExtractor(matcher);

      const result = extractor.extract();

      expect(result).toEqual({ to: { stagger: 0.5, duration: 1 } });
    });

    it('should extract set vars as empty object when set is specified empty', () => {
      const matcher = new PresetMatcher('fadeIn({ to: { stagger: 0.5 }, set: {} })');
      const extractor = new TweenVarsExtractor(matcher);

      const result = extractor.extract();

      expect(result).toEqual({ to: { stagger: 0.5 }, set: {} });
    });
  });
});
