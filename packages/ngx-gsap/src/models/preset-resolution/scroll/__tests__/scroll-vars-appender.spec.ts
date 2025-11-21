import { ScrollVarsAppender } from '../../scroll';

describe('ScrollVarsAppender', () => {
  it('should append scrollTrigger vars to sequence', () => {
    const appender = new ScrollVarsAppender('to:x:100:>;to:y:50:0');
    const result = appender.append({ scrub: true, pin: true });

    expect(result).toBe('scroll@scrub=true,pin=true;to:x:100:>;to:y:50:0');
  });

  it('should append scrollTrigger with multiple properties', () => {
    const appender = new ScrollVarsAppender('fadeIn');
    const result = appender.append({
      start: 'top center',
      end: 'bottom top',
      scrub: 1,
      markers: true,
    });

    expect(result).toContain('scroll@');
    expect(result).toContain('start="top center"');
    expect(result).toContain('end="bottom top"');
    expect(result).toContain('scrub=1');
    expect(result).toContain('markers=true');
  });

  it('should return sequence unchanged when scrollVars is empty', () => {
    const sequence = 'to:x:100:>;to:y:50:0';
    const appender = new ScrollVarsAppender(sequence);
    const result = appender.append({});

    expect(result).toBe(sequence);
  });

  it('should replace existing scrollTrigger@ declaration', () => {
    const appender = new ScrollVarsAppender('scroll@scrub=false,pin=false;to:x:100:>');
    const result = appender.append({ scrub: true, pin: true });

    expect(result).toBe('scroll@scrub=true,pin=true;to:x:100:>');
    expect(result).not.toContain('scrub=false');
  });

  it('should handle toggleActions string', () => {
    const appender = new ScrollVarsAppender('fadeIn');
    const result = appender.append({ toggleActions: 'play reverse play reverse' });

    expect(result).toContain('toggleActions="play reverse play reverse"');
  });

  it('should handle boolean values', () => {
    const appender = new ScrollVarsAppender('to:opacity:0:>');
    const result = appender.append({ scrub: false, pin: true, markers: false });

    expect(result).toContain('scrub=false');
    expect(result).toContain('pin=true');
    expect(result).toContain('markers=false');
  });

  it('should handle numeric scrub value', () => {
    const appender = new ScrollVarsAppender('fadeIn');
    const result = appender.append({ scrub: 2.5 });

    expect(result).toContain('scrub=2.5');
  });

  it('should work with existing timeline@ declaration', () => {
    const appender = new ScrollVarsAppender('timeline@repeat=2;to:x:100:>');
    const result = appender.append({ scrub: true });

    expect(result).toContain('timeline@repeat=2');
    expect(result).toContain('scroll@scrub=true');
  });
});
