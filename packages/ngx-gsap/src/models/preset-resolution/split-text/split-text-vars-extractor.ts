import { PresetMatcher } from '../preset-matcher';
import { PresetVarsExtractor } from '../__shared__';
import { SplitTextVars } from '../../timeline/split-text';

export class SplitTextVarsExtractor extends PresetVarsExtractor<SplitTextVars> {
  constructor(presetMatcher: PresetMatcher) {
    super(presetMatcher, 'splitText');
  }
}
