export class MorphPresets {
  /**
   * Morph SVG shape with linear interpolation
   * @param shape - Target shape selector (e.g., '#star')
   * @param duration - Animation duration in seconds
   * @param origin - Transform origin point
   * @example morphLinear({ shape: '#star', duration: 1 })
   */
  public static morphLinear({ shape = '', origin = '50% 50%' } = {}): string {
    return `morphSVG@shape=${shape},type=linear,origin=${origin};`;
  }

  /**
   * Morph SVG shape with rotational interpolation
   * @param shape - Target shape selector (e.g., '#star')
   * @param duration - Animation duration in seconds
   * @param origin - Transform origin point
   * @example morphRotational({ shape: '#star', duration: 1 })
   */
  public static morphRotational({ shape = '', origin = '50% 50%' } = {}): string {
    return `morphSVG@shape=${shape},type=rotational,origin=${origin};`;
  }
}
