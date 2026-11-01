import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateLoadDirective, AnimateScrollDirective } from 'ngx-gsap';

@Component({
  selector: 'app-roadmap',
  imports: [CommonModule, AnimateScrollDirective, AnimateLoadDirective],
  templateUrl: './roadmap.html',
})
export class Roadmap {
  upcomingFeatures = [
    {
      title: 'GSAP Plugins',
      status: 'Coming Soon',
      description: 'Integration of official GSAP plugins for advanced animations',
      items: [
        {
          name: 'TextPlugin',
          description: 'Character-by-character text animation',
          icon: '📝',
        },
        {
          name: 'Draggable',
          description: 'Draggable elements with physics and configurable bounds',
          icon: '🖱️',
        },
        {
          name: 'MotionPath',
          description: 'Animations along custom SVG paths',
          icon: '🛤️',
        },
        {
          name: 'ScrollSmoother',
          description: 'Smooth and fluid scroll with parallax effects',
          icon: '✨',
        },
        {
          name: 'Flip',
          description: 'Smooth transitions between element states',
          icon: '🔀',
        },
      ],
    },
    {
      title: 'More Presets',
      status: 'Coming Soon',
      description: 'New ready-to-use animations on top of the entrance, exit, attention and text presets',
      items: [
        {
          name: 'Loading Animations',
          description: 'Spinners, progress bars, skeleton screens',
          icon: '⏳',
        },
        {
          name: 'Page Transitions',
          description: 'Route transitions built on animateExit',
          icon: '🔄',
        },
      ],
    },
  ];
}
