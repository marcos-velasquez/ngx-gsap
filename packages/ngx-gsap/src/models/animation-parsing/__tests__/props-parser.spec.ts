import { PropsParser } from '../shared';

describe('PropsParser', () => {
  describe('parse()', () => {
    it('should parse single prop with string value', () => {
      const result = new PropsParser('duration=2').parse();

      expect(result).toEqual({ duration: 2 });
    });

    it('should parse multiple props', () => {
      const result = new PropsParser('duration=2,yoyo=true').parse();

      expect(result).toEqual({ duration: 2, yoyo: true });
    });

    it('should parse boolean true', () => {
      const result = new PropsParser('yoyo=true').parse();

      expect(result).toEqual({ yoyo: true });
    });

    it('should parse boolean false', () => {
      const result = new PropsParser('repeat=false').parse();

      expect(result).toEqual({ repeat: false });
    });

    it('should parse numeric values', () => {
      const result = new PropsParser('duration=2,delay=0.5').parse();

      expect(result).toEqual({ duration: 2, delay: 0.5 });
    });

    it('should parse string values with quotes', () => {
      const result = new PropsParser('ease="power2.out"').parse();

      expect(result).toEqual({ ease: 'power2.out' });
    });

    it('should parse string values with single quotes', () => {
      const result = new PropsParser("ease='power2.out'").parse();

      expect(result).toEqual({ ease: 'power2.out' });
    });

    it('should parse string values without quotes', () => {
      const result = new PropsParser('ease=power2.out').parse();

      expect(result).toEqual({ ease: 'power2.out' });
    });

    it('should handle whitespace', () => {
      const result = new PropsParser('duration = 2 , yoyo = true').parse();

      expect(result).toEqual({ duration: 2, yoyo: true });
    });

    it('should return empty object for empty string', () => {
      const result = new PropsParser('').parse();

      expect(result).toEqual({});
    });

    it('should handle mixed types', () => {
      const result = new PropsParser('duration=2,yoyo=true,ease="power2.out",repeat=false').parse();

      expect(result).toEqual({
        duration: 2,
        yoyo: true,
        ease: 'power2.out',
        repeat: false,
      });
    });
  });
});
