import { Directive, input } from '@angular/core';
import { TriggerType } from '../models/timeline';
import { AnimateSequence } from '../models/preset-resolution';
import { AnimateDirective } from './animate.directive';

@Directive({ selector: '[animateClick]', exportAs: 'animate' })
export class AnimateClickDirective extends AnimateDirective {
  public override readonly sequence = input.required<AnimateSequence>({ alias: 'animateClick' });
  public override readonly trigger = input<TriggerType>('click' as const);
}
