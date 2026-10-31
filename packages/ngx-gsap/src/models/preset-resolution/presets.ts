import { EntrancePresets } from './presets/entrance-presets';
import { ExitPresets } from './presets/exit-presets';
import { AttentionPresets } from './presets/attention-presets';
import { EffectPresets } from './presets/effect-presets';
import { TextPresets } from './presets/text-presets';
import { MorphPresets } from './presets/morph-presets';
import { assert } from '../../utils';

export type Preset = (params?: Record<string, unknown>) => string;

/* A lookup here, unlike one on a class, never reaches `name`, `length` or `prototype`. */
export const PRESETS = {
  // Entrance animations, from EntrancePresets
  fadeIn: EntrancePresets.fadeIn,
  zoomIn: EntrancePresets.zoomIn,
  slideIn: EntrancePresets.slideIn,
  bounceIn: EntrancePresets.bounceIn,
  rotateIn: EntrancePresets.rotateIn,
  flipIn: EntrancePresets.flipIn,
  rollIn: EntrancePresets.rollIn,
  lightSpeedIn: EntrancePresets.lightSpeedIn,
  swingIn: EntrancePresets.swingIn,
  jackInTheBox: EntrancePresets.jackInTheBox,
  backIn: EntrancePresets.backIn,
  bigEntrance: EntrancePresets.bigEntrance,
  hatch: EntrancePresets.hatch,

  // Exit animations, from ExitPresets
  fadeOut: ExitPresets.fadeOut,
  zoomOut: ExitPresets.zoomOut,
  slideOut: ExitPresets.slideOut,
  flipOut: ExitPresets.flipOut,
  rollOut: ExitPresets.rollOut,
  rotateOut: ExitPresets.rotateOut,
  bounceOut: ExitPresets.bounceOut,
  lightSpeedOut: ExitPresets.lightSpeedOut,
  backOut: ExitPresets.backOut,

  // Attention animations, from AttentionPresets
  pulse: AttentionPresets.pulse,
  shake: AttentionPresets.shake,
  jello: AttentionPresets.jello,
  heartBeat: AttentionPresets.heartBeat,
  flash: AttentionPresets.flash,
  spin: AttentionPresets.spin,
  skew: AttentionPresets.skew,
  expand: AttentionPresets.expand,
  pull: AttentionPresets.pull,

  // Effect animations, from EffectPresets
  blur: EffectPresets.blur,
  morphing: EffectPresets.morphing,
  float: EffectPresets.float,
  pop: EffectPresets.pop,
  glow: EffectPresets.glow,

  // Text animations, from TextPresets
  screenReader: TextPresets.screenReader,
  slideReveal: TextPresets.slideReveal,
  wordDrop: TextPresets.wordDrop,
  textFlip: TextPresets.textFlip,

  // Morph animations, from MorphPresets
  morphLinear: MorphPresets.morphLinear,
  morphRotational: MorphPresets.morphRotational,
} satisfies Record<string, (params: never) => string>;

export type PresetName = keyof typeof PRESETS;

export class Presets {
  public static has(presetName: string): presetName is PresetName {
    return Object.prototype.hasOwnProperty.call(PRESETS, presetName);
  }

  public static invoke(presetName: string, params?: Record<string, unknown>): string {
    assert(Presets.has(presetName), `Unknown preset: ${presetName}`);
    return (PRESETS[presetName as PresetName] as Preset)(params);
  }

  /* Recorded through a proxy rather than read from the source: minified, `{ x = '0' }` becomes
     `{x:t="0"}`, but the keys survive. */
  public static paramNames(presetName: PresetName): string[] {
    return Presets.paramNamesOf(PRESETS[presetName] as Preset);
  }

  public static paramNamesOf(preset: Preset): string[] {
    const read = new Set<string>();
    const recorder = new Proxy({}, { get: (_, key) => (typeof key === 'string' && read.add(key), undefined) });
    preset(recorder);
    return [...read];
  }
}
