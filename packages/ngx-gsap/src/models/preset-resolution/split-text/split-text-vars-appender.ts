import { RegexPatterns } from '../../@constants';
import { PresetVarsAppender } from '../__utils__';
import { SplitTextVars } from '../../timeline/split-text';

export class SplitTextVarsAppender extends PresetVarsAppender<SplitTextVars> {
  constructor(sequence: string) {
    super(sequence, 'splitText', RegexPatterns.SPLIT_TEXT_PROPS);
  }
}
