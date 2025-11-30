import { gsap } from 'gsap';
import { TypeSerializer } from '../../../../utils';
import { type MethodVars } from '../extractors';
import { TweenMethod } from '../tween-method';

export class GlobalVarsAppender {
  constructor(private readonly sequence: string) {}

  public append(vars: gsap.TweenVars | MethodVars): string {
    const varsString = TweenMethod.filter(Object.entries(vars))
      .map(([k, v]) => `${k}=${new TypeSerializer(v, { quoteStrings: false }).serialize()}`)
      .join(',');

    if (!varsString) return this.sequence;

    return this.sequence
      .split(';')
      .map((seq) => (seq.includes('@') ? `${seq},${varsString}` : `${seq}@${varsString}`))
      .join(';');
  }
}
