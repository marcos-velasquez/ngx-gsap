import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateScrollDirective } from 'ngx-gsap';

@Component({
  selector: 'app-roadmap',
  imports: [CommonModule, AnimateScrollDirective],
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
          name: 'MorphSVG',
          description: 'Smooth transformation between SVG shapes',
          icon: '🔄',
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
      title: 'Animation Presets',
      status: 'Coming Soon',
      description: 'Collection of ready-to-use predefined animations',
      items: [
        {
          name: 'Entrance Animations',
          description: 'Fade in, slide in, zoom in, bounce in, etc.',
          icon: '🎭',
        },
        {
          name: 'Exit Animations',
          description: 'Fade out, slide out, zoom out, etc.',
          icon: '🚪',
        },
        {
          name: 'Attention Seekers',
          description: 'Shake, pulse, wobble, bounce, etc.',
          icon: '👀',
        },
        {
          name: 'Loading Animations',
          description: 'Spinners, progress bars, skeleton screens',
          icon: '⏳',
        },
        {
          name: 'Page Transitions',
          description: 'Smooth transitions between routes',
          icon: '🔄',
        },
      ],
    },
  ];
}
