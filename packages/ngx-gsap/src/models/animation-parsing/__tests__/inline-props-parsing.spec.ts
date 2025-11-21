import { AnimationParser } from '../animation-parser';
import { parseAnimations } from './__helpers__';

describe('Inline Props Parsing (@ syntax)', () => {
  describe('Basic inline props', () => {
    it('should parse single prop with @ syntax', () => {
      const result = new AnimationParser('opacity:0@duration=2').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'from',
        vars: { opacity: 0, duration: 2 },
        position: '>',
      });
    });

    it('should parse multiple props with @ syntax', () => {
      const result = new AnimationParser('scale:0@duration=2,ease=power2.out,yoyo=true').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0].vars).toEqual({
        scale: 0,
        duration: 2,
        ease: 'power2.out',
        yoyo: true,
      });
    });

    it('should parse props with explicit position', () => {
      const result = new AnimationParser('opacity:0:>@duration=3,delay=0.5').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'from',
        vars: { opacity: 0, duration: 3, delay: 0.5 },
        position: '>',
      });
    });

    it('should work without props (backward compatibility)', () => {
      const result = new AnimationParser('opacity:0:>').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'from',
        vars: { opacity: 0 },
        position: '>',
      });
    });
  });

  describe('Type handling', () => {
    it('should parse boolean props correctly', () => {
      const result = new AnimationParser('scale:1@yoyo=true,repeat=false').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0].vars).toEqual({
        scale: 1,
        yoyo: true,
        repeat: false,
      });
    });

    it('should parse numeric props correctly', () => {
      const result = new AnimationParser('x:100@duration=2.5,delay=0.3,repeat=3').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0].vars).toEqual({
        x: 100,
        duration: 2.5,
        delay: 0.3,
        repeat: 3,
      });
    });

    it('should parse string props correctly', () => {
      const result = new AnimationParser('opacity:0@ease=power2.inOut,onComplete=myFunc').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0].vars).toEqual({
        opacity: 0,
        ease: 'power2.inOut',
        onComplete: 'myFunc',
      });
    });

    it('should handle props with string values containing special characters', () => {
      const result = new AnimationParser('x:100%@ease=power2.out').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0].vars).toEqual({
        x: '100%',
        ease: 'power2.out',
      });
    });
  });

  describe('Nested objects', () => {
    it('should parse nested object with multiple props', () => {
      const result = new AnimationParser('x:100@duration=2,stagger={amount:0.5,from:end}').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0].vars).toEqual({
        x: 100,
        duration: 2,
        stagger: { amount: 0.5, from: 'end' },
      });
    });

    it('should parse complex nested stagger object', () => {
      const result = new AnimationParser('scale:0@stagger={amount:1,from:center,grid:auto,ease:power2.inOut}').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0].vars).toEqual({
        scale: 0,
        stagger: { amount: 1, from: 'center', grid: 'auto', ease: 'power2.inOut' },
      });
    });
  });

  describe('Methods and positions', () => {
    it('should work with to method', () => {
      const result = new AnimationParser('to:opacity:1@duration=2').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'to',
        vars: { opacity: 1, duration: 2 },
        position: '>',
      });
    });

    it('should parse props with different positions', () => {
      const result = new AnimationParser('opacity:0:<@duration=2').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'from',
        vars: { opacity: 0, duration: 2 },
        position: '<',
      });
    });
  });

  describe('Multiple animations', () => {
    it('should parse multiple animations with props', () => {
      const result = new AnimationParser('scale:0@duration=2;to:scale:1.2:>@ease=bounce.out;to:scale:1:>').parse();

      expect(parseAnimations(result).length).toBe(3);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'from',
        vars: { scale: 0, duration: 2 },
        position: '>',
      });
      expect(parseAnimations(result)[1]).toEqual({
        method: 'to',
        vars: { scale: 1.2, ease: 'bounce.out' },
        position: '>',
      });
      expect(parseAnimations(result)[2]).toEqual({
        method: 'to',
        vars: { scale: 1 },
        position: '>',
      });
    });

    it('should handle mixed animations with and without props', () => {
      const result = new AnimationParser('opacity:0@duration=2;scale:1.5:>;rotate:360@ease=bounce.out').parse();

      expect(parseAnimations(result).length).toBe(3);
      expect(parseAnimations(result)[0].vars).toEqual({ opacity: 0, duration: 2 });
      expect(parseAnimations(result)[1].vars).toEqual({ scale: 1.5 });
      expect(parseAnimations(result)[2].vars).toEqual({ rotate: 360, ease: 'bounce.out' });
    });
  });
});
