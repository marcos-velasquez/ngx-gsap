import { TypeSerializer } from '../type-serializer';

describe('TypeSerializer', () => {
  describe('serialize()', () => {
    it('should serialize strings with quotes by default', () => {
      expect(new TypeSerializer('hello').serialize()).toBe('"hello"');
    });

    it('should serialize strings without quotes when option is false', () => {
      expect(new TypeSerializer('hello', { quoteStrings: false }).serialize()).toBe('hello');
    });

    it('should serialize numbers', () => {
      expect(new TypeSerializer(123).serialize()).toBe('123');
      expect(new TypeSerializer(0).serialize()).toBe('0');
      expect(new TypeSerializer(-45.5).serialize()).toBe('-45.5');
    });

    it('should serialize booleans', () => {
      expect(new TypeSerializer(true).serialize()).toBe('true');
      expect(new TypeSerializer(false).serialize()).toBe('false');
    });

    it('should serialize null', () => {
      expect(new TypeSerializer(null).serialize()).toBe('null');
    });

    it('should serialize arrays', () => {
      expect(new TypeSerializer([1, 2, 3]).serialize()).toBe('[1,2,3]');
      expect(new TypeSerializer(['a', 'b']).serialize()).toBe('["a","b"]');
    });

    it('should serialize objects', () => {
      expect(new TypeSerializer({ x: 100 }).serialize()).toBe('{x:100}');
      expect(new TypeSerializer({ x: 100, y: 200 }).serialize()).toBe('{x:100,y:200}');
    });

    it('should serialize nested objects', () => {
      expect(new TypeSerializer({ stagger: { amount: 1, from: 'center' } }).serialize()).toBe('{stagger:{amount:1,from:"center"}}');
    });

    it('should quote strings in nested contexts', () => {
      expect(new TypeSerializer({ ease: 'power2.out' }).serialize()).toBe('{ease:"power2.out"}');
    });

    it('should handle special characters in strings without quotes option', () => {
      expect(new TypeSerializer('power2.out', { quoteStrings: false }).serialize()).toBe('power2.out');
      expect(new TypeSerializer('hello world', { quoteStrings: false }).serialize()).toBe('"hello world"');
    });
  });
});
