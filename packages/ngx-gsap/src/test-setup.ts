import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { GsapPlugins } from './models/plugins';

GsapPlugins.register({ scrollTrigger: ScrollTrigger, splitText: SplitText, morphSVG: MorphSVGPlugin });
