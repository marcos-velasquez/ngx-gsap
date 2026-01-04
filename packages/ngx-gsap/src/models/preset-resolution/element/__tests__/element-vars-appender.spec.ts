import { ElementVarsAppender } from '../element-vars-appender';

describe('ElementVarsAppender', () => {
  it('should append element vars to sequence', () => {
    const appender = new ElementVarsAppender('to:x:100:>;to:y:50:0');
    const result = appender.append({ perspective: 1000, transformOrigin: 'center' });

    expect(result).toBe('element@perspective=1000,transformOrigin=center;to:x:100:>;to:y:50:0');
  });

  it('should append element with quoted values when needed', () => {
    const appender = new ElementVarsAppender('fadeIn');
    const result = appender.append({ perspective: 500, transformOrigin: '50% 50%' });

    expect(result).toContain('element@');
    expect(result).toContain('perspective=500');
    expect(result).toContain('transformOrigin="50% 50%"');
  });

  it('should return sequence unchanged when element vars is empty', () => {
    const sequence = 'to:x:100:>;to:y:50:0';
    const appender = new ElementVarsAppender(sequence);
    const result = appender.append({});

    expect(result).toBe(sequence);
  });

  it('should replace existing element@ declaration', () => {
    const appender = new ElementVarsAppender('element@perspective=200;to:x:10:>');
    const result = appender.append({ perspective: 300 });

    expect(result).toBe('element@perspective=300;to:x:10:>');
    expect(result).not.toContain('perspective=200');
  });

  it('should work with existing timeline@ declaration', () => {
    const appender = new ElementVarsAppender('timeline@repeat=2;to:x:100:>');
    const result = appender.append({ perspective: 100, transformOrigin: 'center' });

    expect(result).toContain('timeline@repeat=2');
    expect(result).toContain('element@perspective=100,transformOrigin=center');
  });

  it('should replace element@ in middle of sequence', () => {
    const appender = new ElementVarsAppender('to:x:10:>;element@perspective=100;to:y:20:0');
    const result = appender.append({ perspective: 2 });

    expect(result).toBe('to:x:10:>;element@perspective=2;to:y:20:0');
  });
});
