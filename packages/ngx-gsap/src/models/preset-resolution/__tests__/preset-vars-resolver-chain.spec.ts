import { PresetVarsResolverChain } from '../preset-vars-resolver';
import { PresetMatcher } from '../preset-matcher';

describe('PresetVarsResolverChain', () => {
  describe('resolve()', () => {
    it('should resolve custom vars', () => {
      const matcher = new PresetMatcher('fadeIn({ duration: 2, ease: "power2.out" })');
      const chain = new PresetVarsResolverChain(matcher);

      const result = chain.resolve('from:opacity:0:>');

      expect(result).toContain('duration=2');
      expect(result).toContain('ease=power2.out');
    });

    it('should resolve timeline vars', () => {
      const matcher = new PresetMatcher('fadeIn({ timeline: { repeat: 2, yoyo: true } })');
      const chain = new PresetVarsResolverChain(matcher);

      const result = chain.resolve('from:opacity:0:>');

      expect(result).toContain('timeline@repeat=2,yoyo=true');
    });

    it('should resolve scroll vars', () => {
      const matcher = new PresetMatcher('fadeIn({ scroll: { trigger: ".container", scrub: true } })');
      const chain = new PresetVarsResolverChain(matcher);

      const result = chain.resolve('from:opacity:0:>');

      expect(result).toContain('scroll@trigger=.container,scrub=true');
    });

    it('should resolve all vars in sequence', () => {
      const matcher = new PresetMatcher('fadeIn({ duration: 2, timeline: { repeat: 2 }, scroll: { scrub: true } })');
      const chain = new PresetVarsResolverChain(matcher);

      const result = chain.resolve('from:opacity:0:>');

      expect(result).toContain('duration=2');
      expect(result).toContain('timeline@repeat=2');
      expect(result).toContain('scroll@scrub=true');
    });

    it('should return original sequence when no vars to resolve', () => {
      const matcher = new PresetMatcher('fadeIn()');
      const chain = new PresetVarsResolverChain(matcher);

      const result = chain.resolve('from:opacity:0:>');

      expect(result).toBe('from:opacity:0:>');
    });

    it('should handle complex sequences with multiple parts', () => {
      const matcher = new PresetMatcher('fadeIn({ duration: 2 })');
      const chain = new PresetVarsResolverChain(matcher);

      const result = chain.resolve('from:opacity:0:>;to:x:100:>');

      // Custom vars are appended to each part of the sequence
      expect(result).toContain('@duration=2');
      expect(result.split(';').length).toBe(2);
    });

    it('should apply all resolver types', () => {
      const matcher = new PresetMatcher(
        'fadeIn({ ease: "power2.out", timeline: { repeat: 2 }, scroll: { scrub: true } })'
      );
      const chain = new PresetVarsResolverChain(matcher);

      const result = chain.resolve('from:opacity:0:>');

      // All three types of vars should be present
      expect(result).toContain('ease=power2.out');
      expect(result).toContain('timeline@repeat=2');
      expect(result).toContain('scroll@scrub=true');
    });
  });
});
