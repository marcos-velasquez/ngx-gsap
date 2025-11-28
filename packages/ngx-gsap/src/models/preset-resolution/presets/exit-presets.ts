export class ExitPresets {
  /**
   * Fade out animation - element fades from opaque to transparent.
   * @param x - Horizontal ending position (default: '0')
   * @param y - Vertical ending position (default: '0')
   * @param opacity - Ending opacity (default: 0)
   * @example fadeOut() // Simple fade out
   * @example fadeOut({ opacity: 0.5 }) // Fade out to 50% opacity
   * @example fadeOut({ x: '100%', y: '0' }) // Fade out from right
   * @example fadeOut({ x: '0', y: '100%' }) // Fade out from bottom
   * @example fadeOut({ duration: 1, yoyo: true, repeat: 1 }) // Fade out and back
   */
  public static fadeOut({ x = '0', y = '0', opacity = 0 } = {}): string {
    return `to:x:${x}:0;to:y:${y}:0;to:opacity:${opacity}:<`;
  }

  /**
   * Zoom out animation - element scales down to small size with fade and optional movement.
   * @param x - Horizontal ending position (default: '0')
   * @param y - Vertical ending position (default: '0')
   * @param scale - Ending scale (default: .3)
   * @param opacity - Ending opacity (default: 0)
   * @example zoomOut() // Simple zoom out to 10% scale
   * @example zoomOut({ x: '0', y: '100%' }) // Zoom out to bottom
   * @example zoomOut({ x: '100%', y: '0' }) // Zoom out to right
   * @example zoomOut({ scale: 0.3, duration: 2 }) // Slow zoom out
   */
  public static zoomOut({ x = '0', y = '0', scale = 0.3, opacity = 0 } = {}): string {
    return `to:x:${x}:0;to:y:${y}:0;to:scale:${scale}:0@ease=power2.out;to:opacity:${opacity}:0`;
  }

  /**
   * Slide out animation - element moves to a position.
   * @param axis - Animation axis: 'x' for horizontal or 'y' for vertical (default: 'x')
   * @param distance - Ending distance from current position (default: '0')
   * @remarks Animation sequence:
   * - Animates along the specified axis to the target distance
   * - Use negative values to slide left/up, positive for right/down
   * @example slideOut({ axis: 'x', distance: '-100%' }) // Slide out to left
   * @example slideOut({ axis: 'y', distance: '100%' }) // Slide out to bottom
   * @example slideOut({ axis: 'x', distance: '100%' }) // Slide out to right
   */
  public static slideOut({ axis = 'x', distance = '0' } = {}): string {
    const property = axis === 'y' ? `y` : `x`;
    return `to:${property}:${distance}:0`;
  }

  /**
   * Flip out animation - element flips out on specified axis.
   * @param axis - Rotation axis: 'x' or 'y' (default: 'x')
   * @param opacity - Ending opacity (default: 0)
   * @remarks The animation performs a two-stage flip:
   * - Rotates to -5 degrees
   * - Rotates to 90 degrees (fully flipped out)
   * - Opacity fades at 20% progress
   * @example flipOut() // Flip out on X-axis
   * @example flipOut({ axis: 'y' }) // Flip out on Y-axis
   * @example flipOut({ duration: 1 }) // Slower flip
   */
  public static flipOut({ axis = 'x', opacity = 0 } = {}): string {
    const rotateAxis = axis === 'x' ? 'rotateX' : 'rotateY';
    return `element@transformPerspective=400;to:${rotateAxis}:-5;to:${rotateAxis}:90;to:opacity:${opacity}:<20%`;
  }

  /**
   * Roll out animation with rotation and horizontal movement.
   * @param degrees - Rotation degrees (default: 120)
   * @param distance - Horizontal ending distance (default: '100%')
   * @param opacity - Ending opacity (default: 0)
   * @example rollOut() // Roll out to right
   * @example rollOut({ distance: '-100%', degrees: -120 }) // Roll out to left
   * @example rollOut({ degrees: 240 }) // Double roll out
   */
  public static rollOut({ degrees = 120, distance = '100%', opacity = 0 } = {}): string {
    return `to:rotate:${degrees}:0;to:x:${distance}:0;to:opacity:${opacity}:0`;
  }

  /**
   * Rotate out animation - element rotates and moves to a position while fading out.
   * @param rotate - Rotation value (default: '-200deg')
   * @param x - Horizontal ending position (default: '0')
   * @param y - Vertical ending position (default: '0')
   * @param opacity - Ending opacity (default: 0)
   * @remarks Animation sequence:
   * - Rotates, moves to x/y position, and fades out simultaneously
   * - Use negative rotation for counter-clockwise, positive for clockwise
   * @example rotateOut() // Standard rotate out to right
   * @example rotateOut({ rotate: '360deg' }) // Full rotation out
   * @example rotateOut({ rotate: '180deg', x: '0', y: '1000' }) // Rotate and exit to bottom
   */
  public static rotateOut({ rotate = '-200deg', x = '0', y = '0', opacity = 0 } = {}): string {
    return `to:rotate:${rotate}:0;to:x:${x}:0;to:y:${y}:0;to:opacity:${opacity}:0;`;
  }

  /**
   * Bounce out animation - element bounces out with elastic effect.
   * @param scale - Ending scale (default: 0.3)
   * @param x - Horizontal ending position (default: '0')
   * @param y - Vertical ending position (default: '100')
   * @param opacity - Ending opacity (default: 0)
   * @param bounceDistance - Initial bounce distance (default: 20). For y-axis, uses half for initial bounce and full value for mid bounce
   * @remarks The animation uses conditional logic to determine the primary property:
   * - If x !== '0', animates along x-axis with scaleX (bounces opposite direction first)
   * - If y !== '0', animates along y-axis with scaleY (two-phase bounce: bounceDistance/2 then bounceDistance)
   * - Otherwise, uses scale property with bounce effect (0.9 → 1.1 → scale)
   * @example bounceOut() // Bounce out down (y: '100')
   * @example bounceOut({ x: '2000' }) // Bounce out to right
   * @example bounceOut({ y: '-2000' }) // Bounce out up
   * @example bounceOut({ x: '2000', bounceDistance: 40 }) // Stronger horizontal bounce
   * @example bounceOut({ scale: 0.5 }) // Bounce out with scale
   */
  public static bounceOut({ scale = 0.3, x = '0', y = '0', opacity = 0, bounceDistance = 20 } = {}): string {
    const property = x !== '0' ? { k: 'x', v: x } : y !== '0' ? { k: 'y', v: y } : { k: 'scale', v: scale };
    const sign = property.k !== 'scale' ? (Number(property.v) > 0 ? '-' : '') : '';
    const bounce = property.k === 'y' ? bounceDistance / 2 : bounceDistance;
    const midBounce = property.k === 'y' ? bounceDistance : 0;

    return property.k === 'x'
      ? `to:x:${sign}${bounce}:0.2;to:scaleX:0.9:0.2;to:opacity:1:0.2;to:x:${x};to:scaleX:1:<;to:opacity:${opacity}:<`
      : property.k === 'y'
      ? `to:y:${sign}${bounce}:0.2;to:scaleY:0.985:0.2;to:y:${sign}${midBounce}:0.4;to:scaleY:0.9:0.45;to:opacity:1:0.45;to:y:${y};to:scaleY:1:<;to:opacity:${opacity}:<`
      : `to:scale:0.9:0.2;to:scale:1.1:0.5;to:opacity:1:0.55;to:scale:${scale};to:opacity:${opacity}:<`;
  }

  /**
   * Light speed out animation with skew effect.
   * @param distance - Horizontal ending distance (default: '100%')
   * @param skew - Skew angle on X-axis (default: 30)
   * @param opacity - Ending opacity (default: 0)
   * @remarks Animation sequence:
   * - Moves to distance position
   * - Applies skew with sign matching distance direction
   * - If distance is negative (left), skew uses '-' sign
   * - If distance is positive (right), skew has no sign
   * - Fades out simultaneously
   * @example lightSpeedOut() // Fast exit to right with positive skew
   * @example lightSpeedOut({ distance: '-100%', skew: 30 }) // Exit to left with negative skew
   */
  public static lightSpeedOut({ distance = '100%', skew = 30, opacity = 0 } = {}): string {
    const sign = distance.startsWith('-') ? '-' : '';
    return `to:x:${distance}:>;to:skewX:${sign}${skew}:0;to:opacity:${opacity}:0`;
  }

  /**
   * Back out animation - element exits to a position with scale and opacity transition.
   * @param x - Horizontal ending position (default: '0')
   * @param y - Vertical ending position (default: '0')
   * @param scale - Intermediate scale (default: 0.7)
   * @param opacity - Intermediate opacity (default: 0.7)
   * @remarks Animation sequence:
   * - Scales down to scale value and reduces opacity simultaneously
   * - Moves to x/y position
   * - Fades out to opacity 0
   * @example backOut() // Standard back out to right
   * @example backOut({ x: '0', y: '1000' }) // Back out to bottom
   * @example backOut({ scale: 0.5, opacity: 0.5 }) // Smaller scale with more fade
   */
  public static backOut({ x = '0', y = '0', scale = 0.7, opacity = 0.7 } = {}): string {
    return `to:scale:${scale}:0;to:opacity:${opacity}:0;to:x:${x};to:y:${y}:<;to:opacity:0:<`;
  }
}
