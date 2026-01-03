import { Component, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AnimateClickDirective } from 'ngx-gsap';
import { Animation } from '../../../models/animations.data';

@Component({
  selector: 'app-morph',
  imports: [],
  templateUrl: './morph.html',
})
export class Morph {
  public readonly animation = input.required<Animation>();

  private readonly sanitizer = inject(DomSanitizer);

  public getSafeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  public delayedRevert(animateRef: AnimateClickDirective) {
    setTimeout(() => !animateRef.isActive() && animateRef.revert(), 1000);
  }
}
