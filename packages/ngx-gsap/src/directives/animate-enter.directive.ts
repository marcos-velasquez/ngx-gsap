import { Directive, input } from '@angular/core';
import { TriggerType } from '../models/timeline';
import { AnimateDirective } from './animate.directive';

@Directive({ selector: '[animateEnter]', exportAs: 'animate' })
export class AnimateEnterDirective extends AnimateDirective {
  public override readonly sequence = input.required<string>({ alias: 'animateEnter' });
  public override readonly trigger = input<TriggerType>('enter' as const);
}
