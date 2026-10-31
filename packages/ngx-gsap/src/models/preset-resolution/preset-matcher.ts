import { assert } from '../../utils';
import { RegexPatterns } from '../@constants';
import { Presets, PresetName } from './presets';

export type PresetMatch = { presetName: string; argsString: string; hasArgs: boolean };

export class PresetMatcher {
  private readonly match: RegExpMatchArray | null;

  constructor(public readonly sequence: string) {
    this.match = sequence.match(RegexPatterns.PRESET_FUNCTION);
  }

  public get presetName(): string {
    return this.match?.[1] ?? this.sequence;
  }

  public get argsString(): string {
    return this.match?.[2] ?? '';
  }

  public paramNames(): string[] {
    assert(this.isPreset(), `Unknown preset: ${this.presetName}`);
    return Presets.paramNames(this.presetName as PresetName);
  }

  public isFunction(): boolean {
    return !!this.match;
  }

  public isPreset(): boolean {
    return Presets.has(this.presetName);
  }

  public asPresetMatch(): PresetMatch {
    assert(this.isFunction(), 'Sequence does not have function syntax');

    return { presetName: this.presetName, argsString: this.argsString, hasArgs: !!this.argsString.trim() };
  }
}
