export class EntrancePresets {
  /**
   * Fade in animation - element fades from transparent to opaque.
   * @param x - Horizontal starting position (default: '0')
   * @param y - Vertical starting position (default: '0')
   * @param opacity - Starting opacity (default: 0)
   * @example fadeIn() // Simple fade in
   * @example fadeIn({ opacity: 0.5 }) // Fade in from 50% opacity
   * @example fadeIn({ x: '-100%' }) // Fade in from left
   * @example fadeIn({ x: '100%' }) // Fade in from right
   * @example fadeIn({ y: '100%' }) // Fade in from bottom
   * @example fadeIn({ y: '-100%' }) // Fade in from top
   * @example fadeIn({ x: '-100%', y: '-100%' }) // Fade in from top-left
   * @example fadeIn({ y: '2000px' }) // Fade in from far away
   * @example fadeIn({ duration: 2, ease: 'power2.out' }) // With custom GSAP props
   */
  public static fadeIn({ x = '0', y = '0', opacity = 0 } = {}): string {
    return `x:${x}:0;y:${y}:0;opacity:${opacity}:<`;
  }

  /**
   * Zoom in animation - element scales up from small to normal size with fade.
   * @param scale - Starting scale (default: 0.1)
   * @param x - Horizontal starting position (default: '0')
   * @param y - Vertical starting position (default: '0')
   * @param opacity - Starting opacity (default: 0)
   * @example zoomIn() // Simple zoom in from 10% scale
   * @example zoomIn({ x: '0', y: '100%' }) // Zoom in from bottom
   * @example zoomIn({ x: '100%', y: '0' }) // Zoom in from right
   * @example zoomIn({ duration: 1.5 }) // Slower zoom
   */
  public static zoomIn({ x = '0', y = '0', scale = 0.1, opacity = 0 } = {}): string {
    return `set:opacity:${opacity};set:scale:${scale};x:${x}:0;y:${y}:0;to:opacity:1:<@ease=power2.in;to:scale:1:<30%`;
  }

  /**
   * Slide in animation - element slides in from a specified direction.
   * @param axis - Animation axis: 'x' for horizontal or 'y' for vertical (default: 'x')
   * @param distance - Starting distance from final position (default: '0')
   * @example slideIn() // Slide in horizontally from x: 0
   * @example slideIn({ axis: 'x', distance: '100%' }) // Slide in from right
   * @example slideIn({ axis: 'y', distance: '100%' }) // Slide in from bottom
   * @example slideIn({ axis: 'y', distance: '-100%' }) // Slide in from top
   */
  public static slideIn({ axis = 'x', distance = '0' } = {}): string {
    const property = axis === 'y' ? `y` : `x`;
    return `${property}:${distance}:0`;
  }

  /**
   * Bounce in animation - element bounces in with elastic scaling effect.
   * @param scale - Starting scale (default: 0.75)
   * @param x - Horizontal starting position (default: '0')
   * @param y - Vertical starting position (default: '0')
   * @param opacity - Starting opacity (default: 0)
   * @param duration - Animation duration (default: 1.5)
   * @remarks The animation uses conditional logic to determine the primary property:
   * - If x !== '0', uses the 'x' property
   * - If y !== '0', uses the 'y' property
   * - Otherwise, uses the 'scale' property
   * @example bounceIn() // Standard bounce in
   * @example bounceIn({ scale: 0.1 }) // Bounce from very small
   * @example bounceIn({ opacity: 0.5 }) // Bounce with partial fade
   * @example bounceIn({ duration: 1 }) // Slower bounce
   */
  public static bounceIn({ scale = 0.75, x = '0', y = '0', opacity = 0, duration = 1.5 } = {}): string {
    const property = x !== '0' ? { k: 'x', v: x } : y !== '0' ? { k: 'y', v: y } : { k: 'scale', v: scale };
    return `${property.k}:${property.v}:0@ease=bounce.out,duration=${duration};opacity:${opacity}:0`;
  }

