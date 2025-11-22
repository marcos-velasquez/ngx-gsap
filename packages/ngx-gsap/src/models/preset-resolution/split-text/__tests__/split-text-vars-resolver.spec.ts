import { SplitTextVarsResolver } from '../split-text-vars-resolver';
import { PresetMatcher } from '../../preset-matcher';

describe('SplitTextVarsResolver', () => {
  let resolver: SplitTextVarsResolver;

  beforeEach(() => {
    resolver = new SplitTextVarsResolver();
  });

  describe('resolve()', () => {
    it('should append splitText vars to sequence', () => {
      const matcher = new PresetMatcher('fadeIn({ splitText: { type: "chars", target: "chars" } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('splitText@type=chars,target=chars');
    });

    it('should return original sequence when no splitText vars', () => {
      const matcher = new PresetMatcher('fadeIn({ duration: 2 })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toBe('from:opacity:0:>');
    });

    it('should handle single splitText property', () => {
      const matcher = new PresetMatcher('fadeIn({ splitText: { type: "chars" } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('splitText@type=chars');
    });

    it('should handle multiple splitText properties', () => {
      const matcher = new PresetMatcher(
        'fadeIn({ splitText: { type: "chars,words,lines", target: "words", charsClass: "char" } })'
      );

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('splitText@');
      expect(result).toContain('type="chars,words,lines"');
      expect(result).toContain('target=words');
      expect(result).toContain('charsClass=char');
    });

    it('should work with preset without parentheses', () => {
      const matcher = new PresetMatcher('fadeIn');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toBe('from:opacity:0:>');
    });

    it('should preserve existing sequence content', () => {
      const matcher = new PresetMatcher('fadeIn({ splitText: { type: "chars", target: "chars" } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>;to:x:100:>');

      expect(result).toContain('from:opacity:0:>;to:x:100:>');
      expect(result).toContain('splitText@type=chars,target=chars');
    });

    it('should handle splitText alongside other properties', () => {
      const matcher = new PresetMatcher(
        'fadeIn({ duration: 2, timeline: { repeat: 2 }, splitText: { type: "chars", target: "chars" } })'
      );

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('splitText@type=chars,target=chars');
      expect(result).not.toContain('duration');
      expect(result).not.toContain('timeline');
    });

    it('should handle different target values', () => {
      const matcher = new PresetMatcher('fadeIn({ splitText: { type: "lines", target: "lines" } })');

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('target=lines');
      expect(result).toContain('type=lines');
    });

    it('should handle complex splitText configuration', () => {
      const matcher = new PresetMatcher(
        'fadeIn({ splitText: { type: "chars,words", target: "chars", charsClass: "char", wordsClass: "word" } })'
      );

      const result = resolver.resolve(matcher, 'from:opacity:0:>');

      expect(result).toContain('type="chars,words"');
      expect(result).toContain('target=chars');
      expect(result).toContain('charsClass=char');
      expect(result).toContain('wordsClass=word');
    });
  });
});
