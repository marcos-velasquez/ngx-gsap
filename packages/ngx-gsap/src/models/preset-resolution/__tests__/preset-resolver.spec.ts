import { PresetResolver } from '../preset-resolver';

describe('PresetResolver', () => {
  describe('isPreset()', () => {
    it('should return true for preset with function syntax', () => {
      expect(new PresetResolver('fadeIn()').isPreset()).toBe(true);
      expect(new PresetResolver('fadeOut({ x: "100%" })').isPreset()).toBe(true);
    });

    it('should return true for preset without parentheses', () => {
      expect(new PresetResolver('fadeIn').isPreset()).toBe(true);
    });

    it('should return false for non-preset sequences', () => {
      expect(new PresetResolver('x:100%:>').isPreset()).toBe(false);
      expect(new PresetResolver('opacity:0:<').isPreset()).toBe(false);
    });

    it('should return false for unknown presets', () => {
      expect(new PresetResolver('unknownPreset()').isPreset()).toBe(false);
    });
  });

  describe('resolve()', () => {
    it('should expand preset with parameters', () => {
      const resolver = new PresetResolver('fadeIn({ x: "-100%" })');
      const result = resolver.resolve();

      expect(result).toContain('x:-100%');
      expect(result).toContain('opacity:0');
    });

    it('should expand preset without parameters', () => {
      const resolver = new PresetResolver('fadeIn()');
      const result = resolver.resolve();

      expect(result).toContain('x:0');
      expect(result).toContain('opacity:0');
    });

    it('should expand preset without parentheses', () => {
      const resolver = new PresetResolver('fadeIn');
      const result = resolver.resolve();

      expect(result).toContain('x:0');
      expect(result).toContain('opacity:0');
    });

    it('should handle preset with nested object (stagger)', () => {
      const resolver = new PresetResolver('fadeIn({ stagger: { amount: 1, from: "center" } })');
      const result = resolver.resolve();

      expect(result).toContain('x:0');
      expect(result).toContain('opacity:0');
      expect(result).toContain('stagger={amount:1,from:"center"}');
    });

    it('should handle preset with nested stagger and other params', () => {
      const resolver = new PresetResolver('fadeIn({ x: "-100%", stagger: { amount: 0.5, from: "end" } })');
      const result = resolver.resolve();

      expect(result).toContain('x:-100%');
      expect(result).toContain('opacity:0');
      expect(result).toContain('stagger={amount:0.5,from:"end"}');
    });

    it('should handle complex nested stagger object', () => {
      const resolver = new PresetResolver('slideIn({ stagger: { amount: 1, from: "center", grid: "auto", ease: "power2.inOut" } })');
      const result = resolver.resolve();

      expect(result).toContain('stagger={amount:1,from:"center",grid:"auto",ease:"power2.inOut"}');
    });

    it('should handle preset with multiple parameters', () => {
      const resolver = new PresetResolver('fadeOut({ x: "100%", y: "-50%" })');
      const result = resolver.resolve();

      expect(result).toContain('x:100%');
      expect(result).toContain('y:-50%');
    });

    it('should append customVars with @ to each sequence', () => {
      const resolver = new PresetResolver('fadeIn({ duration: 2 })');
      const result = resolver.resolve();

      expect(result).toContain('@duration=2');
      expect(result.split(';').every((seq) => seq.includes('@duration=2'))).toBe(true);
    });

    it('should append multiple customVars with @', () => {
      const resolver = new PresetResolver('fadeIn({ duration: 2, ease: "power2.out", yoyo: true })');
      const result = resolver.resolve();

      expect(result).toContain('@duration=2');
      expect(result).toContain('ease=power2.out');
      expect(result).toContain('yoyo=true');
    });

    it('should mix preset params and customVars correctly', () => {
      const resolver = new PresetResolver('fadeOut({ x: "100%", duration: 2, ease: "bounce.out" })');
      const result = resolver.resolve();

      expect(result).toContain('x:100%');
      expect(result).toContain('@duration=2');
      expect(result).toContain('ease=bounce.out');
    });

    it('should not append @ if no customVars', () => {
      const resolver = new PresetResolver('fadeIn({ x: "-100%" })');
      const result = resolver.resolve();

      expect(result).not.toContain('@');
    });

    it('should handle preset without args and no customVars', () => {
      const resolver = new PresetResolver('fadeIn()');
      const result = resolver.resolve();

      expect(result).not.toContain('@');
    });

    it('should append customVars to all sequences in multi-sequence preset', () => {
      const resolver = new PresetResolver('fadeIn({ duration: 3, delay: 0.5 });fadeOut({ duration: 2, delay: 0.5 })');
      const result = resolver.resolve();
      const sequences = result.split(';');

      sequences.forEach((seq) => {
        expect(seq).toContain('@duration=3');
        expect(seq).toContain('delay=0.5');
      });
    });

    it('should handle numeric customVars correctly', () => {
      const resolver = new PresetResolver('fadeIn({ duration: 2.5, repeat: 3 })');
      const result = resolver.resolve();

      expect(result).toContain('duration=2.5');
      expect(result).toContain('repeat=3');
    });

    it('should handle boolean customVars correctly', () => {
      const resolver = new PresetResolver('fadeIn({ yoyo: true, paused: false })');
      const result = resolver.resolve();

      expect(result).toContain('yoyo=true');
      expect(result).toContain('paused=false');
    });

    it('should append selector as customVar', () => {
      const resolver = new PresetResolver('fadeIn({ selector: ".card" })');
      const result = resolver.resolve();

      expect(result).toContain('@selector=.card');
      expect(result.split(';').every((seq) => seq.includes('@selector=.card'))).toBe(true);
    });

    it('should handle selector with stagger', () => {
      const resolver = new PresetResolver('fadeIn({ selector: ".item", stagger: { amount: 1, from: "center" } })');
      const result = resolver.resolve();

      expect(result).toContain('selector=.item');
      expect(result).toContain('stagger={amount:1,from:"center"}');
    });

    it('should handle selector with multiple customVars', () => {
      const resolver = new PresetResolver('fadeIn({ selector: ".card", duration: 2, ease: "power2.out" })');
      const result = resolver.resolve();

      expect(result).toContain('selector=.card');
      expect(result).toContain('duration=2');
      expect(result).toContain('ease=power2.out');
    });

    it('should handle selector with child combinator', () => {
      const resolver = new PresetResolver('fadeIn({ selector: "> div" })');
      const result = resolver.resolve();

      expect(result).toContain('selector="> div"');
    });

    it('should handle selector with preset params and customVars', () => {
      const resolver = new PresetResolver('slideIn({ selector: ".item", x: "-200%", duration: 2 })');
      const result = resolver.resolve();

      expect(result).toContain('x:-200%');
      expect(result).toContain('selector=.item');
      expect(result).toContain('duration=2');
    });

    it('should extract and append timeline vars from preset', () => {
      const resolver = new PresetResolver('shake({ timeline: { repeat: 1 } })');
      const result = resolver.resolve();

      expect(result).toContain('timeline@repeat=1');
      expect(result).toContain('to:x:10');
    });

    it('should replace existing timeline@ with timeline parameter', () => {
      const resolver = new PresetResolver('shake({ timeline: { repeat: 2, yoyo: true } })');
      const result = resolver.resolve();

      expect(result).toContain('timeline@repeat=2');
      expect(result).toContain('yoyo=true');
      expect(result).not.toContain('repeat=5'); // Default from shake preset
    });

    it('should handle timeline vars with other custom vars', () => {
      const resolver = new PresetResolver('fadeIn({ x: "-100%", duration: 2, timeline: { repeat: 3 } })');
      const result = resolver.resolve();

      expect(result).toContain('timeline@repeat=3');
      expect(result).toContain('x:-100%');
      expect(result).toContain('duration=2');
    });

    it('should not include timeline in custom vars', () => {
      const resolver = new PresetResolver('pulse({ timeline: { repeat: -1 }, duration: 1 })');
      const result = resolver.resolve();

      expect(result).toContain('timeline@repeat=-1');
      expect(result).toContain('duration=1');
      // timeline should not appear as a custom var
      const timelineMatches = result.match(/timeline/g);
      expect(timelineMatches?.length).toBe(1); // Only in timeline@
    });
  });
});
