import { PresetMatcher } from '../../preset-matcher';
import { ElementVarsExtractor } from '../element-vars-extractor';

describe('ElementVarsExtractor', () => {
  it('should extract element from preset function', () => {
    const matcher = new PresetMatcher('fadeIn({ element: { perspective: 1000, transformOrigin: "center" } })');
    const extractor = new ElementVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({ perspective: 1000, transformOrigin: 'center' });
  });

  it('should extract element with multiple properties', () => {
    const matcher = new PresetMatcher(
      'slideIn({ element: { perspective: 500, transformOrigin: "50% 50%", overflow: "hidden" } })'
    );
    const extractor = new ElementVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({ perspective: 500, transformOrigin: '50% 50%', overflow: 'hidden' });
  });

  it('should return empty object when no element property', () => {
    const matcher = new PresetMatcher('fadeIn({ x: 100, duration: 2 })');
    const extractor = new ElementVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({});
  });

  it('should return empty object when preset has no arguments', () => {
    const matcher = new PresetMatcher('fadeIn()');
    const extractor = new ElementVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({});
  });

  it('should return empty object when not a function preset', () => {
    const matcher = new PresetMatcher('fadeIn');
    const extractor = new ElementVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({});
  });

  it('should extract element alongside other properties', () => {
    const matcher = new PresetMatcher(
      'fadeIn({ x: 100, duration: 2, element: { perspective: 1000, transformOrigin: "center" }, timeline: { repeat: 2 } })'
    );
    const extractor = new ElementVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({ perspective: 1000, transformOrigin: 'center' });
  });
});
