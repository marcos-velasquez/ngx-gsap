import { TypeChecker } from '../type-checker';

describe('TypeChecker', () => {
  describe('isString()', () => {
    it('should return true for strings', () => {
      expect(new TypeChecker('test').isString()).toBe(true);
      expect(new TypeChecker('').isString()).toBe(true);
    });

    it('should return false for non-strings', () => {
      expect(new TypeChecker(123).isString()).toBe(false);
      expect(new TypeChecker(null).isString()).toBe(false);
    });
  });

  describe('isNumber()', () => {
    it('should return true for numbers', () => {
      expect(new TypeChecker(123).isNumber()).toBe(true);
      expect(new TypeChecker(0).isNumber()).toBe(true);
      expect(new TypeChecker(NaN).isNumber()).toBe(true);
    });

    it('should return false for non-numbers', () => {
      expect(new TypeChecker('123').isNumber()).toBe(false);
      expect(new TypeChecker(null).isNumber()).toBe(false);
    });
  });

  describe('isBoolean()', () => {
    it('should return true for booleans', () => {
      expect(new TypeChecker(true).isBoolean()).toBe(true);
      expect(new TypeChecker(false).isBoolean()).toBe(true);
    });

    it('should return false for non-booleans', () => {
      expect(new TypeChecker(1).isBoolean()).toBe(false);
      expect(new TypeChecker('true').isBoolean()).toBe(false);
    });
  });

  describe('isFunction()', () => {
    it('should return true for functions', () => {
      expect(new TypeChecker(() => 'test').isFunction()).toBe(true);
      expect(
        new TypeChecker(function () {
          return 'test';
        }).isFunction()
      ).toBe(true);
    });

    it('should return false for non-functions', () => {
      expect(new TypeChecker('string').isFunction()).toBe(false);
      expect(new TypeChecker(123).isFunction()).toBe(false);
    });
  });

  describe('isObject()', () => {
    it('should return true for objects', () => {
      expect(new TypeChecker({}).isObject()).toBe(true);
      expect(new TypeChecker([]).isObject()).toBe(true);
      expect(new TypeChecker(null).isObject()).toBe(true);
    });

    it('should return false for non-objects', () => {
      expect(new TypeChecker('string').isObject()).toBe(false);
      expect(new TypeChecker(123).isObject()).toBe(false);
    });
  });

  describe('isUndefined()', () => {
    it('should return true for undefined', () => {
      expect(new TypeChecker(undefined).isUndefined()).toBe(true);
    });

    it('should return false for non-undefined', () => {
      expect(new TypeChecker(null).isUndefined()).toBe(false);
      expect(new TypeChecker('').isUndefined()).toBe(false);
    });
  });

  describe('isSymbol()', () => {
    it('should return true for symbols', () => {
      expect(new TypeChecker(Symbol()).isSymbol()).toBe(true);
      expect(new TypeChecker(Symbol('test')).isSymbol()).toBe(true);
    });

    it('should return false for non-symbols', () => {
      expect(new TypeChecker('symbol').isSymbol()).toBe(false);
      expect(new TypeChecker({}).isSymbol()).toBe(false);
    });
  });

  describe('isBigint()', () => {
    it('should return true for bigints', () => {
      expect(new TypeChecker(BigInt(123)).isBigint()).toBe(true);
      expect(new TypeChecker(BigInt(456)).isBigint()).toBe(true);
    });

    it('should return false for non-bigints', () => {
      expect(new TypeChecker(123).isBigint()).toBe(false);
      expect(new TypeChecker('123').isBigint()).toBe(false);
    });
  });
});
