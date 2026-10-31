import { AnimationParser } from '../../animation-parsing';
import { Sequence } from '../animate-sequence';

describe('Sequence.toText()', () => {
  it('should pass a string sequence through untouched', () => {
    expect(Sequence.toText('to:x:100:0')).toBe('to:x:100:0');
  });

  it('should write a preset with params as the call its string form would make', () => {
    expect(Sequence.toText({ preset: 'fadeIn', x: '-100%', duration: 2 })).toBe('fadeIn({x:"-100%",duration:2})');
  });

  it('should write a preset without params as its bare name', () => {
    expect(Sequence.toText({ preset: 'pulse' })).toBe('pulse');
  });

  it('should resolve to the same animation as the equivalent string', () => {
    const typed = Sequence.toText({ preset: 'fadeIn', x: '-100%', duration: 2, scroll: { start: 'top center' } });

    expect(new AnimationParser(typed).parse()).toEqual(
      new AnimationParser("fadeIn({ x: '-100%', duration: 2, scroll: { start: 'top center' } })").parse()
    );
  });

  it('should reject a function, which a sequence cannot carry', () => {
    expect(() => Sequence.toText({ preset: 'fadeIn', onComplete: () => undefined })).toThrow(
      '"onComplete" is a function'
    );
  });
});
