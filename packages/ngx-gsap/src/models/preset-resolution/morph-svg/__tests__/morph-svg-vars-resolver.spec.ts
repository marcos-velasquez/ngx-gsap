import { MorphSVGVarsResolver } from '../morph-svg-vars-resolver';
import { PresetMatcher } from '../../preset-matcher';

describe('MorphSVGVarsResolver', () => {
  let resolver: MorphSVGVarsResolver;

  beforeEach(() => {
    resolver = new MorphSVGVarsResolver();
  });

  describe('resolve()', () => {
    it('should append morphSVG vars to sequence', () => {
      const matcher = new PresetMatcher('fadeIn({ morphSVG: { shape: "#star", type: "linear" } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('morphSVG@shape="#star",type=linear');
    });

    it('should return original sequence when no morphSVG vars', () => {
      const matcher = new PresetMatcher('fadeIn({ duration: 2 })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toBe('from:opacity:0:>');
    });

    it('should handle single morphSVG property', () => {
      const matcher = new PresetMatcher('fadeIn({ morphSVG: { shape: "#circle" } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('morphSVG@shape="#circle"');
    });

    it('should handle multiple morphSVG properties', () => {
      const matcher = new PresetMatcher(
        'fadeIn({ morphSVG: { shape: "#lightning", type: "rotational", origin: "50% 50%", shapeIndex: 0 } })'
      );

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('morphSVG@');
      expect(result).toContain('shape="#lightning"');
      expect(result).toContain('type=rotational');
      expect(result).toContain('origin="50% 50%"');
      expect(result).toContain('shapeIndex=0');
    });

    it('should preserve existing sequence content', () => {
      const matcher = new PresetMatcher('fadeIn({ morphSVG: { shape: "#star", type: "linear" } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>;to:x:100:>');

      expect(result).toContain('from:opacity:0:>;to:x:100:>');
      expect(result).toContain('morphSVG@shape="#star",type=linear');
    });

    it('should handle morphSVG alongside other properties', () => {
      const matcher = new PresetMatcher(
        'fadeIn({ duration: 2, timeline: { repeat: 2 }, morphSVG: { shape: "#circle", type: "linear" } })'
      );

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('morphSVG@shape="#circle",type=linear');
      expect(result).not.toContain('duration');
      expect(result).not.toContain('timeline');
    });

    it('should handle rotational type', () => {
      const matcher = new PresetMatcher('fadeIn({ morphSVG: { shape: "#diamond", type: "rotational" } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('shape="#diamond"');
      expect(result).toContain('type=rotational');
    });

    it('should handle complex morphSVG configuration', () => {
      const matcher = new PresetMatcher(
        'fadeIn({ morphSVG: { shape: "#target", type: "linear", origin: "center", shapeIndex: 1, map: "complexity:0.5" } })'
      );

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('shape="#target"');
      expect(result).toContain('type=linear');
      expect(result).toContain('origin=center');
      expect(result).toContain('shapeIndex=1');
      expect(result).toContain('map="complexity:0.5"');
    });
  });
});
