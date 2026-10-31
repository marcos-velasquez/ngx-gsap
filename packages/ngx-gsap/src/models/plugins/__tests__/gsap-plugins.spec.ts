import { GsapPlugins } from '../gsap-plugins';

describe('GsapPlugins', () => {
  describe('needs()', () => {
    it('should need ScrollTrigger only for a scroll trigger', () => {
      expect(GsapPlugins.needs('to:x:100:0', true).scrollTrigger).toBe(true);
      expect(GsapPlugins.needs('to:x:100:0', false).scrollTrigger).toBe(false);
    });

    it('should need SplitText when the sequence declares a split', () => {
      expect(GsapPlugins.needs("from:opacity:0:>;splitText@type='chars'", false).splitText).toBe(true);
    });

    it('should need MorphSVG when the sequence declares a morph', () => {
      expect(GsapPlugins.needs("morphSVG@shape='#star'", false).morphSVG).toBe(true);
    });

    it('should need nothing for a plain tween', () => {
      expect(GsapPlugins.needs('to:x:100:0', false)).toEqual({
        scrollTrigger: false,
        splitText: false,
        morphSVG: false,
      });
    });
  });

  describe('load()', () => {
    it('should return null when every needed plugin is already registered', () => {
      expect(GsapPlugins.load({ scrollTrigger: true, splitText: true, morphSVG: true })).toBeNull();
    });

    it('should import and register a plugin the first time it is needed', async () => {
      await jest.isolateModulesAsync(async () => {
        const { GsapPlugins: Fresh } = await import('../gsap-plugins');
        expect(() => Fresh.ScrollTrigger).toThrow('ScrollTrigger is not loaded');

        const loading = Fresh.load({ scrollTrigger: true, splitText: false, morphSVG: false });
        expect(loading).not.toBeNull();
        await loading;

        expect(Fresh.ScrollTrigger.create).toEqual(expect.any(Function));
        expect(Fresh.load({ scrollTrigger: true, splitText: false, morphSVG: false })).toBeNull();
      });
    });

    it('should leave a plugin nobody needs unloaded', async () => {
      await jest.isolateModulesAsync(async () => {
        const { GsapPlugins: Fresh } = await import('../gsap-plugins');

        expect(Fresh.load({ scrollTrigger: false, splitText: false, morphSVG: false })).toBeNull();
        expect(() => Fresh.SplitText).toThrow('SplitText is not loaded');
      });
    });
  });
});
