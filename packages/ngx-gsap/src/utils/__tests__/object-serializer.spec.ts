import { ObjectSerializer } from '../object-serializer';

describe('ObjectSerializer', () => {
  describe('serialize()', () => {
    it('should return empty string for empty object', () => {
      expect(new ObjectSerializer({}).serialize()).toBe('');
    });

    it('should serialize object with single property', () => {
      expect(new ObjectSerializer({ x: 100 }).serialize()).toBe('{ x: 100 }');
    });

    it('should serialize object with multiple properties', () => {
      const result = new ObjectSerializer({ x: 100, y: 200 }).serialize();
      expect(result).toBe('{ x: 100, y: 200 }');
    });

    it('should serialize object with string values', () => {
      expect(new ObjectSerializer({ ease: 'power2.out' }).serialize()).toBe('{ ease: "power2.out" }');
    });

    it('should serialize object with boolean values', () => {
      expect(new ObjectSerializer({ yoyo: true }).serialize()).toBe('{ yoyo: true }');
    });

    it('should serialize object with nested objects', () => {
      const result = new ObjectSerializer({ stagger: { amount: 1, from: 'center' } }).serialize();
      expect(result).toBe('{ stagger: {amount:1,from:"center"} }');
    });

    it('should serialize object with array values', () => {
      expect(new ObjectSerializer({ values: [1, 2, 3] }).serialize()).toBe('{ values: [1,2,3] }');
    });

    it('should serialize object with mixed value types', () => {
      const result = new ObjectSerializer({ 
        duration: 2, 
        ease: 'power2.out', 
        yoyo: true 
      }).serialize();
      expect(result).toBe('{ duration: 2, ease: "power2.out", yoyo: true }');
    });
  });
});
