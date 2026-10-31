import { gsap } from 'gsap';
import { Timeline } from '../timeline';

const element = (): HTMLElement => document.body.appendChild(document.createElement('div'));

describe('Timeline', () => {
  describe('on()', () => {
    it('should call every listener of an event, not only the last one registered', () => {
      const timeline = new Timeline(element(), {}).to({ x: 10, duration: 1 });
      const first = jest.fn();
      const second = jest.fn();
      timeline.on('onComplete', first);
      timeline.on('onComplete', second);

      timeline.timeline.progress(1, false);

      expect(first).toHaveBeenCalledTimes(1);
      expect(second).toHaveBeenCalledTimes(1);
    });

    it('should stop calling a listener once it is removed', () => {
      const timeline = new Timeline(element(), {}).to({ x: 10, duration: 1 });
      const listener = jest.fn();
      const stop = timeline.on('onComplete', listener);

      stop();
      timeline.timeline.progress(1, false);

      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('with()', () => {
    it('should play when its trigger fires', () => {
      const el = element();
      const timeline = new Timeline(el, {}).with('click').to({ x: 100, duration: 10 });
      const play = jest.spyOn(timeline, 'play');
      timeline.connect();

      el.click();

      expect(play).toHaveBeenCalledTimes(1);
    });

    it('should ignore a trigger that fires while the animation runs', () => {
      const el = element();
      const timeline = new Timeline(el, {}).with('click').to({ x: 100, duration: 10 });
      const play = jest.spyOn(timeline, 'play');
      jest.spyOn(timeline, 'isActive').mockReturnValue(true);
      timeline.connect();

      el.click();

      expect(play).not.toHaveBeenCalled();
    });

    it('should play on hover and on the 1.x name for it', () => {
      const hover = element();
      const legacy = element();
      const byHover = new Timeline(hover, {}).with('hover').to({ x: 100, duration: 10 });
      const byLegacyName = new Timeline(legacy, {}).with('enter').to({ x: 100, duration: 10 });
      const playByHover = jest.spyOn(byHover, 'play');
      const playByLegacyName = jest.spyOn(byLegacyName, 'play');
      byHover.connect();
      byLegacyName.connect();

      hover.dispatchEvent(new MouseEvent('mouseenter'));
      legacy.dispatchEvent(new MouseEvent('mouseenter'));

      expect(playByHover).toHaveBeenCalledTimes(1);
      expect(playByLegacyName).toHaveBeenCalledTimes(1);
    });
  });

  describe('disconnect()', () => {
    it('should not throw when no trigger was ever attached', () => {
      expect(() => new Timeline(element(), {}).disconnect().connect()).not.toThrow();
    });
  });

  describe('under reduced motion', () => {
    const reduced = { reducedMotion: () => true };

    it('should rest at the end instead of playing, and still report completion', () => {
      const el = element();
      const timeline = new Timeline(el, {}, reduced).to({ x: 100, duration: 1 });
      const complete = jest.fn();
      timeline.on('onComplete', complete);

      timeline.play();

      expect(gsap.getProperty(el, 'x')).toBe(100);
      expect(timeline.isActive()).toBe(false);
      expect(complete).toHaveBeenCalledTimes(1);
    });

    it('should leave an animation that repeats forever at its natural state', () => {
      const el = element();
      const timeline = new Timeline(el, {}, reduced).to({ x: 100, duration: 1, repeat: -1 });

      timeline.play();

      expect(gsap.getProperty(el, 'x')).toBe(0);
      expect(timeline.isActive()).toBe(false);
    });

    it('should not hand the animation to the scroll, resting it at the end', () => {
      const el = element();
      const timeline = new Timeline(el, {}, reduced).to({ x: 100, duration: 1 });

      expect(timeline.scroll({})).toBeUndefined();
      expect(gsap.getProperty(el, 'x')).toBe(100);
    });

    it('should play normally when reduced motion is not asked for', () => {
      const el = element();
      const timeline = new Timeline(el, {}, { reducedMotion: () => false }).to({ x: 100, duration: 1 });

      timeline.play();

      expect(timeline.timeline.paused()).toBe(false);
      expect(timeline.timeline.progress()).toBe(0);
      expect(gsap.getProperty(el, 'x')).toBe(0);
    });
  });
});
