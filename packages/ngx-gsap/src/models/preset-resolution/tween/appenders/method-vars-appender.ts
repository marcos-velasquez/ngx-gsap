import { gsap } from 'gsap';
import { TypeSerializer } from '../../../../utils';
import { type MethodVars } from '../extractors';
import { TweenMethod } from '../__utils__/tween-method';

export class MethodVarsAppender {
  constructor(private readonly sequence: string) {}

  public append(vars: gsap.TweenVars | MethodVars): string {
    return this.sequence
      .split(';')
      .map((seq) => {
        const methodVars = vars[TweenMethod.parse(seq)] as gsap.TweenVars | undefined;
        if (!methodVars) return seq;

        const varsString = Object.entries(methodVars)
          .map(([k, v]) => `${k}=${new TypeSerializer(v, { quoteStrings: false }).serialize()}`)
          .join(',');
        return seq.includes('@') ? `${seq},${varsString}` : `${seq}@${varsString}`;
      })
      .join(';');
  }
}
