import { assert } from '../../utils';
import { RegexPatterns } from '../@constants';
import { Presets, Preset } from './presets';

export type PresetMatch = { presetName: string; argsString: string; hasArgs: boolean };

export class PresetMatcher {
  private readonly match: RegExpMatchArray | null;

  constructor(public readonly sequence: string) {
    this.match = sequence.match(RegexPatterns.PRESET_FUNCTION);
  }

  public get presetName(): string {
    return this.isFunction() ? this.match![1] : this.sequence;
  }

  public get argsString(): string {
    return this.match![2];
  }

  public get preset(): Preset {
    return (Presets as any)[this.presetName];
  }

  public paramNames(): string[] {
    const paramMatch = this.preset.toString().match(RegexPatterns.DESTRUCTURED_PARAMS);
    assert(!!paramMatch, 'Preset must have destructured parameters');

    return paramMatch![1].split(',').map((p) => p.trim().split('=')[0].trim());
  }

  public isFunction(): boolean {
    return !!this.match;
  }

  public isPreset(): boolean {
    return !!this.preset;
  }

  public asPresetMatch(): PresetMatch {
    assert(this.isFunction(), 'Sequence does not have function syntax');

    return { presetName: this.presetName, argsString: this.argsString, hasArgs: !!this.argsString.trim() };
  }
}
