import { ElementVarsResolver } from '../element-vars-resolver';
import { PresetMatcher } from '../../preset-matcher';

describe('ElementVarsResolver', () => {
  let resolver: ElementVarsResolver;

  beforeEach(() => {
    resolver = new ElementVarsResolver();
  });

  describe('resolve()', () => {
    it('should append element vars to sequence', () => {
      const matcher = new PresetMatcher('fadeIn({ element: { perspective: 1000, transformOrigin: "center" } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('element@perspective=1000,transformOrigin=center');
    });

    it('should return original sequence when no element vars', () => {
      const matcher = new PresetMatcher('fadeIn({ duration: 2 })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toBe('from:opacity:0:>');
    });

    it('should handle single element property', () => {
      const matcher = new PresetMatcher('fadeIn({ element: { perspective: 800 } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('element@perspective=800');
    });

    it('should handle multiple element properties', () => {
      const matcher = new PresetMatcher(
        'fadeIn({ element: { perspective: 500, transformOrigin: "50% 50%", overflow: "hidden" } })'
      );

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('element@');
      expect(result).toContain('perspective=500');
      expect(result).toContain('transformOrigin="50% 50%"');
      expect(result).toContain('overflow=hidden');
    });

    it('should work with preset without parentheses', () => {
      const matcher = new PresetMatcher('fadeIn');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toBe('from:opacity:0:>');
    });

    it('should preserve existing sequence content', () => {
      const matcher = new PresetMatcher('fadeIn({ element: { perspective: 1000 } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>;to:x:100:>');

      expect(result).toContain('from:opacity:0:>;to:x:100:>');
      expect(result).toContain('element@perspective=1000');
    });

    it('should handle element alongside other properties', () => {
      const matcher = new PresetMatcher(
        'fadeIn({ duration: 2, timeline: { repeat: 2 }, element: { perspective: 900, transformOrigin: "center" } })'
      );

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('element@perspective=900,transformOrigin=center');
      expect(result).not.toContain('duration');
      expect(result).not.toContain('timeline');
    });
  });
});
