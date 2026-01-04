import { MorphSVGVarsAppender } from '../morph-svg-vars-appender';

describe('MorphSVGVarsAppender', () => {
  it('should append morphSVG vars to sequence', () => {
    const appender = new MorphSVGVarsAppender('to:x:100:>;to:y:50:0');
    const result = appender.append({ shape: '#star', type: 'linear' });

    expect(result).toBe('morphSVG@shape="#star",type=linear;to:x:100:>;to:y:50:0');
  });

  it('should append morphSVG with multiple properties', () => {
    const appender = new MorphSVGVarsAppender('fadeIn');
    const result = appender.append({
      shape: '#lightning',
      type: 'rotational',
      origin: '50% 50%',
      shapeIndex: 0,
    });

    expect(result).toContain('morphSVG@');
    expect(result).toContain('shape="#lightning"');
    expect(result).toContain('type=rotational');
    expect(result).toContain('origin="50% 50%"');
    expect(result).toContain('shapeIndex=0');
  });

  it('should return sequence unchanged when morphSVGVars is empty', () => {
    const sequence = 'to:x:100:>;to:y:50:0';
    const appender = new MorphSVGVarsAppender(sequence);
    // MorphSVGVars requires a `shape` property in the type definitions; cast to any for empty case
    const result = appender.append({} as any);

    expect(result).toBe(sequence);
  });

  it('should replace existing morphSVG@ declaration', () => {
    const appender = new MorphSVGVarsAppender('morphSVG@shape="#circle",type=linear;to:x:100:>');
    const result = appender.append({ shape: '#star', type: 'rotational' });

    expect(result).toBe('morphSVG@shape="#star",type=rotational;to:x:100:>');
    expect(result).not.toContain('shape="#circle"');
  });

  it('should handle rotational type', () => {
    const appender = new MorphSVGVarsAppender('fadeIn');
    const result = appender.append({ shape: '#diamond', type: 'rotational' });

    expect(result).toContain('shape="#diamond"');
    expect(result).toContain('type=rotational');
  });

  it('should work with existing timeline@ declaration', () => {
    const appender = new MorphSVGVarsAppender('timeline@repeat=2;to:x:100:>');
    const result = appender.append({ shape: '#star', type: 'linear' });

    expect(result).toContain('timeline@repeat=2');
    expect(result).toContain('morphSVG@shape="#star",type=linear');
  });

  it('should work with existing scroll@ declaration', () => {
    const appender = new MorphSVGVarsAppender('scroll@scrub=true;to:x:100:>');
    const result = appender.append({ shape: '#circle', type: 'linear' });

    expect(result).toContain('scroll@scrub=true');
    expect(result).toContain('morphSVG@shape="#circle",type=linear');
  });

  it('should handle map property', () => {
    const appender = new MorphSVGVarsAppender('fadeIn');
    // `map` expects one of 'size' | 'position' | 'complexity' according to types
    const result = appender.append({ shape: '#target', map: 'complexity' as const });

    expect(result).toContain('shape="#target"');
    expect(result).toContain('map=complexity');
  });
});
