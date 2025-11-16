import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PresetMatcher } from './preset-matcher';
import { PresetVarsExtractor } from './preset-vars-extractor';

export class ScrollVarsExtractor extends PresetVarsExtractor<ScrollTrigger.StaticVars> {
  constructor(presetMatcher: PresetMatcher) {
    super(presetMatcher, 'scrollTrigger');
  }
}
