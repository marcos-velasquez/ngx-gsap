import { Is } from '../is';

describe('Is', () => {
  describe('function()', () => {
    it('should return true for functions', () => {
      const fn = () => 'test';
      expect(new Is(fn).function()).toBe(true);
    });

    it('should return false for non-functions', () => {
      expect(new Is('string').function()).toBe(false);
      expect(new Is(123).function()).toBe(false);
      expect(new Is({}).function()).toBe(false);
      expect(new Is(null).function()).toBe(false);
    });
  });
});
