import { Directive, input } from '@angular/core';
import { TriggerType } from '../models/timeline';
import { AnimateSequence } from '../models/preset-resolution';
import { AnimateDirective } from './animate.directive';

@Directive({ selector: '[animateHover]', exportAs: 'animate' })
export class AnimateHoverDirective extends AnimateDirective {
  public override readonly sequence = input.required<AnimateSequence>({ alias: 'animateHover' });
  public override readonly trigger = input<TriggerType>('hover' as const);
}
