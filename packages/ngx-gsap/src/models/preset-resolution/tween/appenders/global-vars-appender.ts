import { gsap } from 'gsap';
import { type MethodVars } from '../extractors';
import { TweenVars } from '../__utils__/tween-vars';

export class GlobalVarsAppender {
  constructor(private readonly sequence: string) {}

  public append(vars: gsap.TweenVars | MethodVars): string {
    const varsString = TweenVars.stringify(vars);
    if (!varsString) return this.sequence;

    return this.sequence
      .split(';')
      .map((seq) => (seq.includes('@') ? `${seq},${varsString}` : `${seq}@${varsString}`))
      .join(';');
  }
}
