import { Timeline } from '../../timeline';
import { AnimationParserResult } from '../animation-parser';
import { ScrollApplicator } from '../scroll/scroll-applicator';

describe('ScrollApplicator', () => {
  let applicator: ScrollApplicator;
  let mockTimeline: jest.Mocked<Timeline>;

  beforeEach(() => {
    applicator = new ScrollApplicator();
    mockTimeline = {
      isScroll: jest.fn().mockReturnValue({
        whenTrue: jest.fn((callback) => callback()),
      }),
      scroll: jest.fn(),
    } as unknown as jest.Mocked<Timeline>;
  });

  describe('apply()', () => {
    it('should apply scroll vars when timeline is scroll', () => {
      const context: AnimationParserResult = {
        sequence: 'to:.box:x:100;scroll@trigger=.container,start=top center',
        sequences: ['to:.box:x:100', 'scroll@trigger=.container,start=top center'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.isScroll).toHaveBeenCalled();
      expect(mockTimeline.scroll).toHaveBeenCalledWith({ trigger: '.container', start: 'top center' });
    });

    it('should not apply scroll vars when timeline is not scroll', () => {
      mockTimeline.isScroll = jest.fn().mockReturnValue({
        whenTrue: jest.fn(),
      });

      const context: AnimationParserResult = {
        sequence: 'to:.box:x:100',
        sequences: ['to:.box:x:100'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.isScroll).toHaveBeenCalled();
      expect(mockTimeline.scroll).not.toHaveBeenCalled();
    });

    it('should handle empty scroll vars', () => {
      const context: AnimationParserResult = {
        sequence: 'to:.box:x:100;scroll@',
        sequences: ['to:.box:x:100', 'scroll@'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.isScroll).toHaveBeenCalled();
      expect(mockTimeline.scroll).toHaveBeenCalledWith({});
    });

    it('should apply multiple scroll vars', () => {
      const context: AnimationParserResult = {
        sequence: 'scroll@trigger=.box,start=top top,end=bottom bottom,scrub=true,pin=true',
        sequences: ['scroll@trigger=.box,start=top top,end=bottom bottom,scrub=true,pin=true'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.scroll).toHaveBeenCalledWith({
        trigger: '.box',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: true,
      });
    });
  });
});
