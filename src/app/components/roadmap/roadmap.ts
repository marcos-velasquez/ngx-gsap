import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roadmap',
  imports: [CommonModule],
  templateUrl: './roadmap.html',
})
export class Roadmap {
  upcomingFeatures = [
    {
      title: 'GSAP Plugins',
      status: 'Próximamente',
      description: 'Integración de plugins oficiales de GSAP para animaciones avanzadas',
      items: [
        {
          name: 'ScrollTrigger',
          description: 'Animaciones basadas en scroll con puntos de activación personalizables',
          icon: '📜',
        },
        {
          name: 'Draggable',
          description: 'Elementos arrastrables con física y límites configurables',
          icon: '🖱️',
        },
        {
          name: 'MotionPath',
          description: 'Animaciones a lo largo de trazados SVG personalizados',
          icon: '🛤️',
        },
        {
          name: 'MorphSVG',
          description: 'Transformación fluida entre formas SVG',
          icon: '🔄',
        },
        {
          name: 'ScrollSmoother',
          description: 'Scroll suave y fluido con efectos parallax',
          icon: '✨',
        },
        {
          name: 'Flip',
          description: 'Transiciones fluidas entre estados de elementos',
          icon: '🔀',
        },
        {
          name: 'TextPlugin',
          description: 'Animación de texto carácter por carácter',
          icon: '📝',
        },
      ],
    },
    {
      title: 'Presets de Animaciones',
      status: 'Próximamente',
      description: 'Colección de animaciones predefinidas listas para usar',
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
          description: 'Transiciones fluidas entre rutas',
          icon: '🔄',
        },
      ],
    },
  ];
}
