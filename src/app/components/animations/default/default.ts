import { Component, input } from '@angular/core';
import { AnimateClickDirective } from 'ngx-gsap';
import { Animation } from '../../../models/animations.data';

@Component({
  selector: 'app-default',
  imports: [AnimateClickDirective],
  templateUrl: './default.html',
})
export class Default {
  public readonly animation = input.required<Animation>();

  public delayedRevert(animateRef: AnimateClickDirective) {
    setTimeout(() => !animateRef.isActive() && animateRef.revert(), 1000);
  }
}
