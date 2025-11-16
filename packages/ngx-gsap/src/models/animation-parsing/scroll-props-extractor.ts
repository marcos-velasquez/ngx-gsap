import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RegexPatterns } from '../@constants';
import { PropsParser } from './props-parser';

export class ScrollPropsExtractor {
  constructor(private readonly sequence: string) {}

  public extract(): ScrollTrigger.StaticVars {
    const match = this.sequence.match(RegexPatterns.SCROLL_PROPS);
    if (!match) return {};

    return new PropsParser(match[1]).parse() as ScrollTrigger.StaticVars;
  }
}
