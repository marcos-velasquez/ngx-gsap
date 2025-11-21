import { TimelineVarsResolver } from '../timeline/timeline-vars-resolver';
import { PresetMatcher } from '../preset-matcher';

describe('TimelineVarsResolver', () => {
  let resolver: TimelineVarsResolver;

  beforeEach(() => {
    resolver = new TimelineVarsResolver();
  });

  describe('resolve()', () => {
    it('should append timeline vars to sequence', () => {
      const matcher = new PresetMatcher('fadeIn({ timeline: { repeat: 2, yoyo: true } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('timeline@repeat=2,yoyo=true');
    });

    it('should return original sequence when no timeline vars', () => {
      const matcher = new PresetMatcher('fadeIn({ duration: 2 })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toBe('from:opacity:0:>');
    });

    it('should handle single timeline property', () => {
      const matcher = new PresetMatcher('fadeIn({ timeline: { repeat: 3 } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('timeline@repeat=3');
    });

    it('should handle multiple timeline properties', () => {
      const matcher = new PresetMatcher('fadeIn({ timeline: { repeat: 2, yoyo: true, delay: 1, duration: 2 } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('timeline@');
      expect(result).toContain('repeat=2');
      expect(result).toContain('yoyo=true');
      expect(result).toContain('delay=1');
      expect(result).toContain('duration=2');
    });

    it('should handle boolean values', () => {
      const matcher = new PresetMatcher('fadeIn({ timeline: { paused: true, reversed: false } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('paused=true');
      expect(result).toContain('reversed=false');
    });

    it('should handle numeric values', () => {
      const matcher = new PresetMatcher('fadeIn({ timeline: { repeat: -1, repeatDelay: 0.5 } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('repeat=-1');
      expect(result).toContain('repeatDelay=0.5');
    });

    it('should handle string values', () => {
      const matcher = new PresetMatcher('fadeIn({ timeline: { ease: "power2.out" } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('ease=power2.out');
    });

    it('should work with preset without parentheses', () => {
      const matcher = new PresetMatcher('fadeIn');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toBe('from:opacity:0:>');
    });

    it('should preserve existing sequence content', () => {
      const matcher = new PresetMatcher('fadeIn({ timeline: { repeat: 2 } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>;to:x:100:>');

      expect(result).toContain('from:opacity:0:>;to:x:100:>');
      expect(result).toContain('timeline@repeat=2');
    });

    it('should handle timeline alongside other properties', () => {
      const matcher = new PresetMatcher('fadeIn({ duration: 2, timeline: { repeat: 2 }, scroll: { scrub: true } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('timeline@repeat=2');
      expect(result).not.toContain('duration');
      expect(result).not.toContain('scroll');
    });
  });
});
