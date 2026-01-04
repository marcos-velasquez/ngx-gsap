import { gsap } from 'gsap';
import { PresetMatcher } from '../preset-matcher';
import { PresetVarsExtractor } from '../__shared__';

export class ElementVarsExtractor extends PresetVarsExtractor<gsap.TweenVars> {
  constructor(presetMatcher: PresetMatcher) {
    super(presetMatcher, 'element');
  }
}
