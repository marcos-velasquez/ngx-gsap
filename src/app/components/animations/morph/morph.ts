import { Component, input } from '@angular/core';
import { AnimateClickDirective } from 'ngx-gsap';
import { Animation } from '../../../models/animations.data';

@Component({
  selector: 'app-morph',
  imports: [AnimateClickDirective],
  templateUrl: './morph.html',
})
export class Morph {
  public readonly animation = input.required<Animation>();

  public delayedRevert(animateRef: AnimateClickDirective) {
    setTimeout(() => !animateRef.isActive() && animateRef.revert(), 1000);
  }
}
