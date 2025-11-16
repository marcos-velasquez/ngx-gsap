import { TweenVars } from '../@types';
import { TypeSerializer } from '../../utils';

export class CustomVarsAppender {
  constructor(private readonly sequence: string) {}

  public append(customVars: TweenVars): string {
    if (Object.keys(customVars).length === 0) return this.sequence;

    const customVarsString = Object.entries(customVars)
      .map(([key, value]) => `${key}=${new TypeSerializer(value, { quoteStrings: false }).serialize()}`)
      .join(',');

    return this.sequence
      .split(';')
      .map((seq) => `${seq}@${customVarsString}`)
      .join(';');
  }
}
