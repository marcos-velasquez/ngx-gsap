import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Condition, PropertyInvoker } from '../../utils';
import { Trigger, TriggerRef, TriggerType } from '../trigger';

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

  public from(selector: string | undefined, vars: gsap.TweenVars, position?: gsap.Position): Timeline {
    this.gsapTimeline.from(this.getTarget(selector), vars, position);
    return this;
  }

  public to(selector: string | undefined, vars: gsap.TweenVars, position?: gsap.Position): Timeline {
    this.gsapTimeline.to(this.getTarget(selector), vars, position);
    return this;
  }

  public set(selector: string | undefined, vars: gsap.TweenVars): Timeline {
    this.gsapTimeline.set(this.getTarget(selector), vars);
    return this;
  }

  public scroll(vars: ScrollTrigger.StaticVars = {}): ScrollTrigger {
    return ScrollTrigger.create({ trigger: this.element, animation: this.gsapTimeline, ...vars });
  }

  public splitText(vars: SplitText.Vars = { type: 'chars,words,lines', autoSplit: true }): SplitText {
    return SplitText.create(this.element, { ...vars });
  }

  private getTarget(selector?: string): gsap.DOMTarget {
    return selector ? this.element.querySelectorAll(selector) : this.element;
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
