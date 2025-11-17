import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationList } from './models/animations';
import { Animations, Docs, Roadmap } from './components';

@Component({
  imports: [CommonModule, Animations, Docs, Roadmap],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  public readonly animationsLength = new AnimationList().length;
  public readonly activeTab = signal<'animations' | 'docs' | 'roadmap'>('animations');

  public setTab(tab: 'animations' | 'docs' | 'roadmap') {
    this.activeTab.set(tab);
  }
}
