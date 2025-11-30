import { gsap } from 'gsap';
import { GlobalVarsAppender, MethodVarsAppender } from './appenders';
import { type MethodVars } from './extractors';

export class TweenVarsAppender {
  constructor(private readonly sequence: string) {}

  public append(customVars: gsap.TweenVars | MethodVars): string {
    if (Object.keys(customVars).length === 0) return this.sequence;

    return new GlobalVarsAppender(new MethodVarsAppender(this.sequence).append(customVars)).append(customVars);
  }
}
