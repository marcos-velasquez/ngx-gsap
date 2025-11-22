import { SplitTextVarsAppender } from '../split-text-vars-appender';

describe('SplitTextVarsAppender', () => {
  it('should append splitText vars to sequence', () => {
    const appender = new SplitTextVarsAppender('to:x:100:>;to:y:50:0');
    const result = appender.append({ type: 'chars', target: 'chars' });

    expect(result).toBe('splitText@type=chars,target=chars;to:x:100:>;to:y:50:0');
  });

  it('should append splitText with multiple properties', () => {
    const appender = new SplitTextVarsAppender('fadeIn');
    const result = appender.append({
      type: 'chars,words,lines',
      target: 'words',
      charsClass: 'char',
    });

    expect(result).toContain('splitText@');
    expect(result).toContain('type="chars,words,lines"');
    expect(result).toContain('target=words');
    expect(result).toContain('charsClass=char');
  });

  it('should return sequence unchanged when splitTextVars is empty', () => {
    const sequence = 'to:x:100:>;to:y:50:0';
    const appender = new SplitTextVarsAppender(sequence);
    const result = appender.append({});

    expect(result).toBe(sequence);
  });

  it('should replace existing splitText@ declaration', () => {
    const appender = new SplitTextVarsAppender('splitText@type=words,target=words;to:x:100:>');
    const result = appender.append({ type: 'chars', target: 'chars' });

    expect(result).toBe('splitText@type=chars,target=chars;to:x:100:>');
    expect(result).not.toContain('type=words');
  });

  it('should handle different target values', () => {
    const appender = new SplitTextVarsAppender('fadeIn');
    const result = appender.append({ target: 'lines', type: 'lines' });

    expect(result).toContain('target=lines');
    expect(result).toContain('type=lines');
  });

  it('should work with existing timeline@ declaration', () => {
    const appender = new SplitTextVarsAppender('timeline@repeat=2;to:x:100:>');
    const result = appender.append({ type: 'chars', target: 'chars' });

    expect(result).toContain('timeline@repeat=2');
    expect(result).toContain('splitText@type=chars,target=chars');
  });

  it('should work with existing scroll@ declaration', () => {
    const appender = new SplitTextVarsAppender('scroll@scrub=true;to:x:100:>');
    const result = appender.append({ type: 'chars', target: 'chars' });

    expect(result).toContain('scroll@scrub=true');
    expect(result).toContain('splitText@type=chars,target=chars');
  });
});
