import { AnimationParser } from '../../animation-parser';
import { parseAnimations } from '../../__tests__/__helpers__';

describe('Tween Parsing', () => {
  describe('Basic parsing', () => {
    it('should parse single animation with from (default)', () => {
      const result = new AnimationParser('opacity:0:>').parse();
      const animations = parseAnimations(result);

      expect(animations.length).toBe(1);
      expect(animations[0]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { opacity: 0 },
        position: '>',
      });
    });

    it('should parse multiple animations', () => {
      const result = new AnimationParser('opacity:0:>;to:scale:2:>').parse();
      const animations = parseAnimations(result);

      expect(animations.length).toBe(2);
      expect(animations[0]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { opacity: 0 },
        position: '>',
      });
      expect(animations[1]).toEqual({ method: 'to', selector: undefined, vars: { scale: 2 }, position: '>' });
    });

    it('should handle to method', () => {
      const result = new AnimationParser('to:opacity:1:>').parse();
      const animations = parseAnimations(result);

      expect(animations[0].method).toBe('to');
      expect(animations[0].vars).toEqual({ opacity: 1 });
    });

    it('should filter out invalid animations', () => {
      const result = new AnimationParser('opacity:0:>;invalid;scale:2:>').parse();
      const animations = parseAnimations(result);

      expect(animations.length).toBe(2);
      expect(animations[0].vars).toEqual({ opacity: 0 });
      expect(animations[1].vars).toEqual({ scale: 2 });
    });

    it('should handle whitespace correctly', () => {
      const result = new AnimationParser('  opacity : 0 : > ; scale : 2 : >  ').parse();
      const animations = parseAnimations(result);

      expect(animations.length).toBe(2);
      expect(animations[0].vars).toHaveProperty('opacity ');
      expect(animations[1].vars).toHaveProperty('scale ');
    });
  });

  describe('Delimiters', () => {
    it('should parse multiple animations with semicolon delimiter', () => {
      const result = new AnimationParser('opacity:0:>;scale:2:>').parse();

      expect(parseAnimations(result).length).toBe(2);
      expect(parseAnimations(result)[0]).toEqual({ method: 'from', vars: { opacity: 0 }, position: '>' });
      expect(parseAnimations(result)[1]).toEqual({ method: 'from', vars: { scale: 2 }, position: '>' });
    });

    it('should parse multiple animations with comma delimiter', () => {
      const result = new AnimationParser('opacity:0:>;scale:2:>').parse();

      expect(parseAnimations(result).length).toBe(2);
      expect(parseAnimations(result)[0]).toEqual({ method: 'from', vars: { opacity: 0 }, position: '>' });
      expect(parseAnimations(result)[1]).toEqual({ method: 'from', vars: { scale: 2 }, position: '>' });
    });

    it('should parse multiple animations with mixed delimiters', () => {
      const result = new AnimationParser('opacity:0:>;scale:2:>;rotate:360:<').parse();

      expect(parseAnimations(result).length).toBe(3);
      expect(parseAnimations(result)[0].position).toBe('>');
      expect(parseAnimations(result)[1].position).toBe('>');
      expect(parseAnimations(result)[2].position).toBe('<');
    });
  });

  describe('Value parsing', () => {
    it('should parse numeric values correctly', () => {
      const result = new AnimationParser('rotate:360:>;scale:2.5:>').parse();

      expect(parseAnimations(result)[0].vars).toEqual({ rotate: 360 });
      expect(parseAnimations(result)[1].vars).toEqual({ scale: 2.5 });
    });

    it('should parse string values correctly', () => {
      const result = new AnimationParser('x:100%:>;y:-50px:>').parse();

      expect(parseAnimations(result)[0].vars).toEqual({ x: '100%' });
      expect(parseAnimations(result)[1].vars).toEqual({ y: '-50px' });
    });

    it('should handle negative numbers', () => {
      const result = new AnimationParser('x:-100:>;y:-50.5:>').parse();

      expect(parseAnimations(result)[0].vars).toEqual({ x: -100 });
      expect(parseAnimations(result)[1].vars).toEqual({ y: -50.5 });
    });
  });

  describe('Positions', () => {
    it('should respect custom positions', () => {
      const result = new AnimationParser('opacity:0:<;scale:2:+=1;rotate:360:-=0.5').parse();

      expect(parseAnimations(result)[0].position).toBe('<');
      expect(parseAnimations(result)[1].position).toBe('+=1');
      expect(parseAnimations(result)[2].position).toBe('-=0.5');
    });

    it('should handle numeric positions', () => {
      const result = new AnimationParser('x:200:0.5').parse();

      expect(parseAnimations(result)[0].position).toBe('0.5');
    });
  });

  describe('Methods (to/from/set)', () => {
    it('should mix from and to methods', () => {
      const result = new AnimationParser('opacity:0:>;to:scale:2:>').parse();

      expect(parseAnimations(result).length).toBe(2);
      expect(parseAnimations(result)[0]).toEqual({ method: 'from', vars: { opacity: 0 }, position: '>' });
      expect(parseAnimations(result)[1]).toEqual({ method: 'to', vars: { scale: 2 }, position: '>' });
    });

    it('should handle explicit from method', () => {
      const result = new AnimationParser('from:opacity:0:>').parse();

      expect(parseAnimations(result)[0].method).toBe('from');
      expect(parseAnimations(result)[0].vars).toEqual({ opacity: 0 });
    });

    it('should handle multiple to methods', () => {
      const result = new AnimationParser('to:width:500:<;to:opacity:1:>').parse();

      expect(parseAnimations(result).length).toBe(2);
      expect(parseAnimations(result)[0]).toEqual({ method: 'to', vars: { width: 500 }, position: '<' });
      expect(parseAnimations(result)[1]).toEqual({ method: 'to', vars: { opacity: 1 }, position: '>' });
    });

    it('should parse multiple set animations', () => {
      const result = new AnimationParser('set:scale:0;set:opacity:0;set:x:100%').parse();

      expect(parseAnimations(result).length).toBe(3);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'set',
        selector: undefined,
        vars: { scale: 0 },
        position: '>',
      });
      expect(parseAnimations(result)[1]).toEqual({
        method: 'set',
        selector: undefined,
        vars: { opacity: 0 },
        position: '>',
      });
      expect(parseAnimations(result)[2]).toEqual({
        method: 'set',
        selector: undefined,
        vars: { x: '100%' },
        position: '>',
      });
    });

    it('should parse set followed by to animations', () => {
      const result = new AnimationParser('set:scale:0;set:opacity:0;to:scale:1:>;to:opacity:1:>').parse();

      expect(parseAnimations(result).length).toBe(4);
      expect(parseAnimations(result)[0].method).toBe('set');
      expect(parseAnimations(result)[0].vars.scale).toBe(0);
      expect(parseAnimations(result)[1].method).toBe('set');
      expect(parseAnimations(result)[1].vars.opacity).toBe(0);
      expect(parseAnimations(result)[2].method).toBe('to');
      expect(parseAnimations(result)[2].vars.scale).toBe(1);
      expect(parseAnimations(result)[3].method).toBe('to');
      expect(parseAnimations(result)[3].vars.opacity).toBe(1);
    });
  });
});
