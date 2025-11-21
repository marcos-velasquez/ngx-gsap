import { CustomVarsResolver } from '../../custom/custom-vars-resolver';
import { PresetMatcher } from '../../preset-matcher';

describe('CustomVarsResolver', () => {
  let resolver: CustomVarsResolver;

  beforeEach(() => {
    resolver = new CustomVarsResolver();
  });

  describe('resolve()', () => {
    it('should append custom vars to sequence', () => {
      const matcher = new PresetMatcher('fadeIn({ duration: 2, ease: "power2.out" })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('duration=2');
      expect(result).toContain('ease=power2.out');
    });

    it('should return original sequence when no custom vars', () => {
      const matcher = new PresetMatcher('fadeIn()');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toBe('from:opacity:0:>');
    });

    it('should filter out timeline and scroll properties', () => {
      const matcher = new PresetMatcher('fadeIn({ duration: 2, timeline: { repeat: 2 }, scroll: { scrub: true } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('duration=2');
      expect(result).not.toContain('timeline');
      expect(result).not.toContain('scroll');
    });

    it('should handle multiple custom properties', () => {
      const matcher = new PresetMatcher('fadeIn({ duration: 2, delay: 0.5, ease: "power2.out" })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('duration=2');
      expect(result).toContain('delay=0.5');
      expect(result).toContain('ease=power2.out');
    });

    it('should handle boolean values', () => {
      const matcher = new PresetMatcher('fadeIn({ paused: true, reversed: false })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('paused=true');
      expect(result).toContain('reversed=false');
    });

    it('should handle numeric values', () => {
      const matcher = new PresetMatcher('fadeIn({ duration: 2, delay: 0.5 })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('duration=2');
      expect(result).toContain('delay=0.5');
    });

    it('should handle string values with quotes', () => {
      const matcher = new PresetMatcher('fadeIn({ ease: "power2.out", transformOrigin: "center center" })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('ease=power2.out');
      expect(result).toMatch(/transformOrigin=(center center|"center center")/);
    });

    it('should work with preset without parentheses', () => {
      const matcher = new PresetMatcher('fadeIn');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toBe('from:opacity:0:>');
    });
  });
});
