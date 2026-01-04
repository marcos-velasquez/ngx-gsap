import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateLoadDirective } from 'ngx-gsap';
import { AnimationList } from './models/animations';
import { Animations, Docs, Roadmap } from './components';

type Tab = 'animations' | 'docs' | 'roadmap';

@Component({
  imports: [CommonModule, Animations, Docs, Roadmap, AnimateLoadDirective],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  public readonly animationsLength = new AnimationList().length;
  public readonly activeTab = signal<Tab>('animations');

  public setTab(tab: Tab): void {
    this.activeTab.set(tab);
  }
}
