import { ObjectParser } from '../object-parser';

describe('ObjectParser', () => {
  describe('parse()', () => {
    it('should parse simple object', () => {
      const result = new ObjectParser('{ x: "100%" }').parse();

      expect(result).toEqual({ x: '100%' });
    });

    it('should parse object with multiple properties', () => {
      const result = new ObjectParser('{ x: "100%", y: "-50%", duration: 2 }').parse();

      expect(result).toEqual({ x: '100%', y: '-50%', duration: 2 });
    });

    it('should parse boolean values', () => {
      const result = new ObjectParser('{ yoyo: true, repeat: false }').parse();

      expect(result).toEqual({ yoyo: true, repeat: false });
    });

    it('should parse numeric values', () => {
      const result = new ObjectParser('{ duration: 2, delay: 0.5 }').parse();

      expect(result).toEqual({ duration: 2, delay: 0.5 });
    });

    it('should parse negative numbers', () => {
      const result = new ObjectParser('{ x: -100, y: -50 }').parse();

      expect(result).toEqual({ x: -100, y: -50 });
    });

    it('should parse null and undefined', () => {
      const result = new ObjectParser('{ a: null, b: undefined }').parse();

      expect(result).toEqual({ a: null, b: undefined });
    });

    it('should parse strings with single quotes', () => {
      const result = new ObjectParser("{ ease: 'power2.out' }").parse();

      expect(result).toEqual({ ease: 'power2.out' });
    });

    it('should parse strings with double quotes', () => {
      const result = new ObjectParser('{ ease: "power2.out" }').parse();

      expect(result).toEqual({ ease: 'power2.out' });
    });

    it('should parse strings without quotes', () => {
      const result = new ObjectParser('{ ease: power2.out }').parse();

      expect(result).toEqual({ ease: 'power2.out' });
    });

    it('should handle whitespace', () => {
      const result = new ObjectParser('{  x:  "100%"  ,  y:  "-50%"  }').parse();

      expect(result).toEqual({ x: '100%', y: '-50%' });
    });

    it('should parse nested objects', () => {
      const result = new ObjectParser('{ transform: { x: 100, y: 50 } }').parse();

      expect(result).toEqual({ transform: { x: 100, y: 50 } });
    });

    it('should parse arrays', () => {
      const result = new ObjectParser('{ values: [1, 2, 3] }').parse();

      expect(result).toEqual({ values: [1, 2, 3] });
    });

    it('should return empty object for empty input', () => {
      const result = new ObjectParser('{}').parse();

      expect(result).toEqual({});
    });

    it('should return empty object for empty string', () => {
      const result = new ObjectParser('').parse();

      expect(result).toEqual({});
    });

    it('should return empty object for invalid syntax', () => {
      const result = new ObjectParser('{ invalid }').parse();

      expect(result).toEqual({});
    });

    it('should handle mixed types', () => {
      const result = new ObjectParser('{ x: "100%", duration: 2, yoyo: true, ease: power2.out }').parse();

      expect(result).toEqual({
        x: '100%',
        duration: 2,
        yoyo: true,
        ease: 'power2.out',
      });
    });
  });
});
