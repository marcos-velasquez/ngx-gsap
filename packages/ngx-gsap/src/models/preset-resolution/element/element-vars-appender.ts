import { gsap } from 'gsap';
import { RegexPatterns } from '../../@constants';
import { PresetVarsAppender } from '../__utils__';

export class ElementVarsAppender extends PresetVarsAppender<gsap.TweenVars> {
  constructor(sequence: string) {
    super(sequence, 'element', RegexPatterns.ELEMENT_PROPS);
  }
}
