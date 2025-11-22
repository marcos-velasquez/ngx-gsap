import { PresetMatcher } from '../../preset-matcher';
import { SplitTextVarsExtractor } from '../split-text-vars-extractor';

describe('SplitTextVarsExtractor', () => {
  it('should extract splitText from preset function', () => {
    const matcher = new PresetMatcher('fadeIn({ splitText: { type: "chars", target: "chars" } })');
    const extractor = new SplitTextVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({ type: 'chars', target: 'chars' });
  });

  it('should extract splitText with multiple properties', () => {
    const matcher = new PresetMatcher(
      'slideIn({ splitText: { type: "chars,words,lines", target: "words", charsClass: "char" } })'
    );
    const extractor = new SplitTextVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({
      type: 'chars,words,lines',
      target: 'words',
      charsClass: 'char',
    });
  });

  it('should return empty object when no splitText property', () => {
    const matcher = new PresetMatcher('fadeIn({ x: 100, duration: 2 })');
    const extractor = new SplitTextVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({});
  });

  it('should return empty object when preset has no arguments', () => {
    const matcher = new PresetMatcher('fadeIn()');
    const extractor = new SplitTextVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({});
  });

  it('should return empty object when not a function preset', () => {
    const matcher = new PresetMatcher('fadeIn');
    const extractor = new SplitTextVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({});
  });

  it('should extract splitText alongside other properties', () => {
    const matcher = new PresetMatcher(
      'fadeIn({ x: 100, duration: 2, splitText: { type: "chars", target: "chars" }, timeline: { repeat: 2 } })'
    );
    const extractor = new SplitTextVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({ type: 'chars', target: 'chars' });
  });

  it('should handle different target values', () => {
    const matcher = new PresetMatcher('fadeIn({ splitText: { target: "lines", type: "lines" } })');
    const extractor = new SplitTextVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({ target: 'lines', type: 'lines' });
  });
});
