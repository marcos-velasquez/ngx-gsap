import { PresetMatcher } from '../preset-matcher';

describe('PresetMatcher', () => {
  describe('isFunction()', () => {
    it('should return true for function syntax with empty args', () => {
      const matcher = new PresetMatcher('fadeIn()');
      expect(matcher.isFunction()).toBe(true);
    });

    it('should return true for function syntax with args', () => {
      const matcher = new PresetMatcher('fadeOut({ x: "100%" })');
      expect(matcher.isFunction()).toBe(true);
    });

    it('should return false for non-function syntax', () => {
      const matcher = new PresetMatcher('fadeIn');
      expect(matcher.isFunction()).toBe(false);
    });

    it('should return false for raw sequences', () => {
      const matcher = new PresetMatcher('x:100%:>');
      expect(matcher.isFunction()).toBe(false);
    });
  });

  describe('presetName getter', () => {
    it('should extract preset name from function syntax', () => {
      const matcher = new PresetMatcher('fadeOut({ x: "100%" })');
      expect(matcher.presetName).toBe('fadeOut');
    });

    it('should extract preset name from empty args', () => {
      const matcher = new PresetMatcher('bounceIn()');
      expect(matcher.presetName).toBe('bounceIn');
    });
  });

  describe('argsString getter', () => {
    it('should extract args string', () => {
      const matcher = new PresetMatcher('fadeOut({ x: "100%" })');
      expect(matcher.argsString).toBe('{ x: "100%" }');
    });

    it('should return empty string for no args', () => {
      const matcher = new PresetMatcher('fadeIn()');
      expect(matcher.argsString).toBe('');
    });

    it('should handle whitespace in args', () => {
      const matcher = new PresetMatcher('fadeOut(   )');
      expect(matcher.argsString).toBe('   ');
    });
  });

  describe('isValidPreset()', () => {
    it('should return true for valid preset with function syntax', () => {
      const matcher = new PresetMatcher('fadeIn()');
      expect(matcher.isPreset()).toBe(true);
    });

    it('should return true for valid preset with args', () => {
      const matcher = new PresetMatcher('fadeOut({ x: "100%" })');
      expect(matcher.isPreset()).toBe(true);
    });

    it('should return false for unknown preset', () => {
      const matcher = new PresetMatcher('unknownPreset()');
      expect(matcher.isPreset()).toBe(false);
    });

    it('should return true for preset without parentheses', () => {
      const matcher = new PresetMatcher('fadeIn');
      expect(matcher.isPreset()).toBe(true);
    });

    it('should return false for non-preset sequences', () => {
      const matcher = new PresetMatcher('x:100%:>');
      expect(matcher.isPreset()).toBe(false);
    });
  });

  describe('toPresetMatch()', () => {
    it('should return PresetMatch with args', () => {
      const matcher = new PresetMatcher('fadeOut({ x: "100%" })');
      const result = matcher.asPresetMatch();

      expect(result.presetName).toBe('fadeOut');
      expect(result.argsString).toBe('{ x: "100%" }');
      expect(result.hasArgs).toBe(true);
    });

    it('should return PresetMatch without args', () => {
      const matcher = new PresetMatcher('fadeIn()');
      const result = matcher.asPresetMatch();

      expect(result.presetName).toBe('fadeIn');
      expect(result.argsString).toBe('');
      expect(result.hasArgs).toBe(false);
    });

    it('should handle whitespace-only args as no args', () => {
      const matcher = new PresetMatcher('fadeIn(   )');
      const result = matcher.asPresetMatch();

      expect(result.hasArgs).toBe(false);
    });

    it('should throw error for non-function syntax', () => {
      const matcher = new PresetMatcher('fadeIn');
      expect(() => matcher.asPresetMatch()).toThrow();
    });
  });
});
