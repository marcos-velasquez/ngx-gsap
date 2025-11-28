import { TweenVarsAppender } from '../tween-vars-appender';

describe('TweenVarsAppender', () => {
  describe('append()', () => {
    it('should append single customVar to single sequence', () => {
      const result = new TweenVarsAppender('x:100%:>').append({ duration: 2 });

      expect(result).toBe('x:100%:>@duration=2');
    });

    it('should append multiple customVars to single sequence', () => {
      const result = new TweenVarsAppender('x:100%:>').append({ duration: 2, ease: 'power2.out' });

      expect(result).toBe('x:100%:>@duration=2,ease=power2.out');
    });

    it('should append customVars to multiple sequences', () => {
      const result = new TweenVarsAppender('x:100%:>;y:0:0').append({ duration: 2 });

      expect(result).toBe('x:100%:>@duration=2;y:0:0@duration=2');
    });

    it('should append multiple customVars to multiple sequences', () => {
      const result = new TweenVarsAppender('x:100%:>;y:0:0;opacity:0:0').append({ duration: 2, ease: 'power2.out' });

      expect(result).toBe(
        'x:100%:>@duration=2,ease=power2.out;y:0:0@duration=2,ease=power2.out;opacity:0:0@duration=2,ease=power2.out'
      );
    });

    it('should return sequence unchanged when no customVars', () => {
      const result = new TweenVarsAppender('x:100%:>').append({});

      expect(result).toBe('x:100%:>');
    });

    it('should handle boolean customVars', () => {
      const result = new TweenVarsAppender('x:100%:>').append({ yoyo: true, paused: false });

      expect(result).toBe('x:100%:>@yoyo=true,paused=false');
    });

    it('should handle numeric customVars', () => {
      const result = new TweenVarsAppender('x:100%:>').append({ duration: 2, delay: 0.5 });

      expect(result).toBe('x:100%:>@duration=2,delay=0.5');
    });

    it('should handle string customVars', () => {
      const result = new TweenVarsAppender('x:100%:>').append({ ease: 'power2.out' });

      expect(result).toBe('x:100%:>@ease=power2.out');
    });

    it('should handle mixed type customVars', () => {
      const result = new TweenVarsAppender('x:100%:>').append({ duration: 2, ease: 'power2.out', yoyo: true });

      expect(result).toBe('x:100%:>@duration=2,ease=power2.out,yoyo=true');
    });

    it('should handle empty sequence', () => {
      const result = new TweenVarsAppender('').append({ duration: 2 });

      expect(result).toBe('@duration=2');
    });

    it('should merge customVars with existing props using comma', () => {
      const result = new TweenVarsAppender('to:x:100:>@duration=2').append({ selector: '.card' });

      expect(result).toBe('to:x:100:>@duration=2,selector=.card');
    });

    it('should handle sequences with and without existing props', () => {
      const result = new TweenVarsAppender('set:opacity:0;to:x:100@duration=2').append({ selector: '.target' });

      expect(result).toBe('set:opacity:0@selector=.target;to:x:100@duration=2,selector=.target');
    });

    it('should append method-specific vars only to matching methods', () => {
      const result = new TweenVarsAppender('set:opacity:0;x:100:0;to:scale:1').append({
        to: { stagger: 0.5 },
        from: { ease: 'power2' },
      });

      expect(result).toBe('set:opacity:0;x:100:0@ease=power2;to:scale:1@stagger=0.5');
    });

    it('should not append vars to set when only to vars specified', () => {
      const result = new TweenVarsAppender('set:opacity:0;set:scale:0.1;to:opacity:1;to:scale:1').append({
        to: { stagger: 0.5 },
      });

      expect(result).toBe('set:opacity:0;set:scale:0.1;to:opacity:1@stagger=0.5;to:scale:1@stagger=0.5');
    });

    it('should handle from as default method when no prefix', () => {
      const result = new TweenVarsAppender('x:100:0;y:50:0;to:opacity:1').append({
        from: { ease: 'power2' },
        to: { stagger: 0.2 },
      });

      expect(result).toBe('x:100:0@ease=power2;y:50:0@ease=power2;to:opacity:1@stagger=0.2');
    });
  });
});
