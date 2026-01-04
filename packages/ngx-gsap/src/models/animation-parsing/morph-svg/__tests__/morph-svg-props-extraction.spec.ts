import { AnimationParser } from '../../animation-parser';
import { MorphSVGPropsExtractor } from '../morph-svg-props-extractor';

describe('MorphSVG Properties Extraction', () => {
  it('should extract morphSVG properties from sequence', () => {
    const result = new AnimationParser('morphSVG@shape="#star",type="linear";to:x:100:>').parse();
    const morphSVGVars = new MorphSVGPropsExtractor(result.sequence).extract();
    expect(morphSVGVars).toEqual({ shape: '#star', type: 'linear' });
  });

  it('should work with presets', () => {
    const result = new AnimationParser('fadeIn();morphSVG@shape="#lightning",type="rotational"').parse();
    const morphSVGVars = new MorphSVGPropsExtractor(result.sequence).extract();
    expect(morphSVGVars).toEqual({ shape: '#lightning', type: 'rotational' });
  });

  it('should return empty morphSVGVars when no morphSVG@', () => {
    const result = new AnimationParser('to:x:100:>').parse();
    const morphSVGVars = new MorphSVGPropsExtractor(result.sequence).extract();
    expect(morphSVGVars).toEqual({});
  });

  it('should handle all MorphSVG properties', () => {
    const result = new AnimationParser(
      'fadeIn();morphSVG@shape="#circle",type="linear",origin="50% 50%",shapeIndex=0,map="complexity"'
    ).parse();
    const morphSVGVars = new MorphSVGPropsExtractor(result.sequence).extract();
    expect(morphSVGVars).toEqual({
      shape: '#circle',
      type: 'linear',
      origin: '50% 50%',
      shapeIndex: 0,
      map: 'complexity',
    });
  });
});
