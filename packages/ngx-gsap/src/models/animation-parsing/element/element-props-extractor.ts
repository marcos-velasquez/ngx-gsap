import { gsap } from 'gsap';
import { RegexPatterns } from '../../@constants';
import { PropsExtractor } from '../__shared__';

export class ElementPropsExtractor extends PropsExtractor<gsap.TweenVars> {
  constructor(sequence: string) {
    super(sequence, RegexPatterns.ELEMENT_PROPS);
  }
}
