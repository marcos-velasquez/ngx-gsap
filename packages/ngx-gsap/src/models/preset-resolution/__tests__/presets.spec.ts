import { Presets } from '../presets';

describe('Presets', () => {
  describe('has()', () => {
    it('should recognise a registered preset', () => {
      expect(Presets.has('fadeIn')).toBe(true);
    });

    it.each(['name', 'length', 'prototype', 'constructor', 'toString', 'eval', 'unknownPreset'])(
      'should not resolve %s, which is not a registered preset',
      (name) => {
        expect(Presets.has(name)).toBe(false);
      }
    );
  });

  describe('invoke()', () => {
    it('should run the preset with the given params', () => {
      expect(Presets.invoke('fadeIn', { x: '-100%' })).toContain('x:-100%');
    });

    it('should run the preset with its defaults when no params are given', () => {
      expect(Presets.invoke('fadeIn')).toContain('opacity:0');
    });

    it('should reject a name that is not a registered preset', () => {
      expect(() => Presets.invoke('fadeIn); globalThis.injected = true; (')).toThrow('Unknown preset');
      expect((globalThis as Record<string, unknown>)['injected']).toBeUndefined();
    });
  });

  describe('paramNames()', () => {
    it('should list the keys a preset destructures', () => {
      expect(Presets.paramNames('fadeIn')).toEqual(['x', 'y', 'opacity']);
    });

    it('should read the keys of a minified preset, whose source renames every binding', () => {
      const minified = ({ x: t = '0', y: a = '0', opacity: s = 0 } = {}): string => `x:${t};y:${a};opacity:${s}`;

      expect(Presets.paramNamesOf(minified)).toEqual(['x', 'y', 'opacity']);
    });
  });
});
