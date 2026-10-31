import { Directive, input } from '@angular/core';
import { TriggerType } from '../models/timeline';
import { AnimateSequence } from '../models/preset-resolution';
import { AnimateDirective } from './animate.directive';
import { warnDeprecated } from './deprecation';

/** @deprecated Use `animateHoverOut`. It fires on `mouseleave`, not when the element leaves the DOM; for that, use `animateExit`. */
@Directive({ selector: '[animateLeave]', exportAs: 'animate' })
export class AnimateLeaveDirective extends AnimateDirective {
  public override readonly sequence = input.required<AnimateSequence>({ alias: 'animateLeave' });
  public override readonly trigger = input<TriggerType>('hoverOut' as const);

  constructor() {
    super();
    warnDeprecated('animateLeave', 'animateHoverOut');
  }
}
