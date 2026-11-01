import { gsap } from 'gsap';
import { assert, TypeSerializer } from '../../utils';
import { PRESETS, PresetName } from './presets';

type PresetParams<K extends PresetName> = NonNullable<Parameters<(typeof PRESETS)[K]>[0]>;

/** A preset written as an object: its params autocomplete, and GSAP, `timeline`, `scroll` or
 *  `splitText` vars ride along as in the string form. */
export type AnimatePreset = {
  [K in PresetName]: { preset: K } & PresetParams<K> & gsap.TweenVars;
}[PresetName];

export type AnimateSequence = string | AnimatePreset;

export class Sequence {
  public static toText(sequence: AnimateSequence): string {
    if (typeof sequence === 'string') return sequence;

    const { preset, ...params } = sequence;
    Object.entries(params).forEach(([key, value]) =>
      assert(typeof value !== 'function', `"${key}" is a function, which a sequence cannot carry; use the outputs`)
    );
    return Object.keys(params).length ? `${preset}(${new TypeSerializer(params).serialize()})` : preset;
  }
}
