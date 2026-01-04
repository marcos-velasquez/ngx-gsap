import { RegexPatterns } from '../../@constants';
import { PropsExtractor } from '../__shared__';
import { MorphSVGVars } from '../../timeline/morph-svg';

export class MorphSVGPropsExtractor extends PropsExtractor<MorphSVGVars> {
  constructor(sequence: string) {
    super(sequence, RegexPatterns.MORPH_SVG_PROPS);
  }
}
