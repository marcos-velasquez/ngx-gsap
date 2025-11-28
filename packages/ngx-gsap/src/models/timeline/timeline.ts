import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Condition, PropertyInvoker, $ } from '../../utils';
import { Trigger, TriggerRef, TriggerType } from './trigger';
import { SplitTextTimeline, SplitText, SplitTextVars } from './split-text';

export class Timeline {
  private readonly gsapTimeline: gsap.core.Timeline;
  private triggerRef!: TriggerRef;

  constructor(private readonly element: HTMLElement, defaults: gsap.TweenVars) {
    this.gsapTimeline = gsap.timeline({ paused: true, defaults });
    this.gsapTimeline.eventCallback('onStart', () => this.disconnect() as unknown as void);
    this.gsapTimeline.eventCallback('onComplete', () => this.connect() as unknown as void);
  }

  public get timeline(): gsap.core.Timeline {
    return this.gsapTimeline;
  }

  public isActive(): boolean {
    return this.gsapTimeline.isActive();
  }

  public with(triggerType: TriggerType): Timeline {
    this.triggerRef = new Trigger(this.element).when(triggerType).then(() => this.play());
    return this;
  }

  public isScroll(): Condition {
    return this.triggerRef.trigger.isScroll();
  }

  public configure(vars: gsap.TimelineVars): Timeline {
    new PropertyInvoker(this.gsapTimeline).invoke(vars);
    return this;
  }

  public from(vars: gsap.TweenVars, position?: gsap.Position): Timeline {
    this.gsapTimeline.from(this.getTarget(vars['selector']), { ...vars, data: { method: 'from', position } }, position);
    return this;
  }

  public to(vars: gsap.TweenVars, position?: gsap.Position): Timeline {
    this.gsapTimeline.to(this.getTarget(vars['selector']), { ...vars, data: { method: 'to', position } }, position);
    return this;
  }

  public set(vars: gsap.TweenVars): Timeline {
    this.gsapTimeline.set(this.getTarget(vars['selector']), { ...vars, data: { method: 'set' } });
    return this;
  }

  public scroll(vars: ScrollTrigger.StaticVars = {}): ScrollTrigger {
    return ScrollTrigger.create({ trigger: this.element, animation: this.gsapTimeline, ...vars });
  }

  public splitText(vars: SplitTextVars = {}): SplitText {
    return new SplitTextTimeline(this.element, this.timeline).create(vars);
  }

  public target(vars: gsap.TweenVars): Timeline {
    gsap.set(this.getTarget(vars['selector']), vars);
    return this;
  }

  private getTarget(selector?: string): gsap.DOMTarget {
    return $(this.element).queryAll(selector);
  }

  public play(): Timeline {
    this.gsapTimeline.play(0);
    return this;
  }

  public pause(): Timeline {
    this.gsapTimeline.pause();
    return this;
  }

  public reverse(): Timeline {
    this.gsapTimeline.reverse();
    return this;
  }

  public resume(): Timeline {
    this.gsapTimeline.resume();
    return this;
  }

  public restart(): Timeline {
    this.gsapTimeline.restart();
    return this;
  }

  public seek(time: number): Timeline {
    this.gsapTimeline.seek(time);
    return this;
  }

  public revert(): Timeline {
    this.gsapTimeline.revert({ delay: 1 });
    return this;
  }

  public clear(): Timeline {
    this.gsapTimeline.clear();
    return this;
  }

  public disconnect(): Timeline {
    this.triggerRef.disconnect();
    return this;
  }

  public connect(): Timeline {
    this.triggerRef.connect();
    return this;
  }

  public invalidate(): Timeline {
    this.gsapTimeline.invalidate();
    return this;
  }

  public kill(): Timeline {
    this.gsapTimeline.kill();
    return this;
  }
}
