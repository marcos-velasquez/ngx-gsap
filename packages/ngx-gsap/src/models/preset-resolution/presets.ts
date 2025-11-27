import { EntrancePresets } from './presets/entrance-presets';
import { ExitPresets } from './presets/exit-presets';
import { AttentionPresets } from './presets/attention-presets';
import { EffectPresets } from './presets/effect-presets';
import { TextPresets } from './presets/text-presets';

export type Preset = (params?: Record<string, unknown>) => string;

export class Presets {
  public static eval(presetName: string, argsString = ''): string {
    return new Function('Presets', `return Presets.${presetName}(${argsString})`)(Presets);
  }

  // Entrance animations - delegated to EntrancePresets
  public static fadeIn = EntrancePresets.fadeIn;
  public static zoomIn = EntrancePresets.zoomIn;
  public static slideIn = EntrancePresets.slideIn;
  public static bounceIn = EntrancePresets.bounceIn;
  public static rotateIn = EntrancePresets.rotateIn;
  public static flipIn = EntrancePresets.flipIn;
  public static rollIn = EntrancePresets.rollIn;
  public static lightSpeedIn = EntrancePresets.lightSpeedIn;
  public static swingIn = EntrancePresets.swingIn;
  public static jackInTheBox = EntrancePresets.jackInTheBox;
  public static backIn = EntrancePresets.backIn;
  public static bigEntrance = EntrancePresets.bigEntrance;
  public static hatch = EntrancePresets.hatch;

  // Exit animations - delegated to ExitPresets
  public static fadeOut = ExitPresets.fadeOut;
  public static zoomOut = ExitPresets.zoomOut;
  public static slideOut = ExitPresets.slideOut;
  public static flipOut = ExitPresets.flipOut;
  public static rollOut = ExitPresets.rollOut;
  public static rotateOut = ExitPresets.rotateOut;
  public static bounceOut = ExitPresets.bounceOut;
  public static lightSpeedOut = ExitPresets.lightSpeedOut;
  public static backOut = ExitPresets.backOut;

  // Attention animations - delegated to AttentionPresets
  public static pulse = AttentionPresets.pulse;
  public static shake = AttentionPresets.shake;
  public static jello = AttentionPresets.jello;
  public static heartBeat = AttentionPresets.heartBeat;
  public static flash = AttentionPresets.flash;
  public static spin = AttentionPresets.spin;
  public static skew = AttentionPresets.skew;
  public static expand = AttentionPresets.expand;
  public static pull = AttentionPresets.pull;

  // Effect animations - delegated to EffectPresets
  public static blur = EffectPresets.blur;
  public static morphing = EffectPresets.morphing;
  public static float = EffectPresets.float;
  public static pop = EffectPresets.pop;
  public static glow = EffectPresets.glow;

  // Text animations - delegated to TextPresets
  public static screenReader = TextPresets.screenReader;
  public static slideReveal = TextPresets.slideReveal;
}
