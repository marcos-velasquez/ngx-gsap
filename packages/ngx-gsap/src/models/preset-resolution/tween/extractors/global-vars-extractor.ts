import { gsap } from 'gsap';
import { TweenMethod } from '../__utils__/tween-method';
import { TweenVars } from '../__utils__/tween-vars';

export class GlobalVarsExtractor {
  constructor(private readonly params: Record<string, unknown>, private readonly presetParamNames: string[]) {}

  public extract(): gsap.TweenVars {
    return Object.keys(this.params)
      .filter((key) => this.isCustomVar(key))
      .reduce((acc, key) => ((acc[key] = this.params[key]), acc), {} as gsap.TweenVars);
  }

  private isCustomVar(key: string): boolean {
    return (
      !TweenVars.excludedKeys().includes(key) && !TweenMethod.isMethod(key) && !this.presetParamNames.includes(key)
    );
  }
}
