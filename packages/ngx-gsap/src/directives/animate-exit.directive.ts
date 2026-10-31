import { AnimationCallbackEvent, Directive, input } from '@angular/core';
import { TriggerType } from '../models/timeline';
import { AnimateSequence } from '../models/preset-resolution';
import { AnimateDirective } from './animate.directive';

/** Plays when Angular removes the element (`@if`, `@for`, a route) and keeps it in the DOM until the
 *  animation ends. */
@Directive({ selector: '[animateExit]', exportAs: 'animate', host: { '(animate.leave)': 'onLeave($event)' } })
export class AnimateExitDirective extends AnimateDirective {
  public override readonly sequence = input.required<AnimateSequence>({ alias: 'animateExit' });
  public override readonly trigger = input<TriggerType>('none' as const);

  private exiting?: Promise<void>;
  private pendingCleanup?: ReturnType<typeof setTimeout>;

  protected onLeave(event: AnimationCallbackEvent): void {
    clearTimeout(this.pendingCleanup);
    this.exiting = this.exit().then(() => event.animationComplete());
    this.exiting.then(() => super.cleanup());
  }

  /* Angular destroys the directive right before calling the leave hook (22) or right after (20.3),
     with the element still on screen either way. The revert waits a task so the hook can take over. */
  protected override cleanup(): void {
    if (this.exiting) return;
    this.pendingCleanup = setTimeout(() => super.cleanup());
  }

  private exit(): Promise<void> {
    const timeline = this.timeline();
    if (timeline.timeline.duration() === 0) return Promise.resolve();

    return new Promise((resolve) => {
      const stop = timeline.on('onComplete', () => {
        stop();
        resolve();
      });
      this.play();
    });
  }
}
