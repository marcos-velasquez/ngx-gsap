import { AnimationParser } from '../animation-parser';
import { parseAnimations } from './__helpers__';

describe('Preset Parsing', () => {
  describe('Basic presets', () => {
    it('should resolve fadeIn preset with parentheses', () => {
      const result = new AnimationParser('fadeIn()').parse();

      expect(parseAnimations(result).length).toBe(3);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { x: 0 },
        position: '0',
      });
      expect(parseAnimations(result)[1]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { y: 0 },
        position: '0',
      });
      expect(parseAnimations(result)[2]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { opacity: 0 },
        position: '<',
      });
    });

    it('should resolve fadeIn preset without parentheses', () => {
      const result = new AnimationParser('fadeIn').parse();

      expect(parseAnimations(result).length).toBe(3);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { x: 0 },
        position: '0',
      });
      expect(parseAnimations(result)[1]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { y: 0 },
        position: '0',
      });
      expect(parseAnimations(result)[2]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { opacity: 0 },
        position: '<',
      });
    });

    it('should resolve preset with multiple animations', () => {
      const result = new AnimationParser('slideIn({ axis: "x", distance: "-100%" })').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { x: '-100%' },
        position: '0',
      });
    });

    it('should use sequence as-is if preset does not exist', () => {
      const result = new AnimationParser('customAnimation:1:>').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0].vars).toEqual({ customAnimation: 1 });
    });
  });

  describe('Preset customization', () => {
    it('should resolve preset with object syntax and custom opacity', () => {
      const result = new AnimationParser('fadeIn({ opacity: 0.1 })').parse();

      expect(parseAnimations(result).length).toBe(3);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { x: 0 },
        position: '0',
      });
      expect(parseAnimations(result)[1]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { y: 0 },
        position: '0',
      });
      expect(parseAnimations(result)[2]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { opacity: 0.1 },
        position: '<',
      });
    });

    it('should resolve preset with object syntax and custom x', () => {
      const result = new AnimationParser('slideIn({ axis: "x", distance: "-200%" })').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { x: '-200%' },
        position: '0',
      });
    });

    it('should resolve preset with object syntax and multiple parameters', () => {
      const result = new AnimationParser('slideIn({ axis: "y", distance: "-300%" })').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { y: '-300%' },
        position: '0',
      });
    });
  });

  describe('Custom GSAP properties', () => {
    it('should extract duration as custom var and not pass to preset', () => {
      const result = new AnimationParser('fadeOut({ duration: 20 })').parse();

      expect(parseAnimations(result).length).toBe(3);
      parseAnimations(result).forEach((anim) => {
        expect(anim.vars).toHaveProperty('duration', 20);
      });
    });

    it('should extract yoyo and repeat as custom vars', () => {
      const result = new AnimationParser('fadeIn({ yoyo: true, repeat: 2 })').parse();
      expect(parseAnimations(result).length).toBeGreaterThan(0);
      parseAnimations(result).forEach((anim) => {
        expect(anim.vars).toHaveProperty('yoyo', true);
        expect(anim.vars).toHaveProperty('repeat', 2);
      });
    });

    it('should mix preset params with custom GSAP properties', () => {
      const result = new AnimationParser('fadeOut({ x: "100%", y: "-50%", duration: 3, ease: "bounce.out" })').parse();

      expect(parseAnimations(result).length).toBe(3);
      expect(parseAnimations(result)[0].vars).toHaveProperty('x', '100%');
      expect(parseAnimations(result)[1].vars).toHaveProperty('y', '-50%');
      parseAnimations(result).forEach((anim) => {
        expect(anim.vars).toHaveProperty('duration', 3);
        expect(anim.vars).toHaveProperty('ease', 'bounce.out');
      });
    });
  });

  describe('Multiple presets', () => {
    it('should combine multiple presets with semicolon', () => {
      const result = new AnimationParser('fadeIn;fadeOut').parse();

      expect(parseAnimations(result).length).toBe(6); // fadeIn (3) + fadeOut (3)
    });

    it('should combine presets with parentheses', () => {
      const result = new AnimationParser('fadeIn();rotateIn()').parse();

      expect(parseAnimations(result).length).toBeGreaterThan(3);
    });

    it('should combine presets with parameters', () => {
      const result = new AnimationParser('fadeIn({ x: "-100%" });fadeOut({ x: "100%" })').parse();

      expect(parseAnimations(result).length).toBe(6);
      expect(parseAnimations(result)[0].vars.x).toBe('-100%');
    });

    it('should mix presets and raw syntax', () => {
      const result = new AnimationParser('fadeIn;opacity:1:>').parse();

      expect(parseAnimations(result).length).toBe(4); // fadeIn (3) + raw (1)
    });

    it('should combine multiple presets with selector', () => {
      const result = new AnimationParser('fadeIn({ selector: ".card" });rotateIn({ selector: ".card" })').parse();

      expect(parseAnimations(result).length).toBeGreaterThan(3);
      parseAnimations(result).forEach((anim) => {
        expect(anim.vars['selector']).toBe('.card');
      });
    });
  });

  describe('Selector in presets', () => {
    it('should extract selector from preset with object syntax', () => {
      const result = new AnimationParser('fadeIn({ selector: ".card" })').parse();

      expect(parseAnimations(result).length).toBe(3);
      parseAnimations(result).forEach((anim) => {
        expect(anim.vars['selector']).toBe('.card');
      });
    });

    it('should extract selector with custom preset params', () => {
      const result = new AnimationParser('slideIn({ selector: "> div", axis: "x", distance: "-200%" })').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0].vars['selector']).toBe('> div');
      expect(parseAnimations(result)[0].vars.x).toBe('-200%');
    });

    it('should extract selector with multiple custom vars', () => {
      const result = new AnimationParser(
        'fadeIn({ selector: ".card", duration: 2, ease: "power2.out", stagger: 0.5 })'
      ).parse();

      expect(parseAnimations(result).length).toBe(3);
      parseAnimations(result).forEach((anim) => {
        expect(anim.vars['selector']).toBe('.card');
        expect(anim.vars).toHaveProperty('duration', 2);
        expect(anim.vars).toHaveProperty('ease', 'power2.out');
        expect(anim.vars).toHaveProperty('stagger', 0.5);
      });
    });
  });
});