  /**
   * Rotate in animation - element rotates in with fade.
   * @param rotate - Starting rotation in degrees (default: -200)
   * @param x - Horizontal starting position (default: '0')
   * @param y - Vertical starting position (default: '0')
   * @param opacity - Starting opacity (default: 0)
   * @example rotateIn() // Rotate in from -200 degrees
   * @example rotateIn({ rotate: -360 }) // Full rotation entrance
   * @example rotateIn({ rotate: 180 }) // Half rotation entrance
   * @example rotateIn({ duration: 1.5 }) // Slower rotation
   */
  public static rotateIn({ rotate = '-200deg', x = '0', y = '0', opacity = 0 } = {}): string {
    return `rotate:${rotate}:0;x:${x}:0;y:${y}:0;opacity:${opacity}:0;`;
  }

  /**
   * Flip in animation - element flips in on specified axis with multi-stage rotation.
   * @param axis - Rotation axis: 'x' or 'y' (default: 'x')
   * @param opacity - Starting opacity (default: 0)
   * @remarks The animation performs a multi-stage flip:
   * - Starts at 90 degrees
   * - Rotates to -20 degrees at 40% progress
   * - Rotates to 10 degrees at 60% progress (opacity becomes 1)
   * - Rotates to -5 degrees at 80% progress
   * - Ends at 0 degrees
   * @example flipIn() // Flip in on X-axis
   * @example flipIn({ axis: 'y' }) // Flip in on Y-axis
   * @example flipIn({ duration: 1 }) // Slower flip
   */
  public static flipIn({ axis = 'x', opacity = 0 } = {}): string {
    const rotateAxis = axis === 'x' ? 'rotateX' : 'rotateY';
    return `set:transformPerspective:400;${rotateAxis}:90:0;opacity:${opacity}:0;to:${rotateAxis}:-20:0.4;to:${rotateAxis}:10:0.6;to:opacity:1:0.6;to:${rotateAxis}:-5:0.8;to:${rotateAxis}:0`;
  }

  /**
   * Roll in animation with rotation and horizontal movement.
   * @param degrees - Rotation degrees (default: -120)
   * @param distance - Horizontal starting distance (default: '-100%')
   * @param opacity - Starting opacity (default: 0)
   * @example rollIn() // Roll in from left
   * @example rollIn({ distance: '100%', degrees: 120 }) // Roll in from right
   * @example rollIn({ degrees: -240 }) // Double roll
   */
  public static rollIn({ degrees = -120, distance = '-100%', opacity = 0 } = {}): string {
    return `rotate:${degrees}:0;x:${distance}:0;opacity:${opacity}:0;`;
  }

  /**
   * Light speed in animation with skew effect.
   * @param distance - Horizontal starting distance (default: '100%')
   * @param startSkew - Initial skew angle (default: -30)
   * @param midSkew - Mid skew angle at 80% progress (default: 5)
   * @param endSkew - Final skew angle (default: 0)
   * @param opacity - Starting opacity (default: 0)
   * @remarks The animation performs a skew transition:
   * - Starts with startSkew angle
   * - Transitions to midSkew at 80% progress (sign matches distance direction)
   * - Ends with endSkew angle
   * - If distance is negative (left), midSkew uses '-' sign
   * - If distance is positive (right), midSkew uses '+' sign
   * @example lightSpeedIn() // Fast entrance from right with positive skew
   * @example lightSpeedIn({ distance: '-100%', startSkew: 30, midSkew: 5, endSkew: 0 }) // From left with negative skew
   */
  public static lightSpeedIn({
    distance = '100%',
    startSkew = -30,
    midSkew = 5,
    endSkew = 0,
    opacity = 0,
  } = {}): string {
    const sign = distance.startsWith('-') ? '-' : '+';
    return `x:${distance}:0;skewX:${startSkew}:0;opacity:${opacity}:0;to:skewX:${sign}${midSkew}:<25%;to:skewX:${endSkew}`;
  }

  /**
   * Swing in animation with progressive rotation.
   * @param startRotate - Starting rotation (default: 15)
   * @param midRotate1 - First middle rotation (default: -15)
   * @param midRotate2 - Second middle rotation (default: 5)
   * @param endRotate - Ending rotation (default: 0)
   * @param opacity - Starting opacity (default: 0)
   * @example swingIn() // Standard swing entrance
   * @example swingIn({ startRotate: 20, midRotate1: -15 }) // Wider swing
   */
  public static swingIn({
    startRotate = 15,
    midRotate1 = -15,
    midRotate2 = 5,
    endRotate = 0,
    opacity = 0,
  } = {}): string {
    return `rotate:${startRotate}:0;opacity:${opacity}:0;to:rotate:${midRotate1}:<;to:rotate:${midRotate2}:>;to:rotate:${endRotate}:>`;
  }

