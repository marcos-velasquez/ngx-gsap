export class AttentionPresets {
  /**
   * Pulse animation that scales up and down with optional fade.
   * @param scale1 - Peak scale value (default: 1.05)
   * @example pulse() // Subtle pulse
   * @example pulse({ scale1: 1.1 }) // Stronger pulse
   * @example pulse({ repeat: 3, yoyo: true }) // Pulse 4 times with yoyo effect
   */
  public static pulse({ scale1 = 1.05 } = {}): string {
    return `to:scale:${scale1};to:scale:1`;
  }

  /**
   * Shake animation with horizontal and/or vertical movement.
   * @param axis - Shake axis: 'x' or 'y' (default: 'x')
   * @param distance - Shake distance (default: '10')
   * @param repeat - Number of times to repeat (default: 5)
   * @example shake() // Horizontal shake, repeats 5 times
   * @example shake({ distance: '15' }) // Stronger shake
   * @example shake({ axis: 'y' }) // Vertical shake
   * @example shake({ repeat: -1 }) // Shake infinite times
   */
  public static shake({ axis = 'x', distance = '10', repeat = 5 } = {}): string {
    const shakeAxis = axis === 'x' ? 'x' : 'y';
    return `timeline@repeat=${repeat};to:${shakeAxis}:${distance}@duration=0.1;to:${shakeAxis}:-${distance}@duration=0.1;to:${shakeAxis}:0@duration=0`;
  }

  /**
   * Jello animation with skew wobble effect using bounce ease.
   * @param skewX - Base skew X angle (default: -12.5)
   * @param skewY - Base skew Y angle (default: -12.5)
   * @remarks Creates a jello wobble effect:
   * - Skews to base angles simultaneously
   * - Returns to 0 with bounce.out ease for natural wobble
   * - Second skew positioned at 50% for synchronized effect
   * @example jello() // Standard jello wobble
   * @example jello({ skewX: -20, skewY: -20 }) // More dramatic wobble
   */
  public static jello({ skewX = -12.5, skewY = -12.5 } = {}): string {
    return `to:skewX:${skewX}:0;to:skewY:${skewY}:0;to:skewX:0:<50%@ease=bounce.out;to:skewY:0:<@ease=bounce.out`;
  }

  /**
   * Heart beat animation with pulsing scale.
   * @param scale - Enlarged scale (default: 1.3)
   * @param repeat - Number of times to repeat (default: 2)
   * @param timeScale - Animation speed multiplier (default: 1.2)
   * @example heartBeat() // Standard heart beat
   * @example heartBeat({ scale: 1.5 }) // Stronger beat
   */
  public static heartBeat({ scale = 1.3, repeat = 1, timeScale = 1.2 } = {}): string {
    return `timeline@repeat=${repeat},timeScale=${timeScale};to:scale:${scale}:0;to:scale:1`;
  }

  /**
   * Flash animation with opacity pulsing.
   * @param repeat - Number of times to repeat the flash (default: 1)
   * @remarks Animation sequence:
   * - Fades to opacity 0
   * - Fades back to opacity 1
   * - Repeats based on repeat parameter (2 flashes total with default)
   * @example flash() // Standard flash (2 flashes)
   * @example flash({ repeat: 3 }) // Flash 4 times
   * @example flash({ repeat: -1 }) // Infinite flashing
   */
  public static flash({ repeat = 1 } = {}): string {
    return `timeline@repeat=${repeat};to:opacity:0:>;to:opacity:1:>;`;
  }

  /**
   * Spin animation.
   * @param degrees - Rotation degrees (default: 360)
   * @example spin() // One full rotation
   * @example spin({ degrees: 720 }) // Two rotations
   * @example spin({ degrees: 180 }) // Half rotation
   * @example spin({ degrees: -360 }) // Reverse rotation
   */
  public static spin({ degrees = 360 } = {}): string {
    return `to:rotate:${degrees}`;
  }

  /**
   * Skew animation on both axes.
   * @param skewX - X-axis skew angle (default: -10)
   * @param skewY - Y-axis skew angle (default: -10)
   * @remarks Animation sequence:
   * - Skews to target angles simultaneously at position 0
   * - Returns to 0 skew at position 1 (after first animation completes)
   * @example skew() // Standard skew
   * @example skew({ skewX: -20, skewY: -20 }) // Stronger skew
   * @example skew({ skewX: 15, skewY: -15 }) // Opposite skew
   */
  public static skew({ skewX = -10, skewY = -10 } = {}): string {
    return `to:skewX:${skewX}:0;to:skewY:${skewY}:0;to:skewX:0:1;to:skewY:0:1`;
  }

  /**
   * Expand animation - scale up on both axes simultaneously.
   * @param scaleX - X-axis scale (default: 1.1)
   * @param scaleY - Y-axis scale (default: 1.1)
   * @remarks Animation sequence:
   * - Scales both axes simultaneously to target values
   * - Default expands to 110% on both axes
   * @example expand() // Expand to 110%
   * @example expand({ scaleX: 1.5, scaleY: 1.5 }) // Expand to 150%
   * @example expand({ scaleX: 2, scaleY: 1 }) // Horizontal expand only
   */
  public static expand({ scaleX = 1.1, scaleY = 1.1 } = {}): string {
    return `to:scaleX:${scaleX}:0;to:scaleY:${scaleY}:0`;
  }

  /**
   * Pull animation - quick movement up or down and return.
   * @param y - Pull distance (default: '20px')
   * @param direction - Pull direction: 'up' or 'down' (default: 'up')
   * @remarks Animation sequence:
   * - Moves to y position (negative for up, positive for down)
   * - Returns to original position
   * @example pull() // Standard pull up
   * @example pull({ direction: 'down' }) // Pull down
   * @example pull({ y: '30', direction: 'up' }) // Stronger pull up
   */
  public static pull({ y = '20', direction = 'up' }: { y?: string; direction?: 'up' | 'down' } = {}): string {
    const distance = direction === 'up' ? `-${y}` : y;
    return `to:y:${distance}:>;to:y:0:>`;
  }
}
