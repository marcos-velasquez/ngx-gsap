import { Directive, input } from '@angular/core';
import { TriggerType } from '../models/timeline';
import { AnimateSequence } from '../models/preset-resolution';
import { AnimateDirective } from './animate.directive';

@Directive({ selector: '[animateScroll]', exportAs: 'animateScroll' })
export class AnimateScrollDirective extends AnimateDirective {
  public override readonly sequence = input.required<AnimateSequence>({ alias: 'animateScroll' });
  public override readonly trigger = input<TriggerType>('scroll' as const);
}
