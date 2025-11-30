import { gsap } from 'gsap';
import { GlobalVarsAppender, MethodVarsAppender } from './appenders';
import { type MethodVars } from './extractors';

export class TweenVarsAppender {
  constructor(private readonly sequence: string) {}

  public append(customVars: gsap.TweenVars | MethodVars): string {
    if (Object.keys(customVars).length === 0) return this.sequence;

    if (this.isMethodSpecific(customVars)) {
      return new MethodVarsAppender(this.sequence).append(customVars as MethodVars);
    }

    return new GlobalVarsAppender(this.sequence).append(customVars as gsap.TweenVars);
  }

  private isMethodSpecific(vars: gsap.TweenVars | MethodVars): vars is MethodVars {
    return 'to' in vars || 'from' in vars || 'set' in vars;
  }
}
