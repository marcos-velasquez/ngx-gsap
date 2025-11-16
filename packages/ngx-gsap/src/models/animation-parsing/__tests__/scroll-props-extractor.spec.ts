import { ScrollPropsExtractor } from '../scroll-props-extractor';

describe('ScrollPropsExtractor', () => {
  it('should extract from beginning', () => {
    const scrollVars = new ScrollPropsExtractor('scroll@start="top center",scrub=true;to:x:100:>').extract();
    expect(scrollVars).toEqual({ start: 'top center', scrub: true });
  });

  it('should extract from middle', () => {
    const scrollVars = new ScrollPropsExtractor('to:x:100:>;scroll@scrub=1,pin=true;to:y:50:>').extract();
    expect(scrollVars).toEqual({ scrub: 1, pin: true });
  });

  it('should extract from end', () => {
    const scrollVars = new ScrollPropsExtractor('to:x:100:>;to:y:50:>;scroll@markers=true').extract();
    expect(scrollVars).toEqual({ markers: true });
  });

  it('should return empty vars when no scroll@', () => {
    const scrollVars = new ScrollPropsExtractor('to:x:100:>;to:y:50:>').extract();
    expect(scrollVars).toEqual({});
  });

  it('should handle multiple property types', () => {
    const scrollVars = new ScrollPropsExtractor(
      'scroll@start="top bottom",end="bottom top",scrub=1.5,pin=true,markers=false;fadeIn'
    ).extract();
    expect(scrollVars).toEqual({
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
      pin: true,
      markers: false,
    });
  });

  it('should handle toggleActions string', () => {
    const scrollVars = new ScrollPropsExtractor('scroll@toggleActions="play reverse play reverse"').extract();
    expect(scrollVars).toEqual({ toggleActions: 'play reverse play reverse' });
  });

  it('should handle scrub as boolean', () => {
    const scrollVars = new ScrollPropsExtractor('scroll@scrub=true').extract();
    expect(scrollVars).toEqual({ scrub: true });
  });

  it('should handle scrub as number', () => {
    const scrollVars = new ScrollPropsExtractor('scroll@scrub=2').extract();
    expect(scrollVars).toEqual({ scrub: 2 });
  });

  it('should handle all common ScrollTrigger properties', () => {
    const scrollVars = new ScrollPropsExtractor(
      'scroll@start="top center",end="center center",scrub=true,pin=true,markers=true,toggleActions="play none none reverse"'
    ).extract();
    expect(scrollVars).toEqual({
      start: 'top center',
      end: 'center center',
      scrub: true,
      pin: true,
      markers: true,
      toggleActions: 'play none none reverse',
    });
  });

  it('should work with presets', () => {
    const scrollVars = new ScrollPropsExtractor('fadeIn();scroll@scrub=true,pin=true').extract();
    expect(scrollVars).toEqual({ scrub: true, pin: true });
  });

  it('should handle single quotes in string values', () => {
    const scrollVars = new ScrollPropsExtractor("scroll@start='top center',end='bottom top'").extract();
    expect(scrollVars).toEqual({ start: 'top center', end: 'bottom top' });
  });

  it('should handle mixed quotes', () => {
    const scrollVars = new ScrollPropsExtractor('scroll@start="top center",toggleActions=\'play none none none\'').extract();
    expect(scrollVars).toEqual({ start: 'top center', toggleActions: 'play none none none' });
  });
});
