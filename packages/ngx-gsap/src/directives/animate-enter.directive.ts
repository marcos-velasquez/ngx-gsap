import { Directive, input } from '@angular/core';
import { TriggerType } from '../models/timeline';
import { AnimateSequence } from '../models/preset-resolution';
import { AnimateDirective } from './animate.directive';
import { warnDeprecated } from './deprecation';

/** @deprecated Use `animateHover`. It fires on `mouseenter`, not when the element enters the DOM. */
@Directive({ selector: '[animateEnter]', exportAs: 'animate' })
export class AnimateEnterDirective extends AnimateDirective {
  public override readonly sequence = input.required<AnimateSequence>({ alias: 'animateEnter' });
  public override readonly trigger = input<TriggerType>('hover' as const);

  constructor() {
    super();
    warnDeprecated('animateEnter', 'animateHover');
  }
}
