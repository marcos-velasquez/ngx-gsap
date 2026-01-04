import { PresetMatcher } from '../../preset-matcher';
import { MorphSVGVarsExtractor } from '../morph-svg-vars-extractor';

describe('MorphSVGVarsExtractor', () => {
  it('should extract morphSVG from preset function', () => {
    const matcher = new PresetMatcher('fadeIn({ morphSVG: { shape: "#star", type: "linear" } })');
    const extractor = new MorphSVGVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({ shape: '#star', type: 'linear' });
  });

  it('should extract morphSVG with multiple properties', () => {
    const matcher = new PresetMatcher(
      'slideIn({ morphSVG: { shape: "#lightning", type: "rotational", origin: "50% 50%", shapeIndex: 0 } })'
    );
    const extractor = new MorphSVGVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({
      shape: '#lightning',
      type: 'rotational',
      origin: '50% 50%',
      shapeIndex: 0,
    });
  });

  it('should return empty object when no morphSVG property', () => {
    const matcher = new PresetMatcher('fadeIn({ x: 100, duration: 2 })');
    const extractor = new MorphSVGVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({});
  });

  it('should return empty object when preset has no arguments', () => {
    const matcher = new PresetMatcher('fadeIn()');
    const extractor = new MorphSVGVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({});
  });

  it('should return empty object when not a function preset', () => {
    const matcher = new PresetMatcher('fadeIn');
    const extractor = new MorphSVGVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({});
  });

  it('should extract morphSVG alongside other properties', () => {
    const matcher = new PresetMatcher(
      'fadeIn({ x: 100, duration: 2, morphSVG: { shape: "#circle", type: "linear" }, timeline: { repeat: 2 } })'
    );
    const extractor = new MorphSVGVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({ shape: '#circle', type: 'linear' });
  });

  it('should handle rotational type', () => {
    const matcher = new PresetMatcher('fadeIn({ morphSVG: { shape: "#diamond", type: "rotational" } })');
    const extractor = new MorphSVGVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({ shape: '#diamond', type: 'rotational' });
  });

  it('should handle map property', () => {
    const matcher = new PresetMatcher('fadeIn({ morphSVG: { shape: "#target", map: "complexity" } })');
    const extractor = new MorphSVGVarsExtractor(matcher);

    expect(extractor.extract()).toEqual({ shape: '#target', map: 'complexity' });
  });
});
