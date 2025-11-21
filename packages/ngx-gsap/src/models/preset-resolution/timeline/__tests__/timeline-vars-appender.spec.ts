import { TimelineVarsAppender } from '../../timeline';

describe('TimelineVarsAppender', () => {
  it('should append timeline vars to sequence without existing timeline@', () => {
    const appender = new TimelineVarsAppender('to:x:100:>;to:y:50:0');
    const result = appender.append({ repeat: 3, yoyo: true });

    expect(result).toBe('timeline@repeat=3,yoyo=true;to:x:100:>;to:y:50:0');
  });

  it('should replace existing timeline@ directive', () => {
    const appender = new TimelineVarsAppender('timeline@repeat=5;to:x:10:>;to:x:-10:0');
    const result = appender.append({ repeat: 1 });

    expect(result).toBe('timeline@repeat=1;to:x:10:>;to:x:-10:0');
  });

  it('should return sequence unchanged when timeline vars is empty', () => {
    const sequence = 'to:x:100:>;to:y:50:0';
    const appender = new TimelineVarsAppender(sequence);
    const result = appender.append({});

    expect(result).toBe(sequence);
  });

  it('should handle multiple timeline properties', () => {
    const appender = new TimelineVarsAppender('to:opacity:0:>');
    const result = appender.append({ repeat: -1, repeatDelay: 1, yoyo: true });

    expect(result).toContain('timeline@');
    expect(result).toContain('repeat=-1');
    expect(result).toContain('repeatDelay=1');
    expect(result).toContain('yoyo=true');
  });

  it('should replace timeline@ in middle of sequence', () => {
    const appender = new TimelineVarsAppender('to:x:10:>;timeline@repeat=5;to:y:20:0');
    const result = appender.append({ repeat: 2 });

    expect(result).toBe('to:x:10:>;timeline@repeat=2;to:y:20:0');
  });

  it('should handle string values in timeline vars', () => {
    const appender = new TimelineVarsAppender('to:scale:1.1:>');
    const result = appender.append({ ease: 'power2.inOut' });

    expect(result).toBe('timeline@ease=power2.inOut;to:scale:1.1:>');
  });
});
