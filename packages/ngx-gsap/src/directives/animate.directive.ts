import { Directive, input } from '@angular/core';
import { AnimationParser } from '../models/animation-parsing/animation-parser';
import { GsapHostDirective } from './gsap-host.directive';

@Directive({ selector: '[animate]', exportAs: 'animate' })
export class AnimateDirective extends GsapHostDirective {
  public readonly sequence = input.required<string>({ alias: 'animate' });

  public registerAnimation() {
    const { animations, timelineVars, scrollVars } = new AnimationParser(this.sequence()).parse();
    this.timeline().configure(timelineVars);
    this.isScroll().true(() => this.timeline().scroll(scrollVars));
    animations.forEach((anim) => this.timeline()[anim.method](anim.selector, anim.vars, anim.position));
  }
}
