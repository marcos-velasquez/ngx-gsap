import { Directive, input } from '@angular/core';
import { TriggerType } from '../models/timeline';
import { AnimateDirective } from './animate.directive';

@Directive({ selector: '[animateLoad]', exportAs: 'animate' })
export class AnimateLoadDirective extends AnimateDirective {
  public override readonly sequence = input.required<string>({ alias: 'animateLoad' });
  public override readonly trigger = input<TriggerType>('load' as const);
}
