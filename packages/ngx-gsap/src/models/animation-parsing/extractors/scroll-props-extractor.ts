import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RegexPatterns } from '../../@constants';
import { PropsExtractor } from '../props-extractor';

export class ScrollPropsExtractor extends PropsExtractor<ScrollTrigger.StaticVars> {
  constructor(sequence: string) {
    super(sequence, RegexPatterns.SCROLL_PROPS);
  }
}
