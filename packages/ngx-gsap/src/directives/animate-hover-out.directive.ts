import { Directive, input } from '@angular/core';
import { TriggerType } from '../models/timeline';
import { AnimateSequence } from '../models/preset-resolution';
import { AnimateDirective } from './animate.directive';

@Directive({ selector: '[animateHoverOut]', exportAs: 'animate' })
export class AnimateHoverOutDirective extends AnimateDirective {
  public override readonly sequence = input.required<AnimateSequence>({ alias: 'animateHoverOut' });
  public override readonly trigger = input<TriggerType>('hoverOut' as const);
}
