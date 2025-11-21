import { ScrollVarsResolver } from '../scroll/scroll-vars-resolver';
import { PresetMatcher } from '../preset-matcher';

describe('ScrollVarsResolver', () => {
  let resolver: ScrollVarsResolver;

  beforeEach(() => {
    resolver = new ScrollVarsResolver();
  });

  describe('resolve()', () => {
    it('should append scroll vars to sequence', () => {
      const matcher = new PresetMatcher('fadeIn({ scroll: { trigger: ".container", scrub: true } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('scroll@trigger=.container,scrub=true');
    });

    it('should return original sequence when no scroll vars', () => {
      const matcher = new PresetMatcher('fadeIn({ duration: 2 })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toBe('from:opacity:0:>');
    });

    it('should handle single scroll property', () => {
      const matcher = new PresetMatcher('fadeIn({ scroll: { scrub: true } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('scroll@scrub=true');
    });

    it('should handle multiple scroll properties', () => {
      const matcher = new PresetMatcher(
        'fadeIn({ scroll: { trigger: ".box", start: "top center", end: "bottom top", scrub: true, pin: true } })'
      );

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('scroll@');
      expect(result).toContain('trigger=.box');
      expect(result).toMatch(/start=(top center|"top center")/);
      expect(result).toMatch(/end=(bottom top|"bottom top")/);
      expect(result).toContain('scrub=true');
      expect(result).toContain('pin=true');
    });

    it('should handle boolean values', () => {
      const matcher = new PresetMatcher('fadeIn({ scroll: { scrub: false, pin: true, markers: false } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('scrub=false');
      expect(result).toContain('pin=true');
      expect(result).toContain('markers=false');
    });

    it('should handle numeric scrub value', () => {
      const matcher = new PresetMatcher('fadeIn({ scroll: { scrub: 2.5 } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('scrub=2.5');
    });

    it('should handle string values', () => {
      const matcher = new PresetMatcher('fadeIn({ scroll: { trigger: ".container", start: "top center" } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('trigger=.container');
      expect(result).toMatch(/start=(top center|"top center")/);
    });

    it('should handle toggleActions string', () => {
      const matcher = new PresetMatcher('fadeIn({ scroll: { toggleActions: "play reverse play reverse" } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toMatch(/toggleActions=(play reverse play reverse|"play reverse play reverse")/);
    });

    it('should work with preset without parentheses', () => {
      const matcher = new PresetMatcher('fadeIn');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toBe('from:opacity:0:>');
    });

    it('should preserve existing sequence content', () => {
      const matcher = new PresetMatcher('fadeIn({ scroll: { scrub: true } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>;to:x:100:>');

      expect(result).toContain('from:opacity:0:>;to:x:100:>');
      expect(result).toContain('scroll@scrub=true');
    });

    it('should handle scroll alongside other properties', () => {
      const matcher = new PresetMatcher('fadeIn({ duration: 2, timeline: { repeat: 2 }, scroll: { scrub: true } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('scroll@scrub=true');
      expect(result).not.toContain('duration');
      expect(result).not.toContain('timeline');
    });

    it('should handle complex scroll configuration', () => {
      const matcher = new PresetMatcher(
        'fadeIn({ scroll: { trigger: ".section", start: "top 80%", end: "bottom 20%", scrub: 1.5, pin: true, markers: true } })'
      );

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('trigger=.section');
      expect(result).toMatch(/start=(top 80%|"top 80%")/);
      expect(result).toMatch(/end=(bottom 20%|"bottom 20%")/);
      expect(result).toContain('scrub=1.5');
      expect(result).toContain('pin=true');
      expect(result).toContain('markers=true');
    });
  });
});
