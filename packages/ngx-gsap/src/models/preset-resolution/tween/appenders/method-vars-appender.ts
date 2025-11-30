import { TypeSerializer } from '../../../../utils';
import { type MethodVars } from '../extractors';

export class MethodVarsAppender {
  constructor(private readonly sequence: string) {}

  public append(methodVars: MethodVars): string {
    return this.sequence
      .split(';')
      .map((seq) => {
        const method = this.extractMethod(seq);
        const varsForMethod = methodVars[method];
        if (!varsForMethod || Object.keys(varsForMethod).length === 0) return seq;
        const varsString = Object.entries(varsForMethod)
          .map(([key, value]) => `${key}=${new TypeSerializer(value, { quoteStrings: false }).serialize()}`)
          .join(',');
        return seq.includes('@') ? `${seq},${varsString}` : `${seq}@${varsString}`;
      })
      .join(';');
  }

  private extractMethod(sequence: string): 'to' | 'from' | 'set' {
    if (sequence.startsWith('to:')) return 'to';
    if (sequence.startsWith('set:')) return 'set';
    return 'from';
  }
}
