import { AnimationParser } from '../animation-parser';
import { TimelinePropsExtractor, ScrollPropsExtractor } from '../extractors';
import { SequenceParser } from '../sequence-parser';

// Helper function to parse animations from result
const parseAnimations = (result: ReturnType<AnimationParser['parse']>) => {
  return result.sequences.map((s) => new SequenceParser(s).parse()).filter((anim) => anim !== null);
};

describe('AnimationParser', () => {
  describe('Sequence parsing', () => {
    it('should return joined sequence and individual sequences', () => {
      const result = new AnimationParser('to:x:100:>;to:y:50:>').parse();
      expect(result.sequence).toBe('to:x:100:>;to:y:50:>');
      expect(result.sequences).toEqual(['to:x:100:>', 'to:y:50:>']);
    });

    it('should resolve presets and return expanded sequences', () => {
      const result = new AnimationParser('fadeIn').parse();
      expect(result.sequences.length).toBeGreaterThan(0);
      expect(result.sequence).toContain('opacity');
    });

    it('should handle mixed presets and raw sequences', () => {
      const result = new AnimationParser('fadeIn;to:x:100:>').parse();
      expect(result.sequences.length).toBeGreaterThan(1);
    });
  });

  describe('Timeline properties extraction (via TimelinePropsExtractor)', () => {
    it('should extract timeline properties from sequence', () => {
      const result = new AnimationParser('timeline@repeat=3,yoyo=true;to:x:100:>').parse();
      const timelineVars = new TimelinePropsExtractor(result.sequence).extract();
      expect(timelineVars).toEqual({ repeat: 3, yoyo: true });
    });

    it('should work with presets', () => {
      const result = new AnimationParser('timeline@repeat=3,yoyo=true;shake').parse();
      const timelineVars = new TimelinePropsExtractor(result.sequence).extract();
      expect(timelineVars).toEqual({ repeat: 3, yoyo: true });
    });

    it('should return empty timelineVars when no timeline@', () => {
      const result = new AnimationParser('to:x:100:>').parse();
      const timelineVars = new TimelinePropsExtractor(result.sequence).extract();
      expect(timelineVars).toEqual({});
    });
  });

  describe('Scroll properties extraction (via ScrollPropsExtractor)', () => {
    it('should extract scroll properties from sequence', () => {
      const result = new AnimationParser('scroll@start="top center",scrub=true;to:x:100:>').parse();
      const scrollVars = new ScrollPropsExtractor(result.sequence).extract();
      expect(scrollVars).toEqual({ start: 'top center', scrub: true });
    });

    it('should work with presets', () => {
      const result = new AnimationParser('fadeIn();scroll@scrub=true,pin=true').parse();
      const scrollVars = new ScrollPropsExtractor(result.sequence).extract();
      expect(scrollVars).toEqual({ scrub: true, pin: true });
    });

    it('should return empty scrollVars when no scroll@', () => {
      const result = new AnimationParser('to:x:100:>').parse();
      const scrollVars = new ScrollPropsExtractor(result.sequence).extract();
      expect(scrollVars).toEqual({});
    });

    it('should handle all ScrollTrigger properties', () => {
      const result = new AnimationParser(
        'fadeIn();scroll@start="top bottom",end="bottom top",scrub=1.5,pin=true,markers=false,toggleActions="play reverse play reverse"'
      ).parse();
      const scrollVars = new ScrollPropsExtractor(result.sequence).extract();
      expect(scrollVars).toEqual({
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        pin: true,
        markers: false,
        toggleActions: 'play reverse play reverse',
      });
    });

    it('should work together with timeline properties', () => {
      const result = new AnimationParser('fadeIn();timeline@repeat=2,yoyo=true;scroll@scrub=true,pin=true').parse();
      const timelineVars = new TimelinePropsExtractor(result.sequence).extract();
      const scrollVars = new ScrollPropsExtractor(result.sequence).extract();
      expect(timelineVars).toEqual({ repeat: 2, yoyo: true });
      expect(scrollVars).toEqual({ scrub: true, pin: true });
    });
  });

  describe('Animation parsing (via SequenceParser)', () => {
    it('should parse single animation with from (default)', () => {
      const result = new AnimationParser('opacity:0:>').parse();
      const animations = result.sequences.map((s) => new SequenceParser(s).parse()).filter((anim) => anim !== null);

      expect(animations.length).toBe(1);
      expect(animations[0]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { opacity: 0 },
        position: '>',
      });
    });

    it('should parse multiple animations', () => {
      const result = new AnimationParser('opacity:0:>;to:scale:2:>').parse();
      const animations = result.sequences.map((s) => new SequenceParser(s).parse()).filter((anim) => anim !== null);

      expect(animations.length).toBe(2);
      expect(animations[0]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { opacity: 0 },
        position: '>',
      });
      expect(animations[1]).toEqual({ method: 'to', selector: undefined, vars: { scale: 2 }, position: '>' });
    });

    it('should handle to method', () => {
      const result = new AnimationParser('to:opacity:1:>').parse();
      const animations = result.sequences.map((s) => new SequenceParser(s).parse()).filter((anim) => anim !== null);

      expect(animations[0].method).toBe('to');
      expect(animations[0].vars).toEqual({ opacity: 1 });
    });

    it('should resolve presets', () => {
      const result = new AnimationParser('fadeIn()').parse();
      const animations = result.sequences.map((s) => new SequenceParser(s).parse()).filter((anim) => anim !== null);

      expect(animations.length).toBe(3);
      expect(animations[0]).toEqual({ method: 'from', selector: undefined, vars: { x: 0 }, position: '0' });
      expect(animations[1]).toEqual({ method: 'from', selector: undefined, vars: { y: 0 }, position: '0' });
      expect(animations[2]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { opacity: 0 },
        position: '<',
      });
    });

    it('should filter out invalid animations', () => {
      const result = new AnimationParser('opacity:0:>;invalid;scale:2:>').parse();
      const animations = result.sequences.map((s) => new SequenceParser(s).parse()).filter((anim) => anim !== null);

      expect(animations.length).toBe(2);
      expect(animations[0].vars).toEqual({ opacity: 0 });
      expect(animations[1].vars).toEqual({ scale: 2 });
    });

    it('should handle whitespace correctly', () => {
      const result = new AnimationParser('  opacity : 0 : > ; scale : 2 : >  ').parse();
      const animations = result.sequences.map((s) => new SequenceParser(s).parse()).filter((anim) => anim !== null);

      expect(animations.length).toBe(2);
      expect(animations[0].vars).toHaveProperty('opacity ');
      expect(animations[1].vars).toHaveProperty('scale ');
    });
  });

  describe('Delimiters', () => {
    it('should parse multiple animations with semicolon delimiter', () => {
      const result = new AnimationParser('opacity:0:>;scale:2:>').parse();

      expect(parseAnimations(result).length).toBe(2);
      expect(parseAnimations(result)[0]).toEqual({ method: 'from', vars: { opacity: 0 }, position: '>' });
      expect(parseAnimations(result)[1]).toEqual({ method: 'from', vars: { scale: 2 }, position: '>' });
    });

    it('should parse multiple animations with comma delimiter', () => {
      const result = new AnimationParser('opacity:0:>;scale:2:>').parse();

      expect(parseAnimations(result).length).toBe(2);
      expect(parseAnimations(result)[0]).toEqual({ method: 'from', vars: { opacity: 0 }, position: '>' });
      expect(parseAnimations(result)[1]).toEqual({ method: 'from', vars: { scale: 2 }, position: '>' });
    });

    it('should parse multiple animations with mixed delimiters', () => {
      const result = new AnimationParser('opacity:0:>;scale:2:>;rotate:360:<').parse();

      expect(parseAnimations(result).length).toBe(3);
      expect(parseAnimations(result)[0].position).toBe('>');
      expect(parseAnimations(result)[1].position).toBe('>');
      expect(parseAnimations(result)[2].position).toBe('<');
    });
  });

  describe('Value parsing', () => {
    it('should parse numeric values correctly', () => {
      const result = new AnimationParser('rotate:360:>;scale:2.5:>').parse();

      expect(parseAnimations(result)[0].vars).toEqual({ rotate: 360 });
      expect(parseAnimations(result)[1].vars).toEqual({ scale: 2.5 });
    });

    it('should parse string values correctly', () => {
      const result = new AnimationParser('x:100%:>;y:-50px:>').parse();

      expect(parseAnimations(result)[0].vars).toEqual({ x: '100%' });
      expect(parseAnimations(result)[1].vars).toEqual({ y: '-50px' });
    });

    it('should handle negative numbers', () => {
      const result = new AnimationParser('x:-100:>;y:-50.5:>').parse();

      expect(parseAnimations(result)[0].vars).toEqual({ x: -100 });
      expect(parseAnimations(result)[1].vars).toEqual({ y: -50.5 });
    });
  });

  describe('Positions', () => {
    it('should respect custom positions', () => {
      const result = new AnimationParser('opacity:0:<;scale:2:+=1;rotate:360:-=0.5').parse();

      expect(parseAnimations(result)[0].position).toBe('<');
      expect(parseAnimations(result)[1].position).toBe('+=1');
      expect(parseAnimations(result)[2].position).toBe('-=0.5');
    });

    it('should handle numeric positions', () => {
      const result = new AnimationParser('x:200:0.5').parse();

      expect(parseAnimations(result)[0].position).toBe('0.5');
    });
  });

  describe('Methods (to/from/set)', () => {
    it('should mix from and to methods', () => {
      const result = new AnimationParser('opacity:0:>;to:scale:2:>').parse();

      expect(parseAnimations(result).length).toBe(2);
      expect(parseAnimations(result)[0]).toEqual({ method: 'from', vars: { opacity: 0 }, position: '>' });
      expect(parseAnimations(result)[1]).toEqual({ method: 'to', vars: { scale: 2 }, position: '>' });
    });

    it('should handle explicit from method', () => {
      const result = new AnimationParser('from:opacity:0:>').parse();

      expect(parseAnimations(result)[0].method).toBe('from');
      expect(parseAnimations(result)[0].vars).toEqual({ opacity: 0 });
    });

    it('should handle multiple to methods', () => {
      const result = new AnimationParser('to:width:500:<;to:opacity:1:>').parse();

      expect(parseAnimations(result).length).toBe(2);
      expect(parseAnimations(result)[0]).toEqual({ method: 'to', vars: { width: 500 }, position: '<' });
      expect(parseAnimations(result)[1]).toEqual({ method: 'to', vars: { opacity: 1 }, position: '>' });
    });

    it('should parse multiple set animations', () => {
      const result = new AnimationParser('set:scale:0;set:opacity:0;set:x:100%').parse();

      expect(parseAnimations(result).length).toBe(3);
      expect(parseAnimations(result)[0]).toEqual({ method: 'set', selector: undefined, vars: { scale: 0 }, position: '>' });
      expect(parseAnimations(result)[1]).toEqual({ method: 'set', selector: undefined, vars: { opacity: 0 }, position: '>' });
      expect(parseAnimations(result)[2]).toEqual({ method: 'set', selector: undefined, vars: { x: '100%' }, position: '>' });
    });

    it('should parse set followed by to animations', () => {
      const result = new AnimationParser('set:scale:0;set:opacity:0;to:scale:1:>;to:opacity:1:>').parse();

      expect(parseAnimations(result).length).toBe(4);
      expect(parseAnimations(result)[0].method).toBe('set');
      expect(parseAnimations(result)[0].vars.scale).toBe(0);
      expect(parseAnimations(result)[1].method).toBe('set');
      expect(parseAnimations(result)[1].vars.opacity).toBe(0);
      expect(parseAnimations(result)[2].method).toBe('to');
      expect(parseAnimations(result)[2].vars.scale).toBe(1);
      expect(parseAnimations(result)[3].method).toBe('to');
      expect(parseAnimations(result)[3].vars.opacity).toBe(1);
    });
  });

  describe('Presets', () => {
    it('should resolve fadeIn preset with parentheses', () => {
      const result = new AnimationParser('fadeIn()').parse();

      expect(parseAnimations(result).length).toBe(3);
      expect(parseAnimations(result)[0]).toEqual({ method: 'from', selector: undefined, vars: { x: 0 }, position: '0' });
      expect(parseAnimations(result)[1]).toEqual({ method: 'from', selector: undefined, vars: { y: 0 }, position: '0' });
      expect(parseAnimations(result)[2]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { opacity: 0 },
        position: '<',
      });
    });

    it('should resolve fadeIn preset without parentheses', () => {
      const result = new AnimationParser('fadeIn').parse();

      expect(parseAnimations(result).length).toBe(3);
      expect(parseAnimations(result)[0]).toEqual({ method: 'from', selector: undefined, vars: { x: 0 }, position: '0' });
      expect(parseAnimations(result)[1]).toEqual({ method: 'from', selector: undefined, vars: { y: 0 }, position: '0' });
      expect(parseAnimations(result)[2]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { opacity: 0 },
        position: '<',
      });
    });

    it('should resolve preset with multiple animations', () => {
      const result = new AnimationParser('slideIn({ axis: "x", distance: "-100%" })').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { x: '-100%' },
        position: '0',
      });
    });

    it('should use sequence as-is if preset does not exist', () => {
      const result = new AnimationParser('customAnimation:1:>').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0].vars).toEqual({ customAnimation: 1 });
    });

    it('should resolve preset with object syntax and custom opacity', () => {
      const result = new AnimationParser('fadeIn({ opacity: 0.1 })').parse();

      expect(parseAnimations(result).length).toBe(3);
      expect(parseAnimations(result)[0]).toEqual({ method: 'from', selector: undefined, vars: { x: 0 }, position: '0' });
      expect(parseAnimations(result)[1]).toEqual({ method: 'from', selector: undefined, vars: { y: 0 }, position: '0' });
      expect(parseAnimations(result)[2]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { opacity: 0.1 },
        position: '<',
      });
    });

    it('should resolve preset with object syntax and custom x', () => {
      const result = new AnimationParser('slideIn({ axis: "x", distance: "-200%" })').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { x: '-200%' },
        position: '0',
      });
    });

    it('should resolve preset with object syntax and multiple parameters', () => {
      const result = new AnimationParser('slideIn({ axis: "y", distance: "-300%" })').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'from',
        selector: undefined,
        vars: { y: '-300%' },
        position: '0',
      });
    });
  });

  describe('Custom GSAP properties', () => {
    it('should extract duration as custom var and not pass to preset', () => {
      const result = new AnimationParser('fadeOut({ duration: 20 })').parse();

      expect(parseAnimations(result).length).toBe(3);
      parseAnimations(result).forEach((anim) => {
        expect(anim.vars).toHaveProperty('duration', 20);
      });
    });

    it('should extract yoyo and repeat as custom vars', () => {
      const result = new AnimationParser('fadeIn({ yoyo: true, repeat: 2 })').parse();
      expect(parseAnimations(result).length).toBeGreaterThan(0);
      parseAnimations(result).forEach((anim) => {
        expect(anim.vars).toHaveProperty('yoyo', true);
        expect(anim.vars).toHaveProperty('repeat', 2);
      });
    });

    it('should mix preset params with custom GSAP properties', () => {
      const result = new AnimationParser('fadeOut({ x: "100%", y: "-50%", duration: 3, ease: "bounce.out" })').parse();

      expect(parseAnimations(result).length).toBe(3);
      expect(parseAnimations(result)[0].vars).toHaveProperty('x', '100%');
      expect(parseAnimations(result)[1].vars).toHaveProperty('y', '-50%');
      parseAnimations(result).forEach((anim) => {
        expect(anim.vars).toHaveProperty('duration', 3);
        expect(anim.vars).toHaveProperty('ease', 'bounce.out');
      });
    });
  });

  describe('Inline props with @ syntax', () => {
    it('should parse single prop with @ syntax', () => {
      const result = new AnimationParser('opacity:0@duration=2').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'from',
        vars: { opacity: 0, duration: 2 },
        position: '>',
      });
    });

    it('should parse multiple props with @ syntax', () => {
      const result = new AnimationParser('scale:0@duration=2,ease=power2.out,yoyo=true').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0].vars).toEqual({
        scale: 0,
        duration: 2,
        ease: 'power2.out',
        yoyo: true,
      });
    });

    it('should parse props with explicit position', () => {
      const result = new AnimationParser('opacity:0:>@duration=3,delay=0.5').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'from',
        vars: { opacity: 0, duration: 3, delay: 0.5 },
        position: '>',
      });
    });

    it('should parse boolean props correctly', () => {
      const result = new AnimationParser('scale:1@yoyo=true,repeat=false').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0].vars).toEqual({
        scale: 1,
        yoyo: true,
        repeat: false,
      });
    });

    it('should parse numeric props correctly', () => {
      const result = new AnimationParser('x:100@duration=2.5,delay=0.3,repeat=3').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0].vars).toEqual({
        x: 100,
        duration: 2.5,
        delay: 0.3,
        repeat: 3,
      });
    });

    it('should parse string props correctly', () => {
      const result = new AnimationParser('opacity:0@ease=power2.inOut,onComplete=myFunc').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0].vars).toEqual({
        opacity: 0,
        ease: 'power2.inOut',
        onComplete: 'myFunc',
      });
    });

    it('should parse nested object with multiple props', () => {
      const result = new AnimationParser('x:100@duration=2,stagger={amount:0.5,from:end}').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0].vars).toEqual({
        x: 100,
        duration: 2,
        stagger: { amount: 0.5, from: 'end' },
      });
    });

    it('should parse complex nested stagger object', () => {
      const result = new AnimationParser('scale:0@stagger={amount:1,from:center,grid:auto,ease:power2.inOut}').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0].vars).toEqual({
        scale: 0,
        stagger: { amount: 1, from: 'center', grid: 'auto', ease: 'power2.inOut' },
      });
    });

    it('should work with to method', () => {
      const result = new AnimationParser('to:opacity:1@duration=2').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'to',
        vars: { opacity: 1, duration: 2 },
        position: '>',
      });
    });

    it('should parse multiple animations with props', () => {
      const result = new AnimationParser('scale:0@duration=2;to:scale:1.2:>@ease=bounce.out;to:scale:1:>').parse();

      expect(parseAnimations(result).length).toBe(3);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'from',
        vars: { scale: 0, duration: 2 },
        position: '>',
      });
      expect(parseAnimations(result)[1]).toEqual({
        method: 'to',
        vars: { scale: 1.2, ease: 'bounce.out' },
        position: '>',
      });
      expect(parseAnimations(result)[2]).toEqual({
        method: 'to',
        vars: { scale: 1 },
        position: '>',
      });
    });

    it('should work without props (backward compatibility)', () => {
      const result = new AnimationParser('opacity:0:>').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'from',
        vars: { opacity: 0 },
        position: '>',
      });
    });

    it('should handle props with string values containing special characters', () => {
      const result = new AnimationParser('x:100%@ease=power2.out').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0].vars).toEqual({
        x: '100%',
        ease: 'power2.out',
      });
    });

    it('should parse props with different positions', () => {
      const result = new AnimationParser('opacity:0:<@duration=2').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0]).toEqual({
        method: 'from',
        vars: { opacity: 0, duration: 2 },
        position: '<',
      });
    });

    it('should handle mixed animations with and without props', () => {
      const result = new AnimationParser('opacity:0@duration=2;scale:1.5:>;rotate:360@ease=bounce.out').parse();

      expect(parseAnimations(result).length).toBe(3);
      expect(parseAnimations(result)[0].vars).toEqual({ opacity: 0, duration: 2 });
      expect(parseAnimations(result)[1].vars).toEqual({ scale: 1.5 });
      expect(parseAnimations(result)[2].vars).toEqual({ rotate: 360, ease: 'bounce.out' });
    });
  });

  describe('Multiple presets', () => {
    it('should combine multiple presets with semicolon', () => {
      const result = new AnimationParser('fadeIn;fadeOut').parse();

      expect(parseAnimations(result).length).toBe(6); // fadeIn (3) + fadeOut (3)
    });

    it('should combine presets with parentheses', () => {
      const result = new AnimationParser('fadeIn();rotateIn()').parse();

      expect(parseAnimations(result).length).toBeGreaterThan(3);
    });

    it('should combine presets with parameters', () => {
      const result = new AnimationParser('fadeIn({ x: "-100%" });fadeOut({ x: "100%" })').parse();

      expect(parseAnimations(result).length).toBe(6);
      expect(parseAnimations(result)[0].vars.x).toBe('-100%');
    });

    it('should mix presets and raw syntax', () => {
      const result = new AnimationParser('fadeIn;opacity:1:>').parse();

      expect(parseAnimations(result).length).toBe(4); // fadeIn (3) + raw (1)
    });

    it('should combine multiple presets with selector', () => {
      const result = new AnimationParser('fadeIn({ selector: ".card" });rotateIn({ selector: ".card" })').parse();

      expect(parseAnimations(result).length).toBeGreaterThan(3);
      parseAnimations(result).forEach((anim) => {
        expect(anim.selector).toBe('.card');
      });
    });
  });

  describe('Selector in presets', () => {
    it('should extract selector from preset with object syntax', () => {
      const result = new AnimationParser('fadeIn({ selector: ".card" })').parse();

      expect(parseAnimations(result).length).toBe(3);
      parseAnimations(result).forEach((anim) => {
        expect(anim.selector).toBe('.card');
        expect(anim.vars).not.toHaveProperty('selector');
      });
    });

    it('should extract selector with custom preset params', () => {
      const result = new AnimationParser('slideIn({ selector: "> div", axis: "x", distance: "-200%" })').parse();

      expect(parseAnimations(result).length).toBe(1);
      expect(parseAnimations(result)[0].selector).toBe('> div');
      expect(parseAnimations(result)[0].vars.x).toBe('-200%');
      expect(parseAnimations(result)[0].vars).not.toHaveProperty('selector');
    });

    it('should extract selector with multiple custom vars', () => {
      const result = new AnimationParser(
        'fadeIn({ selector: ".card", duration: 2, ease: "power2.out", stagger: 0.5 })'
      ).parse();

      expect(parseAnimations(result).length).toBe(3);
      parseAnimations(result).forEach((anim) => {
        expect(anim.selector).toBe('.card');
        expect(anim.vars).toHaveProperty('duration', 2);
        expect(anim.vars).toHaveProperty('ease', 'power2.out');
        expect(anim.vars).toHaveProperty('stagger', 0.5);
        expect(anim.vars).not.toHaveProperty('selector');
      });
    });
  });
});
