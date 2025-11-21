import { Timeline } from '../../../timeline';
import { AnimationParserResult } from '../../animation-parser';
import { TweenApplicator } from '../tween-applicator';
import { TimelineMockBuilder } from '../../__tests__/__helpers__';

describe('TweenApplicator', () => {
  let applicator: TweenApplicator;
  let mockTimeline: jest.Mocked<Timeline>;

  beforeEach(() => {
    applicator = new TweenApplicator();
    mockTimeline = TimelineMockBuilder.mock();
  });

  describe('apply()', () => {
    it('should apply single to animation', () => {
      const context: AnimationParserResult = {
        sequence: 'to:x:100:>',
        sequences: ['to:x:100:>'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.to).toHaveBeenCalledWith(undefined, { x: 100 }, '>');
    });

    it('should apply multiple animations', () => {
      const context: AnimationParserResult = {
        sequence: 'to:x:100:>;from:opacity:0:>',
        sequences: ['to:x:100:>', 'from:opacity:0:>'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.to).toHaveBeenCalledWith(undefined, { x: 100 }, '>');
      expect(mockTimeline.from).toHaveBeenCalledWith(undefined, { opacity: 0 }, '>');
    });

    it('should apply animation with position', () => {
      const context: AnimationParserResult = {
        sequence: 'to:x:100:<',
        sequences: ['to:x:100:<'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.to).toHaveBeenCalledWith(undefined, { x: 100 }, '<');
    });

    it('should apply animation with string value', () => {
      const context: AnimationParserResult = {
        sequence: 'to:x:100%:>',
        sequences: ['to:x:100%:>'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.to).toHaveBeenCalledWith(undefined, { x: '100%' }, '>');
    });

    it('should apply from animation', () => {
      const context: AnimationParserResult = {
        sequence: 'from:y:-50%:>',
        sequences: ['from:y:-50%:>'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.from).toHaveBeenCalledWith(undefined, { y: '-50%' }, '>');
    });

    it('should apply set animation', () => {
      const context: AnimationParserResult = {
        sequence: 'set:opacity:0:>',
        sequences: ['set:opacity:0:>'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.set).toHaveBeenCalledWith(undefined, { opacity: 0 }, '>');
    });

    it('should filter out null animations', () => {
      const context: AnimationParserResult = {
        sequence: 'to:x:100:>;timeline@repeat=2',
        sequences: ['to:x:100:>', 'timeline@repeat=2'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.to).toHaveBeenCalledTimes(1);
      expect(mockTimeline.to).toHaveBeenCalledWith(undefined, { x: 100 }, '>');
    });

    it('should handle empty sequences', () => {
      const context: AnimationParserResult = {
        sequence: '',
        sequences: [],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.to).not.toHaveBeenCalled();
      expect(mockTimeline.from).not.toHaveBeenCalled();
      expect(mockTimeline.set).not.toHaveBeenCalled();
    });

    it('should apply animation with negative value', () => {
      const context: AnimationParserResult = {
        sequence: 'to:x:-100:>',
        sequences: ['to:x:-100:>'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.to).toHaveBeenCalledWith(undefined, { x: -100 }, '>');
    });
  });
});
