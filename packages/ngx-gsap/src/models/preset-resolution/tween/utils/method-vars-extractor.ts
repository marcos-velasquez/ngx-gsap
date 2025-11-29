import { gsap } from 'gsap';
import { Condition, TypeChecker } from '../../../../utils';

export type MethodVars = { to?: gsap.TweenVars; from?: gsap.TweenVars; set?: gsap.TweenVars };

export class MethodVarsExtractor {
  constructor(private readonly params: Record<string, unknown>) {}

  public isPresent(): boolean {
    return 'to' in this.params || 'from' in this.params || 'set' in this.params;
  }

  public extract(): MethodVars {
    return (['to', 'from', 'set'] as const).reduce((result, method) => {
      new Condition(() => new TypeChecker(this.params[method]).isObject()).whenTrue(() => {
        result[method] = this.params[method] as gsap.TweenVars;
      });
      return result;
    }, {} as MethodVars);
  }
}
