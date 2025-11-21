import { Timeline } from '../../../timeline';
import { AnimationParserResult } from '../../animation-parser';
import { TimelineApplicator } from '../timeline-applicator';
import { TimelineMockBuilder } from '../../__tests__/__helpers__';

describe('TimelineApplicator', () => {
  let applicator: TimelineApplicator;
  let mockTimeline: jest.Mocked<Timeline>;

  beforeEach(() => {
    applicator = new TimelineApplicator();
    mockTimeline = TimelineMockBuilder.mock();
  });

  describe('apply()', () => {
    it('should configure timeline when timeline vars are present', () => {
      const context: AnimationParserResult = {
        sequence: 'to:.box:x:100;timeline@repeat=2,yoyo=true',
        sequences: ['to:.box:x:100', 'timeline@repeat=2,yoyo=true'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.configure).toHaveBeenCalledWith({
        repeat: 2,
        yoyo: true,
      });
    });

    it('should not configure timeline when no timeline vars present', () => {
      const context: AnimationParserResult = {
        sequence: 'to:.box:x:100',
        sequences: ['to:.box:x:100'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.configure).not.toHaveBeenCalled();
    });

    it('should handle empty timeline vars object', () => {
      const context: AnimationParserResult = {
        sequence: 'to:.box:x:100;timeline@',
        sequences: ['to:.box:x:100', 'timeline@'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.configure).not.toHaveBeenCalled();
    });

    it('should configure timeline with multiple vars', () => {
      const context: AnimationParserResult = {
        sequence: 'timeline@repeat=-1,yoyo=true,delay=1,duration=2',
        sequences: ['timeline@repeat=-1,yoyo=true,delay=1,duration=2'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.configure).toHaveBeenCalledWith({
        repeat: -1,
        yoyo: true,
        delay: 1,
        duration: 2,
      });
    });
  });
});
