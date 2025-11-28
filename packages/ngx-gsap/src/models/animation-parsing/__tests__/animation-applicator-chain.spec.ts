import { Timeline } from '../../timeline';
import { AnimationApplicatorChain } from '../timeline-applicator';
import { TimelineMockBuilder } from './__helpers__';

describe('AnimationApplicatorChain', () => {
  let chain: AnimationApplicatorChain;
  let mockTimeline: jest.Mocked<Timeline>;

  beforeEach(() => {
    mockTimeline = TimelineMockBuilder.mock();
  });

  describe('apply()', () => {
    it('should apply simple to animation', () => {
      chain = new AnimationApplicatorChain(mockTimeline, 'to:x:100:>');

      chain.apply();

      expect(mockTimeline.to).toHaveBeenCalledWith({ x: 100 }, '>');
    });

    it('should apply multiple animations in sequence', () => {
      chain = new AnimationApplicatorChain(mockTimeline, 'to:x:100:>;from:opacity:0:>');

      chain.apply();

      expect(mockTimeline.to).toHaveBeenCalledWith({ x: 100 }, '>');
      expect(mockTimeline.from).toHaveBeenCalledWith({ opacity: 0 }, '>');
    });

    it('should apply timeline configuration', () => {
      chain = new AnimationApplicatorChain(mockTimeline, 'to:x:100:>;timeline@repeat=2,yoyo=true');

      chain.apply();

      expect(mockTimeline.configure).toHaveBeenCalledWith({
        repeat: 2,
        yoyo: true,
      });
      expect(mockTimeline.to).toHaveBeenCalledWith({ x: 100 }, '>');
    });

    it('should apply scroll trigger when timeline is scroll', () => {
      mockTimeline.isScroll = jest.fn().mockReturnValue({
        whenTrue: jest.fn((callback) => callback()),
      });

      chain = new AnimationApplicatorChain(mockTimeline, 'to:x:100:>;scroll@trigger=.container,start=top center');

      chain.apply();

      expect(mockTimeline.isScroll).toHaveBeenCalled();
      expect(mockTimeline.scroll).toHaveBeenCalledWith({
        trigger: '.container',
        start: 'top center',
      });
    });

    it('should expand presets before applying', () => {
      chain = new AnimationApplicatorChain(mockTimeline, 'fadeIn()');

      chain.apply();

      // fadeIn() expands to: x:0:0;y:0:0;opacity:0:<
      expect(mockTimeline.from).toHaveBeenCalledWith({ x: 0 }, '0');
      expect(mockTimeline.from).toHaveBeenCalledWith({ y: 0 }, '0');
      expect(mockTimeline.from).toHaveBeenCalledWith({ opacity: 0 }, '<');
    });

    it('should handle complex sequence with preset, timeline, and scroll', () => {
      mockTimeline.isScroll = jest.fn().mockReturnValue({
        whenTrue: jest.fn((callback) => callback()),
      });

      chain = new AnimationApplicatorChain(mockTimeline, 'fadeIn();timeline@repeat=2;scroll@trigger=.container');

      chain.apply();

      // fadeIn() expands to: x:0:0;y:0:0;opacity:0:<
      expect(mockTimeline.from).toHaveBeenCalledWith({ x: 0 }, '0');
      expect(mockTimeline.from).toHaveBeenCalledWith({ y: 0 }, '0');
      expect(mockTimeline.from).toHaveBeenCalledWith({ opacity: 0 }, '<');
      expect(mockTimeline.configure).toHaveBeenCalledWith({ repeat: 2 });
      expect(mockTimeline.scroll).toHaveBeenCalledWith({ trigger: '.container' });
    });

    it('should handle multiple animations with different methods', () => {
      chain = new AnimationApplicatorChain(mockTimeline, 'to:x:100:>;from:opacity:0:<;set:y:50:>');

      chain.apply();

      expect(mockTimeline.to).toHaveBeenCalledWith({ x: 100 }, '>');
      expect(mockTimeline.from).toHaveBeenCalledWith({ opacity: 0 }, '<');
      expect(mockTimeline.set).toHaveBeenCalledWith({ y: 50 }, '>');
    });

    it('should apply animations with positions', () => {
      chain = new AnimationApplicatorChain(mockTimeline, 'to:x:100:<;to:y:200:>');

      chain.apply();

      expect(mockTimeline.to).toHaveBeenCalledWith({ x: 100 }, '<');
      expect(mockTimeline.to).toHaveBeenCalledWith({ y: 200 }, '>');
    });

    it('should apply animations with string values', () => {
      chain = new AnimationApplicatorChain(mockTimeline, 'to:x:100%:>');

      chain.apply();

      expect(mockTimeline.to).toHaveBeenCalledWith({ x: '100%' }, '>');
    });

    it('should apply set animations', () => {
      chain = new AnimationApplicatorChain(mockTimeline, 'set:x:100:>');

      chain.apply();

      expect(mockTimeline.set).toHaveBeenCalledWith({ x: 100 }, '>');
    });
  });
});
