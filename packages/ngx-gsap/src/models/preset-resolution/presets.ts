export type Preset = (params?: Record<string, unknown>) => string;

export class Presets {
  public static eval(presetName: string, argsString = ''): string {
    return new Function('Presets', `return Presets.${presetName}(${argsString})`)(Presets);
  }

  /**
   * Fade in animation - element fades from transparent to opaque.
   * @param x - Horizontal starting position (default: '0')
   * @param y - Vertical starting position (default: '0')
   * @param opacity - Starting opacity (default: 0)
   * @example fadeIn() // Simple fade in
   * @example fadeIn({ opacity: 0.5 }) // Fade in from 50% opacity
   * @example fadeIn({ x: '0', y: '100%' }) // Fade in from bottom
   * @example fadeIn({ x: '100%', y: '0' }) // Fade in from right
   * @example fadeIn({ duration: 2, ease: 'power2.out' }) // With custom GSAP props
   */
  public static fadeIn({ x = '0', y = '0', opacity = 0 } = {}): string {
    return `x:${x}:0;y:${y}:0;opacity:${opacity}:<`;
  }

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
   * @param x - Horizontal starting position (default: '0')
   * @param y - Vertical starting position (default: '0')
   * @example slideIn() // Slide in from left
   * @example slideIn({ x: '100%' }) // Slide in from right
   * @example slideIn({ y: '100%' }) // Slide in from up
   * @example slideIn({ x: '-100%', y: '-100%' }) // Slide in from down/left
   */
  public static slideIn({ x = '0', y = '0' } = {}): string {
    return `x:${x}:0;y:${y}:0`;
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
   * - Transitions to midSkew at 80% progress (operator matches distance direction)
   * - Ends with endSkew angle
   * - If distance is negative (left), midSkew uses '-' operator
   * - If distance is positive (right), midSkew uses '+' operator
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
    const operator = distance.startsWith('-') ? '-' : '+';
    return `x:${distance}:0;skewX:${startSkew}:0;opacity:${opacity}:0;to:skewX:${operator}${midSkew}:<25%;to:skewX:${endSkew}`;
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
   * Flip out animation - element flips out on specified axis with perspective.
   * @param axis - Rotation axis: 'x' or 'y' (default: 'x')
   * @param opacity - Ending opacity (default: 0)
   * @remarks The animation performs a two-stage flip with perspective:
   * - Uses perspective of 400px
   * - Rotates to -5 degrees
   * - Rotates to 90 degrees (fully flipped out)
   * - Opacity fades at 20% progress
   * @example flipOut() // Flip out on X-axis
   * @example flipOut({ axis: 'y' }) // Flip out on Y-axis
   * @example flipOut({ duration: 1 }) // Slower flip
   */
  public static flipOut({ axis = 'x', opacity = 0 } = {}): string {
    const rotateAxis = axis === 'x' ? 'rotateX' : 'rotateY';
    return `set:transformPerspective:400;to:${rotateAxis}:-5;to:${rotateAxis}:90;to:opacity:${opacity}:<20%`;
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
   * Slide out animation - element moves to a position.
   * @param x - Horizontal ending position (default: '0')
   * @param y - Vertical ending position (default: '0')
   * @remarks Animation sequence:
   * - Animates x and y simultaneously to target position
   * - Use negative values to slide left/up, positive for right/down
   * @example slideOut({ x: '-100%' }) // Slide out to left
   * @example slideOut({ y: '100%' }) // Slide out to bottom
   * @example slideOut({ x: '100%', y: '-100%' }) // Slide out to top-right
   */
  public static slideOut({ x = '0', y = '0' } = {}): string {
    return `to:x:${x}:0;to:y:${y}:0`;
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
   * Bounce out animation with scale.
   * @param scale1 - Bounce scale (default: 1.1)
   * @param scale2 - Ending scale (default: 0)
   * @param opacity - Ending opacity (default: 0)
   * @example bounceOut() // Standard bounce out
   * @example bounceOut({ scale1: 1.2 }) // Bigger bounce
   * @example bounceOut({ scale2: 0.5 }) // Partial shrink
   */
  public static bounceOut({ scale = 0.75, x = '0', y = '0', opacity = 0, duration = 1.5 } = {}): string {
    const property = x !== '0' ? { k: 'x', v: x } : y !== '0' ? { k: 'y', v: y } : { k: 'scale', v: scale };
    return `to:${property.k}:${property.v}:0@duration=${duration};to:${property.k}:${property.v}:0@duration=${duration};to:${property.k}:0;to:opacity:${opacity}:<10%;`;
  }

  /**
   * Light speed out animation with skew effect.
   * @param distance - Horizontal ending distance (default: '100%')
   * @param skew - Skew angle on X-axis (default: 30)
   * @param opacity - Ending opacity (default: 0)
   * @remarks Animation sequence:
   * - Moves to distance position
   * - Applies skew with operator matching distance direction
   * - If distance is negative (left), skew uses '-' operator
   * - If distance is positive (right), skew has no operator
   * - Fades out simultaneously
   * @example lightSpeedOut() // Fast exit to right with positive skew
   * @example lightSpeedOut({ distance: '-100%', skew: 30 }) // Exit to left with negative skew
   */
  public static lightSpeedOut({ distance = '100%', skew = 30, opacity = 0 } = {}): string {
    const operator = distance.startsWith('-') ? '-' : '';
    return `to:x:${distance}:>;to:skewX:${operator}${skew}:0;to:opacity:${opacity}:0`;
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
