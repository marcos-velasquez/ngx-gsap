import { RegexPatterns } from '../../@constants';
import { PresetVarsAppender } from '../__shared__';
import { MorphSVGVars } from '../../timeline/morph-svg';

export class MorphSVGVarsAppender extends PresetVarsAppender<MorphSVGVars> {
  constructor(sequence: string) {
    super(sequence, 'morphSVG', RegexPatterns.MORPH_SVG_PROPS);
  }
}
