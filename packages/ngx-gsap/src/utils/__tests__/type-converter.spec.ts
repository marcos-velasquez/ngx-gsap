import { TypeConverter } from '../type-converter';

describe('TypeConverter', () => {
  describe('convert()', () => {
    it('should convert "true" to boolean true', () => {
      expect(new TypeConverter('true').convert()).toBe(true);
    });

    it('should convert "false" to boolean false', () => {
      expect(new TypeConverter('false').convert()).toBe(false);
    });

    it('should convert "null" to null', () => {
      expect(new TypeConverter('null').convert()).toBe(null);
    });

    it('should convert "undefined" to undefined', () => {
      expect(new TypeConverter('undefined').convert()).toBe(undefined);
    });

    it('should convert numeric strings to numbers', () => {
      expect(new TypeConverter('123').convert()).toBe(123);
      expect(new TypeConverter('0').convert()).toBe(0);
      expect(new TypeConverter('-45.5').convert()).toBe(-45.5);
    });

    it('should remove quotes from quoted strings', () => {
      expect(new TypeConverter('"hello"').convert()).toBe('hello');
      expect(new TypeConverter("'world'").convert()).toBe('world');
    });

    it('should return unquoted strings as-is', () => {
      expect(new TypeConverter('test').convert()).toBe('test');
    });

    it('should trim whitespace', () => {
      expect(new TypeConverter('  true  ').convert()).toBe(true);
      expect(new TypeConverter('  123  ').convert()).toBe(123);
    });
  });
});
