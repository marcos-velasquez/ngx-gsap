import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimateClickDirective, AnimateLoadDirective } from 'ngx-gsap';
import { Animation, AnimationList } from '../../models/animations';

@Component({
  selector: 'app-animations',
  imports: [CommonModule, FormsModule, AnimateClickDirective, AnimateLoadDirective],
  templateUrl: './animations.html',
})
export class Animations {
  public readonly animationList = new AnimationList();
  public readonly searchQuery = signal('');
  public readonly selectedCategory = signal<'all' | Animation['category']>('all');

  public readonly animations = computed(() => this.animationList.filter(this.selectedCategory(), this.searchQuery()));
  public readonly categoryCounts = computed(() => this.animationList.categoryCounts);

  public setCategory(category: 'all' | Animation['category']) {
    this.selectedCategory.set(category);
  }

  public delayedRevert(animateRef: AnimateClickDirective) {
    setTimeout(() => !animateRef.isActive() && animateRef.revert(), 1000);
  }
}
