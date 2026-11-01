import { gsap } from 'gsap';
import type { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Condition, PropertyInvoker, $ } from '../../utils';
import { GsapPlugins } from '../plugins';
import { Trigger, TriggerRef, TriggerType } from './trigger';
import { SplitTextTimeline, SplitText, SplitTextVars } from './split-text';
import { MorphSVGTimeline, MorphSVGVars } from './morph-svg';

export type TimelineEvent = 'onStart' | 'onComplete' | 'onUpdate' | 'onRepeat' | 'onReverseComplete';

export type TimelineOptions = { reducedMotion?: () => boolean };

/* GSAP's own `_bigNum`: the total duration it reports for a timeline that repeats forever. */
const INFINITE_DURATION = 1e8;

export class Timeline {
  private readonly gsapTimeline: gsap.core.Timeline;
  private readonly listeners = new Map<TimelineEvent, Set<VoidFunction>>();
  private triggerRef?: TriggerRef;

  constructor(
    private readonly element: HTMLElement,
    defaults: gsap.TweenVars,
    private readonly options: TimelineOptions = {}
  ) {
    this.gsapTimeline = gsap.timeline({ paused: true, defaults });
  }

  public get timeline(): gsap.core.Timeline {
    return this.gsapTimeline;
  }

  public isActive(): boolean {
    return this.gsapTimeline.isActive();
  }

  /* GSAP keeps one callback per event: a second `eventCallback` would replace the first. */
  public on(event: TimelineEvent, listener: VoidFunction): VoidFunction {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
      this.gsapTimeline.eventCallback(event, () => this.listeners.get(event)?.forEach((fn) => fn()));
    }
    this.listeners.get(event)?.add(listener);
    return () => this.listeners.get(event)?.delete(listener);
  }

  public with(triggerType: TriggerType): Timeline {
    this.triggerRef = new Trigger(this.element).when(triggerType).then(() => {
      if (!this.isActive()) this.play();
    });
    return this;
  }

  public isScroll(): Condition {
    return this.triggerRef?.trigger.isScroll() ?? new Condition(() => false);
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

  public scroll(vars: ScrollTrigger.StaticVars = {}): ScrollTrigger | undefined {
    if (this.isReducedMotion()) {
      this.settle();
      return undefined;
    }
    return GsapPlugins.ScrollTrigger.create({ trigger: this.element, animation: this.gsapTimeline, ...vars });
  }

  public splitText(vars: SplitTextVars): SplitText {
    return new SplitTextTimeline(this.element, this.timeline).create(vars);
  }

  public morphSVG(vars: MorphSVGVars): void {
    new MorphSVGTimeline(this.element, this.timeline).create(vars);
  }

  public target(vars: gsap.TweenVars): Timeline {
    gsap.set(this.getTarget(vars['selector']), vars);
    return this;
  }

  private getTarget(selector?: string): gsap.DOMTarget {
    return $(this.element).queryAll(selector);
  }

  public play(): Timeline {
    if (this.isReducedMotion()) return this.settle();
    this.gsapTimeline.play(0);
    return this;
  }

  /* Callbacks fire, so a listener waiting for completion still hears it. An animation that repeats
     forever has no end to rest at, so it stays at its natural state. */
  public settle(): Timeline {
    if (this.gsapTimeline.totalDuration() >= INFINITE_DURATION) {
      this.gsapTimeline.pause(0);
    } else {
      this.gsapTimeline.totalProgress(1, false).pause();
    }
    return this;
  }

  public isReducedMotion(): boolean {
    return this.options.reducedMotion?.() ?? false;
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
    this.triggerRef?.disconnect();
    return this;
  }

  public connect(): Timeline {
    this.triggerRef?.connect();
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
