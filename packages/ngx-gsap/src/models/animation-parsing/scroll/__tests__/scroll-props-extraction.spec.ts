import { AnimationParser } from '../../animation-parser';
import { ScrollPropsExtractor } from '../scroll-props-extractor';

describe('Scroll Properties Extraction', () => {
  it('should extract scroll properties from sequence', () => {
    const result = new AnimationParser('scroll@start="top center",scrub=true;to:x:100:>').parse();
    const scrollVars = new ScrollPropsExtractor(result.sequence).extract();
    expect(scrollVars).toEqual({ start: 'top center', scrub: true });
  });

  it('should work with presets', () => {
    const result = new AnimationParser('fadeIn();scroll@scrub=true,pin=true').parse();
    const scrollVars = new ScrollPropsExtractor(result.sequence).extract();
    expect(scrollVars).toEqual({ scrub: true, pin: true });
  });

  it('should return empty scrollVars when no scroll@', () => {
    const result = new AnimationParser('to:x:100:>').parse();
    const scrollVars = new ScrollPropsExtractor(result.sequence).extract();
    expect(scrollVars).toEqual({});
  });

  it('should handle all ScrollTrigger properties', () => {
    const result = new AnimationParser(
      'fadeIn();scroll@start="top bottom",end="bottom top",scrub=1.5,pin=true,markers=false,toggleActions="play reverse play reverse"'
    ).parse();
    const scrollVars = new ScrollPropsExtractor(result.sequence).extract();
    expect(scrollVars).toEqual({
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
      pin: true,
      markers: false,
      toggleActions: 'play reverse play reverse',
    });
  });
});
