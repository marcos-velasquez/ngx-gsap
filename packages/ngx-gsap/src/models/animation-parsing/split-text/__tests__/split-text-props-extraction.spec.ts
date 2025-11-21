import { AnimationParser } from '../../animation-parser';
import { SplitTextPropsExtractor } from '../split-text-props-extractor';

describe('SplitText Properties Extraction', () => {
  it('should extract splitText properties from sequence', () => {
    const result = new AnimationParser('splitText@type="chars",charsClass="char";to:x:100:>').parse();
    const splitTextVars = new SplitTextPropsExtractor(result.sequence).extract();
    expect(splitTextVars).toEqual({ type: 'chars', charsClass: 'char' });
  });

  it('should work with presets', () => {
    const result = new AnimationParser('fadeIn();splitText@type="words",wordsClass="word"').parse();
    const splitTextVars = new SplitTextPropsExtractor(result.sequence).extract();
    expect(splitTextVars).toEqual({ type: 'words', wordsClass: 'word' });
  });

  it('should return empty splitTextVars when no splitText@', () => {
    const result = new AnimationParser('to:x:100:>').parse();
    const splitTextVars = new SplitTextPropsExtractor(result.sequence).extract();
    expect(splitTextVars).toEqual({});
  });

  it('should handle all SplitText properties', () => {
    const result = new AnimationParser(
      'fadeIn();splitText@type="chars,words,lines",charsClass="char",wordsClass="word",linesClass="line",position="relative"'
    ).parse();
    const splitTextVars = new SplitTextPropsExtractor(result.sequence).extract();
    expect(splitTextVars).toEqual({
      type: 'chars,words,lines',
      charsClass: 'char',
      wordsClass: 'word',
      linesClass: 'line',
      position: 'relative',
    });
  });
});
