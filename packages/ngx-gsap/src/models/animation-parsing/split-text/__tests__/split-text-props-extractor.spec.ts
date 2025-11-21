import { SplitTextPropsExtractor } from '../split-text-props-extractor';

describe('SplitTextPropsExtractor', () => {
  it('should extract from beginning', () => {
    const splitTextVars = new SplitTextPropsExtractor('splitText@type="chars",charsClass="char";to:x:100:>').extract();
    expect(splitTextVars).toEqual({ type: 'chars', charsClass: 'char' });
  });

  it('should extract from middle', () => {
    const splitTextVars = new SplitTextPropsExtractor('to:x:100:>;splitText@type="words";from:opacity:0').extract();
    expect(splitTextVars).toEqual({ type: 'words' });
  });

  it('should extract from end', () => {
    const splitTextVars = new SplitTextPropsExtractor('to:x:100:>;splitText@type="lines",linesClass="line"').extract();
    expect(splitTextVars).toEqual({ type: 'lines', linesClass: 'line' });
  });

  it('should extract multiple properties', () => {
    const splitTextVars = new SplitTextPropsExtractor(
      'splitText@type="chars,words,lines",charsClass="char",wordsClass="word",linesClass="line"'
    ).extract();
    expect(splitTextVars).toEqual({
      type: 'chars,words,lines',
      charsClass: 'char',
      wordsClass: 'word',
      linesClass: 'line',
    });
  });

  it('should handle position property', () => {
    const splitTextVars = new SplitTextPropsExtractor('splitText@type="chars",position="absolute"').extract();
    expect(splitTextVars).toEqual({ type: 'chars', position: 'absolute' });
  });

  it('should return empty object when no splitText@', () => {
    const splitTextVars = new SplitTextPropsExtractor('to:x:100:>').extract();
    expect(splitTextVars).toEqual({});
  });

  it('should handle splitText@ with no properties', () => {
    const splitTextVars = new SplitTextPropsExtractor('splitText@').extract();
    expect(splitTextVars).toEqual({});
  });

  it('should work with presets', () => {
    const splitTextVars = new SplitTextPropsExtractor('fadeIn();splitText@type="chars",charsClass="char"').extract();
    expect(splitTextVars).toEqual({ type: 'chars', charsClass: 'char' });
  });
});