  /**
   * Jack in the box animation - element pops out with rotation bounce.
   * @param startRotate - Initial rotation angle (default: 30)
   * @param scale - Initial scale (default: 0.1)
   * @param opacity - Initial opacity (default: 0)
   * @param midRotate - Middle rotation for bounce effect (default: -10)
   * @param endRotate - Final rotation before settling (default: 3)
   * @remarks Animation sequence:
   * - Starts rotated, scaled down, and transparent
   * - Rotates to midRotate for bounce effect
   * - Rotates to endRotate for settling
   * - Returns to 0 rotation
   * @example jackInTheBox() // Standard pop out
   * @example jackInTheBox({ scale: 0, startRotate: 45 }) // More dramatic entrance
   */
  public static jackInTheBox({
    scale = 0.1,
    opacity = 0,
    startRotate = 30,
    midRotate = -10,
    endRotate = 3,
  } = {}): string {
    return `rotate:${startRotate}:0;scale:${scale}:0;opacity:${opacity}:0;to:rotate:${midRotate}:>;to:rotate:${endRotate}:>;to:rotate:0:>`;
  }

  /**
   * Back in animation - element enters from a position with scale and opacity transition.
   * @param x - Horizontal starting position (default: '0')
   * @param y - Vertical starting position (default: '0')
   * @param scale - Initial scale (default: 0.7)
   * @param opacity - Initial opacity (default: 0.7)
   * @remarks Animation sequence:
   * - Sets initial scale and opacity
   * - Animates from x/y position to origin
   * - Scales to 1 and fades to full opacity simultaneously
   * @example backIn() // Standard back in from left
   * @example backIn({ y: '-100%', x: '0' }) // Back in from top
   * @example backIn({ scale: 0.5, opacity: 0 }) // Smaller start with fade in
   */
  public static backIn({ x = '0', y = '0', scale = 0.7, opacity = 0.7 } = {}): string {
    return `set:scale:${scale};set:opacity:${opacity};x:${x}:0;y:${y}:0;to:scale:1:>;to:opacity:1:<`;
  }

  /**
   * Big dramatic entrance - element appears with rotation from scaled and transparent state.
   * @param scale - Starting scale (default: 0)
   * @param rotate - Rotation degrees (default: 720)
   * @param opacity - Starting opacity (default: 0)
   * @remarks Animation sequence:
   * - Sets initial scale, rotation, and opacity simultaneously
   * - Animates to normal state (scale 1, rotate 0, opacity 1)
   * - Default performs two full rotations (720deg) while appearing
   * @example bigEntrance() // Dramatic double-spin entrance
   * @example bigEntrance({ rotate: 1080 }) // Triple spin entrance
   * @example bigEntrance({ scale: 0.5, opacity: 0.5 }) // Partial start state
   */
  public static bigEntrance({ scale = 0, rotate = 720, opacity = 0 } = {}): string {
    return `scale:${scale}:0;rotate:${rotate}:0;opacity:${opacity}:0`;
  }

  /**
   * Hatch animation - element emerges with rotation from scaled and transparent state.
   * @param scale - Starting scale (default: 0)
   * @param rotate - Starting rotation (default: -180)
   * @param opacity - Starting opacity (default: 0)
   * @remarks Animation sequence:
   * - Sets initial scale (sequenced), rotation, and opacity simultaneously
   * - Animates to normal state (scale 1, rotate 0, opacity 1)
   * - Default performs half rotation counter-clockwise (-180deg) while appearing
   * @example hatch() // Standard hatch with half rotation
   * @example hatch({ rotate: -360 }) // Full rotation hatch
   * @example hatch({ scale: 0.3, opacity: 0.3 }) // Partial start state
   */
  public static hatch({ scale = 0, rotate = -180, opacity = 0 } = {}): string {
    return `scale:${scale}:>;rotate:${rotate}:0;opacity:${opacity}:0;`;
  }
}
