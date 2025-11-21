import { SequenceParser } from '../features/tween';

describe('SequenceParser', () => {
  describe('parse()', () => {
    it('should parse basic animation', () => {
      const result = new SequenceParser('x:100%:>').parse();

      expect(result).toEqual({
        method: 'from',
        selector: undefined,
        vars: { x: '100%' },
        position: '>',
      });
    });

    it('should parse animation with numeric value', () => {
      const result = new SequenceParser('opacity:0:<').parse();

      expect(result).toEqual({
        method: 'from',
        selector: undefined,
        vars: { opacity: 0 },
        position: '<',
      });
    });

    it('should parse animation with to method', () => {
      const result = new SequenceParser('to:x:100%:>').parse();

      expect(result).toEqual({
        method: 'to',
        selector: undefined,
        vars: { x: '100%' },
        position: '>',
      });
    });

    it('should parse animation with from method', () => {
      const result = new SequenceParser('from:y:-50%:0').parse();

      expect(result).toEqual({
        method: 'from',
        selector: undefined,
        vars: { y: '-50%' },
        position: '0',
      });
    });

    it('should parse animation with props syntax', () => {
      const result = new SequenceParser('x:100%:>@duration:2').parse();

      expect(result?.method).toBe('from');
      expect(result?.vars.x).toBe('100%');
      expect(result?.position).toBe('>');
    });

    it('should use default method when not specified', () => {
      const result = new SequenceParser('x:100%:>').parse();

      expect(result?.method).toBe('from');
    });

    it('should use default position when not specified', () => {
      const result = new SequenceParser('x:100%').parse();

      expect(result?.position).toBe('>');
    });

    it('should return null for invalid sequence', () => {
      const result = new SequenceParser('invalid').parse();

      expect(result).toBeNull();
    });

    it('should handle whitespace', () => {
      const result = new SequenceParser('  x:100%:>  ').parse();

      expect(result).toEqual({
        method: 'from',
        selector: undefined,
        vars: { x: '100%' },
        position: '>',
      });
    });

    it('should parse negative numbers', () => {
      const result = new SequenceParser('y:-100:>').parse();

      expect(result).toEqual({
        method: 'from',
        selector: undefined,
        vars: { y: -100 },
        position: '>',
      });
    });

    it('should extract selector from vars', () => {
      const result = new SequenceParser('opacity:0@selector=.card').parse();

      expect(result).toEqual({
        method: 'from',
        selector: '.card',
        vars: { opacity: 0 },
        position: '>',
      });
    });

    it('should extract selector with multiple props', () => {
      const result = new SequenceParser('opacity:0@selector=.card,duration=2').parse();

      expect(result?.method).toBe('from');
      expect(result?.selector).toBe('.card');
      expect(result?.vars.opacity).toBe(0);
      expect(result?.vars.duration).toBe(2);
      expect(result?.position).toBe('>');
    });

    it('should extract selector with child combinator', () => {
      const result = new SequenceParser('x:100@selector=> div').parse();

      expect(result?.selector).toBe('> div');
      expect(result?.vars.x).toBe(100);
    });

    it('should parse set method with basic property', () => {
      const result = new SequenceParser('set:scale:0').parse();

      expect(result).toEqual({
        method: 'set',
        selector: undefined,
        vars: { scale: 0 },
        position: '>',
      });
    });
  });
});
