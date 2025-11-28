import { Directive, input } from '@angular/core';
import { TriggerType } from '../models/timeline';
import { AnimateDirective } from './animate.directive';

@Directive({ selector: '[animateLeave]', exportAs: 'animate' })
export class AnimateLeaveDirective extends AnimateDirective {
  public override readonly sequence = input.required<string>({ alias: 'animateLeave' });
  public override readonly trigger = input<TriggerType>('leave' as const);
}
