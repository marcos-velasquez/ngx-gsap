import { Timeline } from '../../../timeline';
import { AnimationParserResult } from '../../animation-parser';
import { MorphSVGApplicator } from '../morph-svg-applicator';
import { TimelineMockBuilder } from '../../__tests__/__helpers__';

describe('MorphSVGApplicator', () => {
  let applicator: MorphSVGApplicator;
  let mockTimeline: jest.Mocked<Timeline>;

  beforeEach(() => {
    applicator = new MorphSVGApplicator();
    mockTimeline = TimelineMockBuilder.mock();
  });

  describe('apply()', () => {
    it('should apply morphSVG vars when present', () => {
      const context: AnimationParserResult = {
        sequence: 'to:.box:x:100;morphSVG@shape="#star",type="linear"',
        sequences: ['to:.box:x:100', 'morphSVG@shape="#star",type="linear"'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.morphSVG).toHaveBeenCalledWith({
        shape: '#star',
        type: 'linear',
      });
    });

    it('should not call morphSVG when no vars present', () => {
      const context: AnimationParserResult = {
        sequence: 'to:.box:x:100',
        sequences: ['to:.box:x:100'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.morphSVG).not.toHaveBeenCalled();
    });

    it('should handle empty morphSVG vars', () => {
      const context: AnimationParserResult = {
        sequence: 'to:.box:x:100;morphSVG@',
        sequences: ['to:.box:x:100', 'morphSVG@'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.morphSVG).not.toHaveBeenCalled();
    });

    it('should apply multiple morphSVG vars', () => {
      const context: AnimationParserResult = {
        sequence: 'morphSVG@shape="#lightning",type="rotational",origin="50% 50%",shapeIndex=0',
        sequences: ['morphSVG@shape="#lightning",type="rotational",origin="50% 50%",shapeIndex=0'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.morphSVG).toHaveBeenCalledWith({
        shape: '#lightning',
        type: 'rotational',
        origin: '50% 50%',
        shapeIndex: 0,
      });
    });

    it('should work with presets', () => {
      const context: AnimationParserResult = {
        sequence: 'fadeIn();morphSVG@shape="#star"',
        sequences: ['fadeIn()', 'morphSVG@shape="#star"'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.morphSVG).toHaveBeenCalledWith({
        shape: '#star',
      });
    });

    it('should handle rotational type', () => {
      const context: AnimationParserResult = {
        sequence: 'morphSVG@shape="#circle",type="rotational"',
        sequences: ['morphSVG@shape="#circle",type="rotational"'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.morphSVG).toHaveBeenCalledWith({
        shape: '#circle',
        type: 'rotational',
      });
    });
  });
});
