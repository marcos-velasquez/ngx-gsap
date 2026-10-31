import { PresetExpander } from '../preset-expander';
import { PresetMatcher } from '../preset-matcher';

describe('PresetExpander', () => {
  describe('expand()', () => {
    it('should expand preset with parameters', () => {
      const matcher = new PresetMatcher('fadeIn({ x: "-100%" })');
      const expander = new PresetExpander(matcher);

      const result = expander.expand();

      expect(result).toContain('x:-100%');
      expect(result).toContain('opacity:0');
    });

    it('should expand preset without parameters', () => {
      const matcher = new PresetMatcher('fadeIn()');
      const expander = new PresetExpander(matcher);

      const result = expander.expand();

      expect(result).toContain('x:0');
      expect(result).toContain('opacity:0');
    });

    it('should expand preset without parentheses', () => {
      const matcher = new PresetMatcher('fadeIn');
      const expander = new PresetExpander(matcher);

      const result = expander.expand();

      expect(result).toContain('x:0');
      expect(result).toContain('opacity:0');
    });

    it('should expand preset with multiple parameters', () => {
      const matcher = new PresetMatcher('fadeOut({ x: "100%", y: "-50%" })');
      const expander = new PresetExpander(matcher);

      const result = expander.expand();

      expect(result).toContain('x:100%');
      expect(result).toContain('y:-50%');
    });

    it('should expand presets where evaluating code is blocked, as under a strict CSP', () => {
      const original = globalThis.Function;
      globalThis.Function = function () {
        throw new EvalError('Refused to evaluate a string as JavaScript');
      } as unknown as FunctionConstructor;

      try {
        const result = new PresetExpander(new PresetMatcher('fadeIn({ x: "-100%" })')).expand();
        expect(result).toContain('x:-100%');
      } finally {
        globalThis.Function = original;
      }
    });

    it('should return multiple sequences separated by semicolon', () => {
      const matcher = new PresetMatcher('fadeIn()');
      const expander = new PresetExpander(matcher);

      const result = expander.expand();

      expect(result).toContain(';');
      expect(result.split(';').length).toBeGreaterThan(1);
    });
  });
});
