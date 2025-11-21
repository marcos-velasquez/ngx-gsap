import { TimelinePropsExtractor } from '../features/timeline';

describe('TimelinePropsExtractor', () => {
  it('should extract from beginning', () => {
    const timelineVars = new TimelinePropsExtractor('timeline@repeat=3,yoyo=true;to:x:100:>').extract();
    expect(timelineVars).toEqual({ repeat: 3, yoyo: true });
  });

  it('should extract from middle', () => {
    const timelineVars = new TimelinePropsExtractor('to:x:100:>;timeline@repeat=2;to:y:50:>').extract();
    expect(timelineVars).toEqual({ repeat: 2 });
  });

  it('should extract from end', () => {
    const timelineVars = new TimelinePropsExtractor('to:x:100:>;to:y:50:>;timeline@repeat=4').extract();
    expect(timelineVars).toEqual({ repeat: 4 });
  });

  it('should return empty vars when no timeline@', () => {
    const timelineVars = new TimelinePropsExtractor('to:x:100:>;to:y:50:>').extract();
    expect(timelineVars).toEqual({});
  });

  it('should handle multiple property types', () => {
    const timelineVars = new TimelinePropsExtractor(
      'timeline@ease=power2.out,duration=2,repeat=-1,yoyo=true;fadeIn'
    ).extract();
    expect(timelineVars).toEqual({ ease: 'power2.out', duration: 2, repeat: -1, yoyo: true });
  });
});
