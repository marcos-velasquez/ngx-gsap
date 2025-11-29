import { gsap } from 'gsap';
import { TypeSerializer } from '../../../utils';
import { type MethodVars } from './utils';

export class TweenVarsAppender {
  constructor(private readonly sequence: string) {}

  public append(customVars: gsap.TweenVars | MethodVars): string {
    if (Object.keys(customVars).length === 0) return this.sequence;
    if (this.isMethodSpecificVars(customVars)) return this.appendMethodSpecificVars(customVars as MethodVars);

    const customVarsString = this.serializeVars(customVars as gsap.TweenVars);
    return this.sequence
      .split(';')
      .map((seq) => (seq.includes('@') ? `${seq},${customVarsString}` : `${seq}@${customVarsString}`))
      .join(';');
  }

  private isMethodSpecificVars(vars: gsap.TweenVars | MethodVars): vars is MethodVars {
    return 'to' in vars || 'from' in vars || 'set' in vars;
  }

  private appendMethodSpecificVars(methodVars: MethodVars): string {
    return this.sequence
      .split(';')
      .map((seq) => {
        const varsForMethod = methodVars[this.extractMethod(seq)];
        if (!varsForMethod || Object.keys(varsForMethod).length === 0) return seq;
        const varsString = this.serializeVars(varsForMethod);
        return seq.includes('@') ? `${seq},${varsString}` : `${seq}@${varsString}`;
      })
      .join(';');
  }

  private extractMethod(sequence: string): 'to' | 'from' | 'set' {
    if (sequence.startsWith('to:')) return 'to';
    if (sequence.startsWith('set:')) return 'set';
    return 'from';
  }

  private serializeVars(vars: gsap.TweenVars): string {
    return Object.entries(vars)
      .map(([key, value]) => `${key}=${new TypeSerializer(value, { quoteStrings: false }).serialize()}`)
      .join(',');
  }
}
