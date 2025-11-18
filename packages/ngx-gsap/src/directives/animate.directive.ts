import * as ng from '@angular/core';
import { Timeline, TimelineFactory } from '../models/timeline';
import { Trigger, TriggerType } from '../models/trigger';
import { AnimationParser, pluginRegister } from '../models/animation-parsing';

@ng.Directive({ selector: '[animate]', exportAs: 'animate' })
export abstract class AnimateDirective implements ng.OnInit, ng.OnDestroy {
  public readonly sequence = ng.input.required<string>({ alias: 'animate' });
  public readonly trigger = ng.input<TriggerType>('none');

  public readonly animateStart = ng.output<AnimateDirective>();
  public readonly animateComplete = ng.output<AnimateDirective>();
  public readonly animateUpdate = ng.output<AnimateDirective>();
  public readonly animateRepeat = ng.output<AnimateDirective>();
  public readonly animateReverseComplete = ng.output<AnimateDirective>();

  public readonly injector = ng.inject(ng.Injector);

  public readonly timeline = ng.signal<Timeline>(TimelineFactory.empty());

  public readonly isScroll = ng.computed(() => Trigger.isScroll(this.trigger()));

  constructor(public readonly elementRef: ng.ElementRef<HTMLElement>) {
    pluginRegister.register();
    ng.effect(() => {
      this.timeline().timeline.eventCallback('onStart', () => this.animateStart.emit(this));
      this.timeline().timeline.eventCallback('onComplete', () => this.animateComplete.emit(this));
      this.timeline().timeline.eventCallback('onUpdate', () => this.animateUpdate.emit(this));
      this.timeline().timeline.eventCallback('onRepeat', () => this.animateRepeat.emit(this));
      this.timeline().timeline.eventCallback('onReverseComplete', () => this.animateReverseComplete.emit(this));
    });
  }

  ngOnInit(): void {
    ng.afterNextRender(
      () => {
        this.timeline.set(new TimelineFactory(this).create());
        this.registerAnimation();
      },
      { injector: this.injector }
    );
  }

  public registerAnimation() {
    const { animations, timelineVars, scrollVars } = new AnimationParser(this.sequence()).parse();
    this.timeline().configure(timelineVars);
    this.isScroll().whenTrue(() => this.timeline().scroll(scrollVars));
    animations.forEach((anim) => this.timeline()[anim.method](anim.selector, anim.vars, anim.position));
  }

  public get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  public isActive(): boolean {
    return this.timeline().isActive();
  }

  public play(): AnimateDirective {
    this.timeline().play();
    return this;
  }

  public pause(): AnimateDirective {
    this.timeline().pause();
    return this;
  }

  public reverse(): AnimateDirective {
    this.timeline().reverse();
    return this;
  }

  public resume(): AnimateDirective {
    this.timeline().resume();
    return this;
  }

  public restart(): AnimateDirective {
    this.timeline().restart();
    return this;
  }

  public seek(time: number): AnimateDirective {
    this.timeline().seek(time);
    return this;
  }

  public revert(): AnimateDirective {
    this.timeline().revert();
    return this;
  }

  public clear(): AnimateDirective {
    this.timeline().clear();
    return this;
  }

  public invalidate(): AnimateDirective {
    this.timeline().invalidate();
    return this;
  }

  public kill(): AnimateDirective {
    this.timeline().kill();
    return this;
  }

  ngOnDestroy(): void {
    this.timeline().disconnect().kill();
  }
}
