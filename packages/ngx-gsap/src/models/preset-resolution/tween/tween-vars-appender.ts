import { gsap } from 'gsap';
import { TypeSerializer } from '../../../utils';

type MethodVars = { to?: gsap.TweenVars; from?: gsap.TweenVars; set?: gsap.TweenVars };

export class TweenVarsAppender {
  constructor(private readonly sequence: string) {}

  public append(customVars: gsap.TweenVars | MethodVars): string {
    if (Object.keys(customVars).length === 0) return this.sequence;

    // Check if using method-specific vars
    if (this.isMethodSpecificVars(customVars)) {
      return this.appendMethodSpecificVars(customVars as MethodVars);
    }

    // Otherwise, append to all sequences as before
    const customVarsString = this.serializeVars(customVars as gsap.TweenVars);
    return this.sequence
      .split(';')
      .map((seq) => {
        return seq.includes('@') ? `${seq},${customVarsString}` : `${seq}@${customVarsString}`;
      })
      .join(';');
  }

  private isMethodSpecificVars(vars: gsap.TweenVars | MethodVars): vars is MethodVars {
    return 'to' in vars || 'from' in vars || 'set' in vars;
  }

  private appendMethodSpecificVars(methodVars: MethodVars): string {
    return this.sequence
      .split(';')
      .map((seq) => {
        const method = this.extractMethod(seq);
        const varsForMethod = methodVars[method];

        if (!varsForMethod || Object.keys(varsForMethod).length === 0) {
          return seq;
        }

        const varsString = this.serializeVars(varsForMethod);
        return seq.includes('@') ? `${seq},${varsString}` : `${seq}@${varsString}`;
      })
      .join(';');
  }

  private extractMethod(sequence: string): 'to' | 'from' | 'set' {
    if (sequence.startsWith('to:')) return 'to';
    if (sequence.startsWith('set:')) return 'set';
    return 'from'; // Default method
  }

  private serializeVars(vars: gsap.TweenVars): string {
    return Object.entries(vars)
      .map(([key, value]) => `${key}=${new TypeSerializer(value, { quoteStrings: false }).serialize()}`)
      .join(',');
  }
}
