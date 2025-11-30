import { gsap } from 'gsap';
import { TypeSerializer } from '../../../../utils';

export class GlobalVarsAppender {
  constructor(private readonly sequence: string) {}

  public append(vars: gsap.TweenVars): string {
    const varsString = Object.entries(vars)
      .map(([key, value]) => `${key}=${new TypeSerializer(value, { quoteStrings: false }).serialize()}`)
      .join(',');
    return this.sequence
      .split(';')
      .map((seq) => (seq.includes('@') ? `${seq},${varsString}` : `${seq}@${varsString}`))
      .join(';');
  }
}
