import { ObjectNormalizer } from '../object-normalizer';

describe('ObjectNormalizer', () => {
  describe('normalize()', () => {
    it('should normalize object string with single quotes to double quotes', () => {
      const result = new ObjectNormalizer("{ x: '100%', y: '-50%' }").normalize();

      expect(result).toBe('{ x: "100%", y: "-50%" }');
    });

    it('should normalize object string with inconsistent spacing', () => {
      const result = new ObjectNormalizer('{x:"100%",y:"-50%"}').normalize();

      expect(result).toBe('{ x: "100%", y: "-50%" }');
    });

    it('should normalize mixed types', () => {
      const result = new ObjectNormalizer('{ duration: 2, ease: "power2.out", yoyo: true }').normalize();

      expect(result).toBe('{ duration: 2, ease: "power2.out", yoyo: true }');
    });

    it('should return empty string for empty object', () => {
      const result = new ObjectNormalizer('{}').normalize();

      expect(result).toBe('');
    });

    it('should return empty string for empty string', () => {
      const result = new ObjectNormalizer('').normalize();

      expect(result).toBe('');
    });

    it('should normalize strings without quotes', () => {
      const result = new ObjectNormalizer('{ ease: power2.out }').normalize();

      expect(result).toBe('{ ease: "power2.out" }');
    });

    it('should handle numeric values', () => {
      const result = new ObjectNormalizer('{ duration: 2, delay: 0.5 }').normalize();

      expect(result).toBe('{ duration: 2, delay: 0.5 }');
    });

    it('should handle boolean values', () => {
      const result = new ObjectNormalizer('{ yoyo: true, repeat: false }').normalize();

      expect(result).toBe('{ yoyo: true, repeat: false }');
    });
  });
});
