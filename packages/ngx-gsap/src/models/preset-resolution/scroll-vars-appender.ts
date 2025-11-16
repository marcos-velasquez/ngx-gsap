import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TypeSerializer } from '../../utils';
import { RegexPatterns } from '../@constants';

export class ScrollVarsAppender {
  constructor(private readonly sequence: string) {}

  public append(scrollVars: ScrollTrigger.StaticVars): string {
    if (Object.keys(scrollVars).length === 0) return this.sequence;

    const scrollVarsString = Object.entries(scrollVars)
      .map(([key, value]) => `${key}=${new TypeSerializer(value, { quoteStrings: false }).serialize()}`)
      .join(',');

    const scrollDeclaration = `scroll@${scrollVarsString}`;

    if (RegexPatterns.SCROLL_PROPS.test(this.sequence)) {
      return this.sequence.replace(RegexPatterns.SCROLL_PROPS, scrollDeclaration);
    }

    return `${scrollDeclaration};${this.sequence}`;
  }
}
