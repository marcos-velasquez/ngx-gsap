import { CustomVarsAppender } from '../appenders/custom-vars-appender';

describe('CustomVarsAppender', () => {
  describe('append()', () => {
    it('should append single customVar to single sequence', () => {
      const result = new CustomVarsAppender('x:100%:>').append({ duration: 2 });

      expect(result).toBe('x:100%:>@duration=2');
    });

    it('should append multiple customVars to single sequence', () => {
      const result = new CustomVarsAppender('x:100%:>').append({ duration: 2, ease: 'power2.out' });

      expect(result).toBe('x:100%:>@duration=2,ease=power2.out');
    });

    it('should append customVars to multiple sequences', () => {
      const result = new CustomVarsAppender('x:100%:>;y:0:0').append({ duration: 2 });

      expect(result).toBe('x:100%:>@duration=2;y:0:0@duration=2');
    });

    it('should append multiple customVars to multiple sequences', () => {
      const result = new CustomVarsAppender('x:100%:>;y:0:0;opacity:0:0').append({ duration: 2, ease: 'power2.out' });

      expect(result).toBe(
        'x:100%:>@duration=2,ease=power2.out;y:0:0@duration=2,ease=power2.out;opacity:0:0@duration=2,ease=power2.out'
      );
    });

    it('should return sequence unchanged when no customVars', () => {
      const result = new CustomVarsAppender('x:100%:>').append({});

      expect(result).toBe('x:100%:>');
    });

    it('should handle boolean customVars', () => {
      const result = new CustomVarsAppender('x:100%:>').append({ yoyo: true, paused: false });

      expect(result).toBe('x:100%:>@yoyo=true,paused=false');
    });

    it('should handle numeric customVars', () => {
      const result = new CustomVarsAppender('x:100%:>').append({ duration: 2, delay: 0.5 });

      expect(result).toBe('x:100%:>@duration=2,delay=0.5');
    });

    it('should handle string customVars', () => {
      const result = new CustomVarsAppender('x:100%:>').append({ ease: 'power2.out' });

      expect(result).toBe('x:100%:>@ease=power2.out');
    });

    it('should handle mixed type customVars', () => {
      const result = new CustomVarsAppender('x:100%:>').append({ duration: 2, ease: 'power2.out', yoyo: true });

      expect(result).toBe('x:100%:>@duration=2,ease=power2.out,yoyo=true');
    });

    it('should handle empty sequence', () => {
      const result = new CustomVarsAppender('').append({ duration: 2 });

      expect(result).toBe('@duration=2');
    });
  });
});
