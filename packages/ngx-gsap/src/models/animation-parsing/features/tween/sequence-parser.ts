import { gsap } from 'gsap';
import { RegexPatterns } from '../../../@constants';
import { PropsParser } from '../__shared__';

export type Method = 'to' | 'from' | 'set';
export type ParsedAnimation = { method: Method; selector?: string; vars: gsap.TweenVars; position: gsap.Position };

export class SequenceParser {
  constructor(private readonly sequence: string) {}

  public parse(): ParsedAnimation | null {
    const match = this.sequence.trim().match(RegexPatterns.ANIMATION_SEQUENCE);
    if (!match) return null;

    const [, method = 'from', prop, value, position = '>', propsString] = match;
    const vars: gsap.TweenVars = { [prop]: isNaN(Number(value)) ? value : Number(value) };
    if (propsString) Object.assign(vars, new PropsParser(propsString).parse());

    const { selector, ...restVars } = vars as gsap.TweenVars & { selector?: string };

    return { method: method as Method, selector, vars: restVars, position };
  }
}
