export type Preset = (params?: Record<string, unknown>) => string;

export class EffectPresets {
  /**
   * Blur animation - transitions from blurred to focused state.
   * @param startBlur - Starting blur amount in pixels (default: 10)
   * @param endBlur - Ending blur amount in pixels (default: 0)
   * @param duration - Animation duration (default: 1.5)
   * @remarks Animation sequence:
   * - Sets initial blur filter
   * - Animates to end blur value
   * - Numeric values are automatically converted to 'px' units
   * - String values with units are used as-is
   * @example blur() // Blur from 10px to 0px (focus)
   * @example blur({ startBlur: 20 }) // Stronger blur start
   * @example blur({ endBlur: 5 }) // End with slight blur
   * @example blur({ duration: 2 }) // Slower blur transition
   */
  public static blur({ startBlur = 10, endBlur = 0, duration = 1.5 } = {}): string {
    const startBlurValue = Number.isNaN(Number(startBlur)) ? startBlur : `${Number(startBlur)}px`;
    const endBlurValue = Number.isNaN(Number(endBlur)) ? endBlur : `${Number(endBlur)}px`;
    return `filter:blur(${startBlurValue})@duration=${duration};to:filter:blur(${endBlurValue})@duration=${duration}`;
  }

  /**
   * Morphing animation with scale and rotation changes.
   * @param startScale - First scale (default: 1.1)
   * @param rotate - Rotation degrees (default: 45)
   * @param endScale - Second scale (default: 0.9)
   * @example morphing() // Standard morph
   * @example morphing({ startScale: 1.5, rotate: 90 }) // Dramatic morph
   * @example morphing({ duration: 2 }) // Slow transformation
   */
  public static morphing({ startScale = 1.1, rotate = 45, endScale = 0.9 } = {}): string {
    return `to:scale:${startScale}:0;to:rotate:${rotate}:0;to:scale:${endScale};to:rotate:0;to:scale:1`;
  }

  /**
   * Float animation - gentle up and down movement.
   * @param startY - First float position (default: '-20px')
   * @param endY - Second float position (default: '-10px')
   * @example float() // Standard float
   * @example float({ startY: '-30px', endY: '-15px' }) // Wider float
   * @example float({ duration: 2, repeat: -1 }) // Continuous floating
   */
  public static float({ startY = '-20px', endY = '-10px' } = {}): string {
    return `to:y:${startY};to:y:${endY};to:y:${startY};to:y:${endY};`;
  }

  /**
   * Pop animation - quick scale up with overshoot.
   * @param startScale - Starting scale (default: 0)
   * @param midScale - Overshoot scale (default: 1.1)
   * @param endScale - Final scale (default: 1)
   * @example pop() // Standard pop
   * @example pop({ midScale: 1.3 }) // Bigger pop
   * @example pop({ duration: 0.3 }) // Quick pop
   */
  public static pop({ startScale = 0.75, midScale = 1.1, endScale = 1 } = {}): string {
    return `scale:${startScale}:>;to:scale:${midScale}:<50%;to:scale:${endScale}`;
  }

  /**
   * Glow effect animation.
   * @param boxShadow - Glow shadow (default: '0 0 20px rgba(255, 255, 255, 0.8)')
   * @example glow() // Standard white glow
   * @example glow({ boxShadow: '0 0 30px rgba(0, 255, 255, 1)' }) // Cyan glow
   */
  public static glow({ boxShadow = '0 0 20px rgba(255, 255, 255, 0.8)' } = {}): string {
    return `to:boxShadow:${boxShadow}`;
  }
}
