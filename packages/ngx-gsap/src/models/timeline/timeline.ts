import { gsap } from 'gsap';
import { TypeChecker } from '../../utils';
import { Trigger, TriggerRef, TriggerType } from '../trigger';

export class Timeline {
  private readonly gsapTimeline: gsap.core.Timeline;
  private triggerRef!: TriggerRef;

  constructor(private readonly element: HTMLElement, defaults: gsap.TweenVars) {
    this.gsapTimeline = gsap.timeline({ paused: true, defaults });
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

  public configure(vars: gsap.TimelineVars): Timeline {
    Object.entries(vars)
      .filter(([key]) => new TypeChecker(this.gsapTimeline[key]).function())
      .forEach(([key, value]) => this.gsapTimeline[key](value));
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

  private getTarget(selector?: string): gsap.TweenTarget {
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
}
