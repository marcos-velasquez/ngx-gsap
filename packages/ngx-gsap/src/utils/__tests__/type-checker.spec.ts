import { TypeChecker } from '../type-checker';

describe('TypeChecker', () => {
  describe('string()', () => {
    it('should return true for strings', () => {
      expect(new TypeChecker('test').string()).toBe(true);
      expect(new TypeChecker('').string()).toBe(true);
    });

    it('should return false for non-strings', () => {
      expect(new TypeChecker(123).string()).toBe(false);
      expect(new TypeChecker(null).string()).toBe(false);
    });
  });

  describe('number()', () => {
    it('should return true for numbers', () => {
      expect(new TypeChecker(123).number()).toBe(true);
      expect(new TypeChecker(0).number()).toBe(true);
      expect(new TypeChecker(NaN).number()).toBe(true);
    });

    it('should return false for non-numbers', () => {
      expect(new TypeChecker('123').number()).toBe(false);
      expect(new TypeChecker(null).number()).toBe(false);
    });
  });

  describe('boolean()', () => {
    it('should return true for booleans', () => {
      expect(new TypeChecker(true).boolean()).toBe(true);
      expect(new TypeChecker(false).boolean()).toBe(true);
    });

    it('should return false for non-booleans', () => {
      expect(new TypeChecker(1).boolean()).toBe(false);
      expect(new TypeChecker('true').boolean()).toBe(false);
    });
  });

  describe('function()', () => {
    it('should return true for functions', () => {
      expect(new TypeChecker(() => 'test').function()).toBe(true);
      expect(
        new TypeChecker(function () {
          return 'test';
        }).function()
      ).toBe(true);
    });

    it('should return false for non-functions', () => {
      expect(new TypeChecker('string').function()).toBe(false);
      expect(new TypeChecker(123).function()).toBe(false);
    });
  });

  describe('object()', () => {
    it('should return true for objects', () => {
      expect(new TypeChecker({}).object()).toBe(true);
      expect(new TypeChecker([]).object()).toBe(true);
      expect(new TypeChecker(null).object()).toBe(true);
    });

    it('should return false for non-objects', () => {
      expect(new TypeChecker('string').object()).toBe(false);
      expect(new TypeChecker(123).object()).toBe(false);
    });
  });

  describe('undefined()', () => {
    it('should return true for undefined', () => {
      expect(new TypeChecker(undefined).undefined()).toBe(true);
    });

    it('should return false for non-undefined', () => {
      expect(new TypeChecker(null).undefined()).toBe(false);
      expect(new TypeChecker('').undefined()).toBe(false);
    });
  });

  describe('symbol()', () => {
    it('should return true for symbols', () => {
      expect(new TypeChecker(Symbol()).symbol()).toBe(true);
      expect(new TypeChecker(Symbol('test')).symbol()).toBe(true);
    });

    it('should return false for non-symbols', () => {
      expect(new TypeChecker('symbol').symbol()).toBe(false);
      expect(new TypeChecker({}).symbol()).toBe(false);
    });
  });

  describe('bigint()', () => {
    it('should return true for bigints', () => {
      expect(new TypeChecker(BigInt(123)).bigint()).toBe(true);
      expect(new TypeChecker(BigInt(456)).bigint()).toBe(true);
    });

    it('should return false for non-bigints', () => {
      expect(new TypeChecker(123).bigint()).toBe(false);
      expect(new TypeChecker('123').bigint()).toBe(false);
    });
  });
});
