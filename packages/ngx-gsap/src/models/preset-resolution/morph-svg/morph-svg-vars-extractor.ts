import { PresetMatcher } from '../preset-matcher';
import { PresetVarsExtractor } from '../__shared__';
import { MorphSVGVars } from '../../timeline/morph-svg';

export class MorphSVGVarsExtractor extends PresetVarsExtractor<MorphSVGVars> {
  constructor(presetMatcher: PresetMatcher) {
    super(presetMatcher, 'morphSVG');
  }
}
