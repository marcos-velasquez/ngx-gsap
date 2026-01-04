import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PresetMatcher } from '../preset-matcher';
import { PresetVarsExtractor } from '../__shared__';

export class ScrollVarsExtractor extends PresetVarsExtractor<ScrollTrigger.StaticVars> {
  constructor(presetMatcher: PresetMatcher) {
    super(presetMatcher, 'scroll');
  }
}
