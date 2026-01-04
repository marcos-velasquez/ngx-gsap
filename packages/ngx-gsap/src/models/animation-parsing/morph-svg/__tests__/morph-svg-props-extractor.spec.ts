import { MorphSVGPropsExtractor } from '../morph-svg-props-extractor';

describe('MorphSVGPropsExtractor', () => {
  it('should extract from beginning', () => {
    const morphSVGVars = new MorphSVGPropsExtractor('morphSVG@shape="#star",type="linear";to:x:100:>').extract();
    expect(morphSVGVars).toEqual({ shape: '#star', type: 'linear' });
  });

  it('should extract from middle', () => {
    const morphSVGVars = new MorphSVGPropsExtractor('to:x:100:>;morphSVG@shape="#lightning";from:opacity:0').extract();
    expect(morphSVGVars).toEqual({ shape: '#lightning' });
  });

  it('should extract from end', () => {
    const morphSVGVars = new MorphSVGPropsExtractor('to:x:100:>;morphSVG@shape="#circle",type="rotational"').extract();
    expect(morphSVGVars).toEqual({ shape: '#circle', type: 'rotational' });
  });

  it('should extract multiple properties', () => {
    const morphSVGVars = new MorphSVGPropsExtractor(
      'morphSVG@shape="#star",type="linear",origin="50% 50%",shapeIndex=0'
    ).extract();
    expect(morphSVGVars).toEqual({
      shape: '#star',
      type: 'linear',
      origin: '50% 50%',
      shapeIndex: 0,
    });
  });

  it('should handle rotational type', () => {
    const morphSVGVars = new MorphSVGPropsExtractor('morphSVG@shape="#diamond",type="rotational"').extract();
    expect(morphSVGVars).toEqual({ shape: '#diamond', type: 'rotational' });
  });

  it('should return empty object when no morphSVG@', () => {
    const morphSVGVars = new MorphSVGPropsExtractor('to:x:100:>').extract();
    expect(morphSVGVars).toEqual({});
  });

  it('should handle morphSVG@ with no properties', () => {
    const morphSVGVars = new MorphSVGPropsExtractor('morphSVG@').extract();
    expect(morphSVGVars).toEqual({});
  });

  it('should work with presets', () => {
    const morphSVGVars = new MorphSVGPropsExtractor('fadeIn();morphSVG@shape="#star",type="linear"').extract();
    expect(morphSVGVars).toEqual({ shape: '#star', type: 'linear' });
  });

  it('should handle map property', () => {
    const morphSVGVars = new MorphSVGPropsExtractor('morphSVG@shape="#target",map="complexity:0.5"').extract();
    expect(morphSVGVars).toEqual({ shape: '#target', map: 'complexity:0.5' });
  });
});
