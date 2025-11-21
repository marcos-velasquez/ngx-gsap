import { Timeline } from '../../../timeline';
import { AnimationParserResult } from '../../animation-parser';
import { SplitTextApplicator } from '../split-text-applicator';
import { TimelineMockBuilder } from '../../__tests__/__helpers__';

describe('SplitTextApplicator', () => {
  let applicator: SplitTextApplicator;
  let mockTimeline: jest.Mocked<Timeline>;

  beforeEach(() => {
    applicator = new SplitTextApplicator();
    mockTimeline = TimelineMockBuilder.mock();
  });

  describe('apply()', () => {
    it('should apply splitText vars when present', () => {
      const context: AnimationParserResult = {
        sequence: 'to:.box:x:100;splitText@type="chars",charsClass="char"',
        sequences: ['to:.box:x:100', 'splitText@type="chars",charsClass="char"'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.splitText).toHaveBeenCalledWith({
        type: 'chars',
        charsClass: 'char',
      });
    });

    it('should not call splitText when no vars present', () => {
      const context: AnimationParserResult = {
        sequence: 'to:.box:x:100',
        sequences: ['to:.box:x:100'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.splitText).not.toHaveBeenCalled();
    });

    it('should handle empty splitText vars', () => {
      const context: AnimationParserResult = {
        sequence: 'to:.box:x:100;splitText@',
        sequences: ['to:.box:x:100', 'splitText@'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.splitText).not.toHaveBeenCalled();
    });

    it('should apply multiple splitText vars', () => {
      const context: AnimationParserResult = {
        sequence: 'splitText@type="chars,words,lines",charsClass="char",wordsClass="word",linesClass="line"',
        sequences: ['splitText@type="chars,words,lines",charsClass="char",wordsClass="word",linesClass="line"'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.splitText).toHaveBeenCalledWith({
        type: 'chars,words,lines',
        charsClass: 'char',
        wordsClass: 'word',
        linesClass: 'line',
      });
    });

    it('should work with presets', () => {
      const context: AnimationParserResult = {
        sequence: 'fadeIn();splitText@type="words"',
        sequences: ['fadeIn()', 'splitText@type="words"'],
      };

      applicator.apply(mockTimeline, context);

      expect(mockTimeline.splitText).toHaveBeenCalledWith({
        type: 'words',
      });
    });
  });
});
