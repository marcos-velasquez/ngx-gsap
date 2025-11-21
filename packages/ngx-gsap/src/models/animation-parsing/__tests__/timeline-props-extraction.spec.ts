import { AnimationParser } from '../animation-parser';
import { TimelinePropsExtractor } from '../timeline';

describe('Timeline Properties Extraction', () => {
  it('should extract timeline properties from sequence', () => {
    const result = new AnimationParser('timeline@repeat=3,yoyo=true;to:x:100:>').parse();
    const timelineVars = new TimelinePropsExtractor(result.sequence).extract();
    expect(timelineVars).toEqual({ repeat: 3, yoyo: true });
  });

  it('should work with presets', () => {
    const result = new AnimationParser('timeline@repeat=3,yoyo=true;shake').parse();
    const timelineVars = new TimelinePropsExtractor(result.sequence).extract();
    expect(timelineVars).toEqual({ repeat: 3, yoyo: true });
  });

  it('should return empty timelineVars when no timeline@', () => {
    const result = new AnimationParser('to:x:100:>').parse();
    const timelineVars = new TimelinePropsExtractor(result.sequence).extract();
    expect(timelineVars).toEqual({});
  });
});
