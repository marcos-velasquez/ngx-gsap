import * as ng from '@angular/core';
import { gsap } from 'gsap';
import { Timeline, TimelineFactory, TriggerType, Trigger } from '../models/timeline';
import { AnimationApplicatorChain } from '../models/animation-parsing';
import { AnimateSequence, Sequence } from '../models/preset-resolution';
import { NGX_GSAP_CONFIG, ReducedMotion } from '../config';

@ng.Directive({ selector: '[animate]', exportAs: 'animate' })
export class AnimateDirective implements ng.OnInit, ng.OnDestroy {
  public readonly sequence = ng.input.required<AnimateSequence>({ alias: 'animate' });
  public readonly trigger = ng.input<TriggerType>('none');

  public readonly animateStart = ng.output<AnimateDirective>();
  public readonly animateComplete = ng.output<AnimateDirective>();
  public readonly animateUpdate = ng.output<AnimateDirective>();
  public readonly animateRepeat = ng.output<AnimateDirective>();
  public readonly animateReverseComplete = ng.output<AnimateDirective>();

  public readonly injector = ng.inject(ng.Injector);
  public readonly elementRef = ng.inject<ng.ElementRef<HTMLElement>>(ng.ElementRef);
  private readonly ngZone = ng.inject(ng.NgZone);
  private readonly config = ng.inject(NGX_GSAP_CONFIG);

  public readonly timeline = ng.signal<Timeline>(TimelineFactory.empty());

  public readonly isScroll = ng.computed(() => Trigger.isScroll(this.trigger()));

  private context?: gsap.Context;
  protected destroyed = false;

  ngOnInit(): void {
    ng.afterNextRender(() => this.setup(), { injector: this.injector });
  }

  /* Outside the zone: GSAP's ticker fires every frame, and inside it each frame would run change
     detection and the app would never report itself stable. */
  private setup(): void {
    this.outside(() => {
      this.context = gsap.context(() => {
        const options = { reducedMotion: () => ReducedMotion.isPreferred(this.config) };
        this.timeline.set(new TimelineFactory(this.element, this.trigger(), options).create());
      }, this.element);
      this.listen();
      this.applyAnimation().then(() => {
        if (!this.destroyed) this.timeline().connect();
      });
    });
  }

  /* `animateUpdate` fires every frame, so it stays outside the zone; a template listener still marks
     its own view for check. */
  private listen(): void {
    const timeline = this.timeline();
    timeline.on('onStart', () => this.inside(() => this.animateStart.emit(this)));
    timeline.on('onComplete', () => this.inside(() => this.animateComplete.emit(this)));
    timeline.on('onRepeat', () => this.inside(() => this.animateRepeat.emit(this)));
    timeline.on('onReverseComplete', () => this.inside(() => this.animateReverseComplete.emit(this)));
    timeline.on('onUpdate', () => this.animateUpdate.emit(this));
  }

  public applyAnimation(): Promise<void> {
    return this.outside(() => {
      const chain = new AnimationApplicatorChain(this.timeline(), Sequence.toText(this.sequence()));
      const apply = (): void => {
        if (!this.destroyed) this.withinContext(() => chain.apply());
      };
      const loading = chain.pluginsToLoad();
      if (!loading) {
        apply();
        return Promise.resolve();
      }
      return loading.then(apply);
    });
  }

  public get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  public isActive(): boolean {
    return this.timeline().isActive();
  }

  public play(): AnimateDirective {
    this.outside(() => this.timeline().play());
    return this;
  }

  public pause(): AnimateDirective {
    this.outside(() => this.timeline().pause());
    return this;
  }

  public reverse(): AnimateDirective {
    this.outside(() => this.timeline().reverse());
    return this;
  }

  public resume(): AnimateDirective {
    this.outside(() => this.timeline().resume());
    return this;
  }

  public restart(): AnimateDirective {
    this.outside(() => this.timeline().restart());
    return this;
  }

  public seek(time: number): AnimateDirective {
    this.outside(() => this.timeline().seek(time));
    return this;
  }

  public revert(): AnimateDirective {
    this.outside(() => this.timeline().revert());
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
    this.destroyed = true;
    this.timeline().disconnect();
    this.cleanup();
  }

  protected cleanup(): void {
    this.context?.revert();
  }

  protected outside<T>(fn: () => T): T {
    return this.ngZone.runOutsideAngular(fn);
  }

  private inside(fn: () => void): void {
    this.ngZone.run(fn);
  }

  private withinContext(fn: () => void): void {
    if (this.context) this.context.add(fn);
    else fn();
  }
}
