import { VarsAppender } from '../appenders/vars-appender';

describe('VarsAppender', () => {
  it('should append both custom vars and timeline vars', () => {
    const appender = new VarsAppender('to:x:100:>;to:y:50:0');
    const result = appender.append({ duration: 2, ease: 'power2.out' }, { repeat: 3, yoyo: true }, {});

    expect(result).toContain('timeline@repeat=3,yoyo=true');
    expect(result).toContain('duration=2');
    expect(result).toContain('ease=power2.out');
  });

  it('should append only custom vars when timeline vars is empty', () => {
    const appender = new VarsAppender('to:x:100:>;to:y:50:0');
    const result = appender.append({ duration: 2 }, {}, {});

    expect(result).toContain('duration=2');
    expect(result).not.toContain('timeline@');
  });

  it('should append only timeline vars when custom vars is empty', () => {
    const appender = new VarsAppender('to:x:100:>;to:y:50:0');
    const result = appender.append({}, { repeat: 2 }, {});

    expect(result).toContain('timeline@repeat=2');
    expect(result).toBe('timeline@repeat=2;to:x:100:>;to:y:50:0');
  });

  it('should return sequence unchanged when all vars are empty', () => {
    const sequence = 'to:x:100:>;to:y:50:0';
    const appender = new VarsAppender(sequence);
    const result = appender.append({}, {}, {});

    expect(result).toBe(sequence);
  });

  it('should replace existing timeline@ when appending timeline vars', () => {
    const appender = new VarsAppender('timeline@repeat=5;to:x:10:>;to:x:-10:0');
    const result = appender.append({ duration: 0.1 }, { repeat: 1 }, {});

    expect(result).toContain('timeline@repeat=1');
    expect(result).toContain('duration=0.1');
    expect(result).not.toContain('repeat=5');
  });

  it('should handle complex scenario with multiple vars', () => {
    const appender = new VarsAppender('to:opacity:0:>;to:scale:1.1:>');
    const result = appender.append(
      { duration: 2, ease: 'power2.inOut', selector: '.item' },
      { repeat: -1, repeatDelay: 1, yoyo: true },
      {}
    );

    expect(result).toContain('timeline@');
    expect(result).toContain('repeat=-1');
    expect(result).toContain('repeatDelay=1');
    expect(result).toContain('yoyo=true');
    expect(result).toContain('duration=2');
    expect(result).toContain('ease=power2.inOut');
    expect(result).toContain('selector=.item');
  });

  it('should append scrollTrigger vars', () => {
    const appender = new VarsAppender('to:x:100:>;to:y:50:0');
    const result = appender.append({}, {}, { scrub: true, pin: true });

    expect(result).toContain('scroll@scrub=true,pin=true');
  });

  it('should append all three types of vars', () => {
    const appender = new VarsAppender('to:opacity:0:>');
    const result = appender.append({ duration: 2 }, { repeat: 2 }, { scrub: 1, markers: true });

    expect(result).toContain('duration=2');
    expect(result).toContain('timeline@repeat=2');
    expect(result).toContain('scroll@scrub=1,markers=true');
  });

  it('should replace existing scroll@ when appending scroll vars', () => {
    const appender = new VarsAppender('scroll@scrub=false;to:x:10:>');
    const result = appender.append({}, {}, { scrub: true, pin: true });

    expect(result).toContain('scroll@scrub=true,pin=true');
    expect(result).not.toContain('scrub=false');
  });
});
