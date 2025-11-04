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
   * - If scale > 0, uses the 'scale' property
   * - If x !== '0', uses the 'x' property
   * - Otherwise, uses the 'y' property
   * @example bounceIn() // Standard bounce in
   * @example bounceIn({ scale: 0.1 }) // Bounce from very small
   * @example bounceIn({ opacity: 0.5 }) // Bounce with partial fade
   * @example bounceIn({ duration: 1 }) // Slower bounce
   */
  public static bounceIn({ scale = 0.75, x = '0', y = '0', opacity = 0, duration = 1.5 } = {}): string {
    const property = scale > 0 ? { k: 'scale', v: scale } : x !== '0' ? { k: 'x', v: x } : { k: 'y', v: y };
    return `${property.k}:${property.v}:0@ease=bounce.out,duration=${duration};opacity:${opacity}:0`;
  }

  /**
   * Rotate in animation - element rotates in with fade.
   * @param rotate - Starting rotation in degrees (default: -200)
   * @param opacity - Starting opacity (default: 0)
   * @example rotateIn() // Rotate in from -200 degrees
   * @example rotateIn({ rotate: -360 }) // Full rotation entrance
   * @example rotateIn({ rotate: 180 }) // Half rotation entrance
   * @example rotateIn({ duration: 1.5 }) // Slower rotation
   */
  public static rotateIn({ rotate = -200, opacity = 0 } = {}): string {
    return `rotate:${rotate}:0;opacity:${opacity}:0;to:rotate:0;to:opacity:1`;
  }

  /**
   * Flip in animation - element flips in on specified axis with perspective.
   * @param axis - Rotation axis: 'x' or 'y' (default: 'x')
   * @param opacity - Starting opacity (default: 0)
   * @example flipIn() // Flip in on X-axis
   * @example flipIn({ axis: 'y' }) // Flip in on Y-axis
   * @example flipIn({ duration: 1 }) // Slower flip
   */
  public static flipIn({ axis = 'x', opacity = 0 } = {}): string {
    const rotateAxis = axis === 'x' ? 'rotateX' : 'rotateY';
    return `${rotateAxis}:90:0@ease=ease-in;opacity:${opacity}:0;to:${rotateAxis}:-20@position=0.4,ease=ease-in;to:${rotateAxis}:10@position=0.6;to:opacity:1@position=0.6;to:${rotateAxis}:-5@position=0.8;to:${rotateAxis}:0`;
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
    return `rotate:${degrees}:>;x:${distance}:0;opacity:${opacity}:0;to:rotate:0:>;to:x:0:0;to:opacity:1:0`;
  }

  /**
   * Light speed in animation with skew effect.
   * @param distance - Horizontal starting distance (default: '100%')
   * @param skew1 - Initial skew angle (default: -30)
   * @param skew2 - Mid skew angle (default: 20)
   * @param skew3 - Final skew angle (default: 0)
   * @param opacity - Starting opacity (default: 0)
   * @example lightSpeedIn() // Fast entrance from right
   * @example lightSpeedIn({ distance: '-100%', skew1: 30, skew2: -20, skew3: 5 }) // From left
   */
  public static lightSpeedIn({ distance = '100%', skew1 = -30, skew2 = 20, skew3 = 0, opacity = 0 } = {}): string {
    return `x:${distance}:>;skewX:${skew1}:0;opacity:${opacity}:0;to:skewX:${skew2}:>@ease=ease-out;to:opacity:1:0;to:skewX:${skew3}:>;to:x:0:>;to:skewX:0:0`;
  }

  /**
   * Swing in animation with progressive rotation.
   * @param start - Starting rotation (default: 15)
   * @param mid1 - First middle rotation (default: -15)
   * @param mid2 - Second middle rotation (default: 5)
   * @param end - Ending rotation (default: 0)
   * @example swingIn() // Standard swing entrance
   * @example swingIn({ start: 20, mid1: -15 }) // Wider swing
   */
  public static swingIn({ start = 15, mid1 = -15, mid2 = 5, end = 0 } = {}): string {
    return `rotate:${start}:>;to:rotate:${mid1}:>;to:rotate:${mid2}:>;to:rotate:${end}:>`;
  }

  /**
   * Zoom out animation with customizable scale and opacity.
   * @param scale - Ending scale (default: 0)
   * @param opacity - Ending opacity (default: 0)
   * @example zoomOut() // Zoom out to nothing
   * @example zoomOut({ scale: 0.5 }) // Zoom out to 50%
   * @example zoomOut({ scale: 0.3, duration: 2 }) // Slow zoom out
   */
  public static zoomOut({ scale = 0, opacity = 0 } = {}): string {
    return `to:scale:${scale}:>;to:opacity:${opacity}:0`;
  }

  /**
   * Flip out animation with customizable axis, rotation and opacity.
   * @param axis - Rotation axis: 'x', 'y', or 'z' (default: 'y')
   * @param degrees - Rotation degrees (default: 90)
   * @param opacity - Ending opacity (default: 0)
   * @example flipOut() // Standard Y-axis flip out
   * @example flipOut({ axis: 'x', degrees: 90 }) // X-axis flip out
   * @example flipOut({ degrees: 180 }) // Half flip out
   * @example flipOut({ degrees: -90 }) // Flip out reverse
   */
  public static flipOut({ axis = 'y', degrees = 90, opacity = 0 } = {}): string {
    const rotateAxis = axis === 'x' ? 'rotateX' : axis === 'z' ? 'rotateZ' : 'rotateY';
    return `to:${rotateAxis}:${degrees}:>;to:opacity:${opacity}:0`;
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
    return `to:rotate:${degrees}:>;to:x:${distance}:0;to:opacity:${opacity}:0`;
  }

  /**
   * Pulse animation that scales up and down with optional fade.
   * @param scale1 - Peak scale value (default: 1.05)
   * @param opacity - Starting opacity for fade effect (default: 1, no fade)
   * @example pulse() // Subtle pulse
   * @example pulse({ scale1: 1.1 }) // Stronger pulse
   * @example pulse({ opacity: 0 }) // Pulse with fade in
   * @example pulse({ duration: 0.5, repeat: 3 }) // Pulse 4 times
   */
  public static pulse({ scale1 = 1.05, opacity = 1 } = {}): string {
    const opacityAnim = opacity !== 1 ? `opacity:${opacity}:0;` : '';
    return `${opacityAnim}to:scale:${scale1}:>@ease=ease-in-out;to:scale:1:>@ease=ease-in-out`;
  }

  /**
   * Shake animation with horizontal and/or vertical movement.
   * @param x - Horizontal shake distance (default: '10px')
   * @param y - Vertical shake distance (default: '0')
   * @example shake() // Horizontal shake
   * @example shake({ x: '15px' }) // Stronger horizontal shake
   * @example shake({ y: '10px' }) // Vertical shake
   * @example shake({ x: '10px', y: '10px' }) // Diagonal shake
   */
  public static shake({ x = '10px', y = '0' } = {}): string {
    return `to:x:-${x}:>;to:y:-${y}:0;to:x:${x}:>;to:y:${y}:0;to:x:-${x}:>;to:y:-${y}:0;to:x:${x}:>;to:y:${y}:0;to:x:-${x}:>;to:y:-${y}:0;to:x:0:>;to:y:0:0`;
  }

  /**
   * Wobble animation with rotation and horizontal movement.
   * @param x1 - First horizontal position (default: '-25%')
   * @param rotate1 - First rotation angle (default: -5)
   * @param x2 - Second horizontal position (default: '20%')
   * @param rotate2 - Second rotation angle (default: 3)
   * @param x3 - Third horizontal position (default: '-15%')
   * @param rotate3 - Third rotation angle (default: -3)
   * @param x4 - Fourth horizontal position (default: '10%')
   * @param rotate4 - Fourth rotation angle (default: 2)
   * @param x5 - Fifth horizontal position (default: '-5%')
   * @param rotate5 - Fifth rotation angle (default: -1)
   * @example wobble() // Standard wobble
   * @example wobble({ x1: '-30%', x2: '25%' }) // Wider wobble
   */
  public static wobble({
    x1 = '-25%',
    rotate1 = -5,
    x2 = '20%',
    rotate2 = 3,
    x3 = '-15%',
    rotate3 = -3,
    x4 = '10%',
    rotate4 = 2,
    x5 = '-5%',
    rotate5 = -1,
  } = {}): string {
    return `to:x:${x1}:>;to:rotate:${rotate1}:0;to:x:${x2}:>;to:rotate:${rotate2}:0;to:x:${x3}:>;to:rotate:${rotate3}:0;to:x:${x4}:>;to:rotate:${rotate4}:0;to:x:${x5}:>;to:rotate:${rotate5}:0;to:x:0:>;to:rotate:0:0`;
  }

  /**
   * Jello animation with skew wobble effect.
   * @param skewX1 - First skew angle (default: -12.5)
   * @param skewY1 - First Y skew angle (default: -12.5)
   * @param skewX2 - Second skew angle (default: 6.25)
   * @param skewY2 - Second Y skew angle (default: 6.25)
   * @example jello() // Standard jello wobble
   * @example jello({ skewX1: -20, skewY1: -20 }) // More dramatic wobble
   */
  public static jello({ skewX1 = -12.5, skewY1 = -12.5, skewX2 = 6.25, skewY2 = 6.25 } = {}): string {
    return `to:skewX:${skewX1}:>;to:skewY:${skewY1}:0;to:skewX:${skewX2}:>;to:skewY:${skewY2}:0;to:skewX:${
      -skewX2 / 2
    }:>;to:skewY:${-skewY2 / 2}:0;to:skewX:${skewX2 / 4}:>;to:skewY:${skewY2 / 4}:0;to:skewX:0:>;to:skewY:0:0`;
  }

  /**
   * Heart beat animation with pulsing scale.
   * @param scale1 - Enlarged scale (default: 1.3)
   * @example heartBeat() // Standard heart beat
   * @example heartBeat({ scale1: 1.5 }) // Stronger beat
   */
  public static heartBeat({ scale1 = 1.3 } = {}): string {
    return `to:scale:${scale1}:>@ease=ease-in-out;to:scale:1:>@ease=ease-in-out;to:scale:${scale1}:>@ease=ease-in-out;to:scale:1:>@ease=ease-in-out`;
  }

  /**
   * Hinge animation - element falls and rotates like a door hinge.
   * @param rotate1 - First rotation (default: 80)
   * @param rotate2 - Second rotation (default: 60)
   * @param distance - Fall distance (default: '100%')
   * @param opacity - Ending opacity (default: 0)
   * @example hinge() // Standard hinge fall
   * @example hinge({ rotate1: 90, distance: '150%' }) // Longer fall
   */
  public static hinge({ rotate1 = 80, rotate2 = 60, distance = '100%', opacity = 0 } = {}): string {
    return `to:rotate:${rotate1}:>;to:rotate:${rotate2}:>;to:y:${distance}:>;to:opacity:${opacity}:0`;
  }

  /**
   * Jack in the box animation - pops out with rotation.
   * @param rotate1 - Starting rotation (default: 30)
   * @param scale - Starting scale (default: 0.1)
   * @param opacity - Starting opacity (default: 0)
   * @param rotate2 - Middle rotation (default: -10)
   * @param rotate3 - Final rotation adjustment (default: 3)
   * @example jackInTheBox() // Standard pop out
   * @example jackInTheBox({ scale: 0, rotate1: 45 }) // More dramatic
   */
  public static jackInTheBox({ rotate1 = 30, scale = 0.1, opacity = 0, rotate2 = -10, rotate3 = 3 } = {}): string {
    return `rotate:${rotate1}:>;scale:${scale}:0;opacity:${opacity}:0;to:rotate:${rotate2}:>;to:rotate:${rotate3}:>;to:rotate:0:>`;
  }

  /**
   * Back in animation with overshoot effect.
   * @param x - Horizontal starting position (default: '0')
   * @param y - Vertical starting position (default: '0')
   * @param scale1 - Starting scale (default: 0)
   * @param opacity - Starting opacity (default: 0)
   * @param scale2 - Overshoot scale (default: 1.1)
   * @param scale3 - Final scale (default: 1)
   * @example backIn() // Standard back in
   * @example backIn({ y: '-100%' }) // Back in from top
   * @example backIn({ scale2: 1.2 }) // More overshoot
   */
  public static backIn({ x = '0', y = '0', startScale = 0, midScale = 1.3, endScale = 1, opacity = 0 } = {}): string {
    return `x:${x}:>;y:${y}:0;scale:${startScale}:0;opacity:${opacity}:0;to:scale:${midScale}:>;to:scale:${endScale}:>`;
  }

  /**
   * Back out animation with overshoot effect.
   * @param scale1 - Overshoot scale (default: 1.1)
   * @param scale2 - Ending scale (default: 0.7)
   * @param opacity - Ending opacity (default: 0)
   * @example backOut() // Standard back out
   * @example backOut({ scale1: 1.2 }) // More overshoot
   * @example backOut({ duration: 0.8 }) // Slower exit
   */
  public static backOut({ scale1 = 1.1, scale2 = 0.7, opacity = 0 } = {}): string {
    return `to:scale:${scale1}:>;to:scale:${scale2}:>;to:opacity:${opacity}:0`;
  }

  /**
   * Flash animation with opacity pulsing.
   * @example flash() // Standard flash (4 pulses)
   * @example flash({ duration: 0.5, repeat: 2 }) // Rapid flashing
   */
  public static flash(): string {
    return `to:opacity:0:>;to:opacity:1:>;to:opacity:0:>;to:opacity:1:>`;
  }

  /**
   * Slide out animation with customizable direction, rotation, and opacity.
   * @param x - Horizontal ending position (default: '0')
   * @param y - Vertical ending position (default: '0')
   * @param rotate - Ending rotation in degrees (default: 0)
   * @param opacity - Ending opacity (default: 1)
   * @example slideOut({ x: '-100%' }) // Slide out to left
   * @example slideOut({ y: '100%' }) // Slide out to bottom
   * @example slideOut({ x: '100%', y: '-100%' }) // Slide out to top-right
   * @example slideOut({ x: '100%', rotate: 180 }) // Slide with rotation
   */
  public static slideOut({ x = '0', y = '0', rotate = 0, opacity = 1 } = {}): string {
    const rotateAnim = rotate !== 0 ? `;to:rotate:${rotate}:0` : '';
    const opacityAnim = opacity !== 1 ? `;to:opacity:${opacity}:0` : '';
    return `to:x:${x}:>;to:y:${y}:0${rotateAnim}${opacityAnim}`;
  }

  /**
   * Rotate out animation with fade.
   * @param degrees - Rotation degrees (default: 200)
   * @param opacity - Ending opacity (default: 0)
   * @example rotateOut() // Standard rotate out
   * @example rotateOut({ degrees: 360 }) // Full rotation out
   * @example rotateOut({ degrees: -180 }) // Reverse rotation
   */
  public static rotateOut({ degrees = 200, opacity = 0 } = {}): string {
    return `to:rotate:${degrees}:>;to:opacity:${opacity}:0`;
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
  public static bounceOut({ scale1 = 1.1, scale2 = 0, opacity = 0 } = {}): string {
    return `to:scale:${scale1}:>;to:scale:${scale2}:>;to:opacity:${opacity}:0`;
  }

  /**
   * Light speed out animation with skew effect.
   * @param distance - Horizontal ending distance (default: '100%')
   * @param skew - Skew angle on X-axis (default: 30)
   * @param opacity - Ending opacity (default: 0)
   * @example lightSpeedOut() // Fast exit to right
   * @example lightSpeedOut({ distance: '-100%', skew: -30 }) // To left
   * @example lightSpeedOut({ duration: 0.2 }) // Ultra fast exit
   */
  public static lightSpeedOut({ distance = '100%', skew = 30, opacity = 0 } = {}): string {
    return `to:x:${distance}:>;to:skewX:${skew}:0;to:opacity:${opacity}:0`;
  }

  /**
   * Bounce animation with decreasing movement (vertical or horizontal).
   * @param x1 - First horizontal bounce distance (default: '0')
   * @param y1 - First vertical bounce height (default: '-30px')
   * @param x2 - Second horizontal bounce distance (default: '0')
   * @param y2 - Second vertical bounce height (default: '-15px')
   * @param x3 - Third horizontal bounce distance (default: '0')
   * @param y3 - Third vertical bounce height (default: '-4px')
   * @example bounce() // Standard vertical bounce
   * @example bounce({ y1: '-40px' }) // Higher bounce
   * @example bounce({ x1: '20px', y1: '0' }) // Horizontal bounce
   * @example bounce({ x1: '20px', y1: '-20px' }) // Diagonal bounce
   */
  public static bounce({ x1 = '0', y1 = '-30px', x2 = '0', y2 = '-15px', x3 = '0', y3 = '-4px' } = {}): string {
    const hasX = x1 !== '0' || x2 !== '0' || x3 !== '0';
    if (hasX) {
      return `to:x:${x1}:>;to:y:${y1}:0;to:x:0:>;to:y:0:0;to:x:${x2}:>;to:y:${y2}:0;to:x:0:>;to:y:0:0;to:x:${x3}:>;to:y:${y3}:0;to:x:0:>;to:y:0:0`;
    }
    return `to:y:${y1}:>;to:y:0:>;to:y:${y2}:>;to:y:0:>;to:y:${y3}:>;to:y:0:>`;
  }

  /**
   * Tada animation with scale and rotation for celebration effect.
   * @param scale1 - First scale value (default: 0.9)
   * @param scale2 - Second scale value (default: 1.1)
   * @param rotate1 - First rotation angle (default: -3)
   * @param rotate2 - Second rotation angle (default: 3)
   * @example tada() // Standard celebration
   * @example tada({ scale2: 1.2, rotate2: 5 }) // More dramatic
   */
  public static tada({ scale1 = 0.9, scale2 = 1.1, rotate1 = -3, rotate2 = 3 } = {}): string {
    return `to:scale:${scale1}:>;to:rotate:${rotate1}:0;to:scale:${scale1}:>;to:rotate:${rotate1}:0;to:scale:${scale2}:>;to:rotate:${rotate2}:0;to:scale:${scale2}:>;to:rotate:${rotate1}:0;to:scale:${scale2}:>;to:rotate:${rotate2}:0;to:scale:${scale2}:>;to:rotate:${rotate1}:0;to:scale:${scale2}:>;to:rotate:${rotate2}:0;to:scale:${scale2}:>;to:rotate:${rotate1}:0;to:scale:${scale2}:>;to:rotate:${rotate2}:0;to:scale:1:>;to:rotate:0:0`;
  }

  /**
   * Swing animation - pendulum-like rotation.
   * @param rotate1 - First rotation angle (default: 15)
   * @param rotate2 - Second rotation angle (default: -10)
   * @param rotate3 - Third rotation angle (default: 5)
   * @param rotate4 - Fourth rotation angle (default: -5)
   * @example swing() // Standard pendulum swing
   * @example swing({ rotate1: 20, rotate2: -15 }) // Wider swing
   */
  public static swing({ rotate1 = 15, rotate2 = -10, rotate3 = 5, rotate4 = -5 } = {}): string {
    return `to:rotate:${rotate1}:>;to:rotate:${rotate2}:>;to:rotate:${rotate3}:>;to:rotate:${rotate4}:>;to:rotate:0:>`;
  }

  /**
   * Head shake animation - horizontal shake with rotation.
   * @param x1 - First horizontal position (default: '-6px')
   * @param rotateY1 - First Y rotation (default: -9)
   * @param x2 - Second horizontal position (default: '5px')
   * @param rotateY2 - Second Y rotation (default: 7)
   * @param x3 - Third horizontal position (default: '-3px')
   * @param rotateY3 - Third Y rotation (default: -5)
   * @param x4 - Fourth horizontal position (default: '2px')
   * @param rotateY4 - Fourth Y rotation (default: 3)
   * @example headShake() // Standard head shake (no gesture)
   * @example headShake({ x1: '-10px', rotateY1: -12 }) // Stronger shake
   */
  public static headShake({
    x1 = '-6px',
    rotateY1 = -9,
    x2 = '5px',
    rotateY2 = 7,
    x3 = '-3px',
    rotateY3 = -5,
    x4 = '2px',
    rotateY4 = 3,
  } = {}): string {
    return `to:x:${x1}:>@ease=ease-in-out;to:rotateY:${rotateY1}:0;to:x:${x2}:>;to:rotateY:${rotateY2}:0;to:x:${x3}:>;to:rotateY:${rotateY3}:0;to:x:${x4}:>;to:rotateY:${rotateY4}:0;to:x:0:>;to:rotateY:0:0`;
  }

  /**
   * Rubber band animation with alternating X and Y scale.
   * @param scaleX1 - First X scale (default: 1.25)
   * @param scaleY1 - First Y scale (default: 0.75)
   * @param scaleX2 - Second X scale (default: 0.75)
   * @param scaleY2 - Second Y scale (default: 1.25)
   * @param scaleX3 - Third X scale (default: 1.15)
   * @param scaleY3 - Third Y scale (default: 0.85)
   * @param scaleX4 - Fourth X scale (default: 0.95)
   * @param scaleY4 - Fourth Y scale (default: 1.05)
   * @param scaleX5 - Fifth X scale (default: 1.05)
   * @param scaleY5 - Fifth Y scale (default: 0.95)
   * @example rubberBand() // Standard rubber band
   * @example rubberBand({ scaleX1: 1.5, scaleY1: 0.5 }) // More elastic
   */
  public static rubberBand({
    scaleX1 = 1.25,
    scaleY1 = 0.75,
    scaleX2 = 0.75,
    scaleY2 = 1.25,
    scaleX3 = 1.15,
    scaleY3 = 0.85,
    scaleX4 = 0.95,
    scaleY4 = 1.05,
    scaleX5 = 1.05,
    scaleY5 = 0.95,
  } = {}): string {
    return `to:scaleX:${scaleX1}:>;to:scaleY:${scaleY1}:0;to:scaleX:${scaleX2}:>;to:scaleY:${scaleY2}:0;to:scaleX:${scaleX3}:>;to:scaleY:${scaleY3}:0;to:scaleX:${scaleX4}:>;to:scaleY:${scaleY4}:0;to:scaleX:${scaleX5}:>;to:scaleY:${scaleY5}:0;to:scaleX:1:>;to:scaleY:1:0`;
  }

  /**
   * Flip animation with customizable axis.
   * @param axis - Rotation axis: 'x', 'y', or 'z' (default: 'y')
   * @param rotate1 - First rotation angle (default: 180)
   * @param rotate2 - Second rotation angle (default: 360)
   * @example flip() // Standard Y-axis flip
   * @example flip({ axis: 'x' }) // X-axis flip
   * @example flip({ rotate1: 90, rotate2: 180 }) // Half flip
   * @example flip({ rotate2: 720, duration: 2 }) // Double flip slowly
   */
  public static flip({ axis = 'y', rotate1 = 180, rotate2 = 360 } = {}): string {
    const rotateAxis = axis === 'x' ? 'rotateX' : axis === 'z' ? 'rotateZ' : 'rotateY';
    return `to:${rotateAxis}:${rotate1}:>;to:${rotateAxis}:${rotate2}:>`;
  }

  /**
   * Spin animation with Z-axis rotation.
   * @param degrees - Rotation degrees (default: 360)
   * @example spin() // One full rotation
   * @example spin({ degrees: 720 }) // Two rotations
   * @example spin({ degrees: 180 }) // Half rotation
   * @example spin({ degrees: -360 }) // Reverse rotation
   */
  public static spin({ degrees = 360 } = {}): string {
    return `to:rotate:${degrees}:>`;
  }

  /**
   * Blur animation with opacity fade.
   * @param blur1 - Starting blur amount (default: '10px')
   * @param blur2 - Ending blur amount (default: '0px')
   * @param opacity - Starting opacity (default: 0)
   * @example blur() // Blur to focus
   * @example blur({ blur1: '20px' }) // Stronger blur start
   * @example blur({ blur2: '5px' }) // End with slight blur
   */
  public static blur({ blur1 = '10px', blur2 = '0px', opacity = 0 } = {}): string {
    return `filter:blur(${blur1}):>;opacity:${opacity}:0;to:filter:blur(${blur2}):>`;
  }

  /**
   * Ken Burns effect - slow zoom and pan, perfect for images.
   * @param scale - Ending scale (default: 1.2)
   * @param x - Horizontal pan distance (default: '10%')
   * @param y - Vertical pan distance (default: '10%')
   * @example kenBurns() // Standard Ken Burns
   * @example kenBurns({ scale: 1.3, duration: 5 }) // Slower, more dramatic
   * @example kenBurns({ x: '-10%', y: '-10%' }) // Pan opposite direction
   */
  public static kenBurns({ scale = 1.2, x = '10%', y = '10%' } = {}): string {
    return `to:scale:${scale}:>;to:x:${x}:0;to:y:${y}:0`;
  }

  /**
   * Morphing animation with scale and rotation changes.
   * @param scale1 - First scale (default: 1.2)
   * @param rotate - Rotation degrees (default: 45)
   * @param scale2 - Second scale (default: 0.8)
   * @example morphing() // Standard morph
   * @example morphing({ scale1: 1.5, rotate: 90 }) // Dramatic morph
   * @example morphing({ duration: 2 }) // Slow transformation
   */
  public static morphing({ scale1 = 1.2, rotate = 45, scale2 = 0.8 } = {}): string {
    return `to:scale:${scale1}:>;to:rotate:${rotate}:0;to:scale:${scale2}:>;to:rotate:0:0;to:scale:1:>`;
  }

  /**
   * Jump animation with vertical bouncing.
   * @param y1 - First jump height (default: '-30px')
   * @param y2 - Second jump height (default: '-15px')
   * @example jump() // Standard jump
   * @example jump({ y1: '-50px' }) // Higher jump
   * @example jump({ duration: 0.5, repeat: 2 }) // Quick repeated jumps
   */
  public static jump({ y1 = '-30px', y2 = '-15px' } = {}): string {
    return `to:y:${y1}:>;to:y:0:>;to:y:${y2}:>;to:y:0:>`;
  }

  /**
   * Hang animation - element hangs and returns.
   * @param y - Hang distance (default: '-20px')
   * @example hang() // Standard hang
   * @example hang({ y: '-30px' }) // Hang higher
   * @example hang({ duration: 1, ease: 'elastic.out' }) // Elastic hang
   */
  public static hang({ y = '-20px' } = {}): string {
    return `to:y:${y}:>;to:y:0:>`;
  }

  /**
   * Float animation - gentle up and down movement.
   * @param y1 - First float position (default: '-20px')
   * @param y2 - Second float position (default: '-10px')
   * @example float() // Standard float
   * @example float({ y1: '-30px', y2: '-15px' }) // Wider float
   * @example float({ duration: 2, repeat: -1 }) // Continuous floating
   */
  public static float({ y1 = '-20px', y2 = '-10px' } = {}): string {
    return `to:y:${y1}:>;to:y:${y2}:>;to:y:${y1}:>;to:y:${y2}:>`;
  }

  /**
   * Sink animation - element sinks down.
   * @param y - Sink distance (default: '20px')
   * @example sink() // Standard sink
   * @example sink({ y: '50px' }) // Sink deeper
   * @example sink({ duration: 1.5 }) // Slow sink
   */
  public static sink({ y = '20px' } = {}): string {
    return `to:y:${y}:>`;
  }

  /**
   * Pop animation - quick scale up with overshoot.
   * @param scale1 - Starting scale (default: 0)
   * @param scale2 - Overshoot scale (default: 1.1)
   * @param scale3 - Final scale (default: 1)
   * @example pop() // Standard pop
   * @example pop({ scale2: 1.3 }) // Bigger pop
   * @example pop({ duration: 0.3 }) // Quick pop
   */
  public static pop({ scale1 = 0, scale2 = 1.1, scale3 = 1 } = {}): string {
    return `scale:${scale1}:>;to:scale:${scale2}:>;to:scale:${scale3}:>`;
  }

  /**
   * Blink animation - rapid opacity flashing.
   * @param opacity1 - First opacity (default: 0)
   * @param opacity2 - Second opacity (default: 1)
   * @example blink() // Standard blink
   * @example blink({ opacity1: 0.3 }) // Subtle blink
   * @example blink({ duration: 0.5, repeat: -1 }) // Continuous blinking
   */
  public static blink({ opacity1 = 0, opacity2 = 1 } = {}): string {
    return `to:opacity:${opacity1}:>;to:opacity:${opacity2}:>;to:opacity:${opacity1}:>;to:opacity:${opacity2}:>;to:opacity:${opacity1}:>;to:opacity:${opacity2}:>`;
  }

  /**
   * Skew animation on both axes.
   * @param skewX - X-axis skew angle (default: -10)
   * @param skewY - Y-axis skew angle (default: -10)
   * @example skew() // Standard skew
   * @example skew({ skewX: -20, skewY: -20 }) // Stronger skew
   * @example skew({ skewX: 15, skewY: -15 }) // Opposite skew
   */
  public static skew({ skewX = -10, skewY = -10 } = {}): string {
    return `to:skewX:${skewX}:>;to:skewY:${skewY}:0;to:skewX:0:>;to:skewY:0:0`;
  }

  /**
   * Squeeze animation - alternating horizontal and vertical compression.
   * @param scaleX1 - First X scale (default: 1.3)
   * @param scaleY1 - First Y scale (default: 0.7)
   * @param scaleX2 - Second X scale (default: 0.7)
   * @param scaleY2 - Second Y scale (default: 1.3)
   * @example squeeze() // Standard squeeze
   * @example squeeze({ scaleX1: 1.5, scaleY1: 0.5 }) // Stronger squeeze
   */
  public static squeeze({ scaleX1 = 1.3, scaleY1 = 0.7, scaleX2 = 0.7, scaleY2 = 1.3 } = {}): string {
    return `to:scaleX:${scaleX1}:>;to:scaleY:${scaleY1}:0;to:scaleX:${scaleX2}:>;to:scaleY:${scaleY2}:0;to:scaleX:1:>;to:scaleY:1:0`;
  }

  /**
   * Expand animation - scale up on both axes.
   * @param scaleX - X-axis scale (default: 1)
   * @param scaleY - Y-axis scale (default: 1)
   * @example expand({ scaleX: 1.5, scaleY: 1.5 }) // Expand to 150%
   * @example expand({ scaleX: 2, scaleY: 1 }) // Horizontal expand only
   * @example expand({ scaleX: 1.2, scaleY: 1.2, duration: 2 }) // Slow expand
   */
  public static expand({ scaleX = 1, scaleY = 1 } = {}): string {
    return `to:scaleX:${scaleX}:>;to:scaleY:${scaleY}:0`;
  }

  /**
   * Rotational wave animation - continuous rotation back and forth.
   * @param rotate1 - First rotation (default: 15)
   * @param rotate2 - Second rotation (default: -15)
   * @example rotationalWave() // Standard wave
   * @example rotationalWave({ rotate1: 30, rotate2: -30 }) // Wider wave
   * @example rotationalWave({ duration: 2, repeat: -1 }) // Continuous wave
   */
  public static rotationalWave({ rotate1 = 15, rotate2 = -15 } = {}): string {
    return `to:rotate:${rotate1}:>;to:rotate:${rotate2}:>;to:rotate:${rotate1}:>;to:rotate:${rotate2}:>;to:rotate:0:>`;
  }

  /**
   * Impulse rotation animation.
   * @param direction - Rotation direction: 'left' or 'right' (default: 'right')
   * @param rotate1 - First rotation (default: auto based on direction)
   * @param rotate2 - Second rotation (default: auto based on direction)
   * @example impulseRotation() // Standard right impulse
   * @example impulseRotation({ direction: 'left' }) // Left impulse
   * @example impulseRotation({ rotate1: 15 }) // Stronger impulse
   */
  public static impulseRotation({
    direction = 'right',
    rotate1,
    rotate2,
  }: { direction?: 'left' | 'right'; rotate1?: number; rotate2?: number } = {}): string {
    const defaultRotate1 = direction === 'right' ? 10 : -10;
    const defaultRotate2 = direction === 'right' ? -5 : 5;
    const finalRotate1 = rotate1 !== undefined ? rotate1 : defaultRotate1;
    const finalRotate2 = rotate2 !== undefined ? rotate2 : defaultRotate2;
    return `to:rotate:${finalRotate1}:>;to:rotate:${finalRotate2}:>;to:rotate:0:>`;
  }

  /**
   * Dancing animation - rotation with vertical movement.
   * @param rotate1 - First rotation (default: -15)
   * @param rotate2 - Second rotation (default: 15)
   * @param y1 - First vertical position (default: '-10px')
   * @param y2 - Second vertical position (default: '10px')
   * @example dancing() // Standard dance
   * @example dancing({ rotate1: -30, rotate2: 30 }) // More energetic dance
   */
  public static dancing({ rotate1 = -15, rotate2 = 15, y1 = '-10px', y2 = '10px' } = {}): string {
    return `to:rotate:${rotate1}:>;to:y:${y1}:0;to:rotate:${rotate2}:>;to:y:${y2}:0;to:rotate:${rotate1}:>;to:y:${y1}:0;to:rotate:0:>;to:y:0:0`;
  }

  /**
   * Big dramatic entrance with rotation.
   * @param scale - Starting scale (default: 0)
   * @param rotate - Rotation degrees (default: 720)
   * @param opacity - Starting opacity (default: 0)
   * @example bigEntrance() // Dramatic spinning entrance
   * @example bigEntrance({ rotate: 1080 }) // Triple spin
   */
  public static bigEntrance({ scale = 0, rotate = 720, opacity = 0 } = {}): string {
    return `scale:${scale}:>;rotate:${rotate}:>;opacity:${opacity}:0`;
  }

  /**
   * Hatch animation - emerge with rotation.
   * @param scale - Starting scale (default: 0)
   * @param rotate - Starting rotation (default: -180)
   * @param opacity - Starting opacity (default: 0)
   * @example hatch() // Standard hatch
   * @example hatch({ rotate: -360 }) // Full rotation hatch
   */
  public static hatch({ scale = 0, rotate = -180, opacity = 0 } = {}): string {
    return `scale:${scale}:>;rotate:${rotate}:0;opacity:${opacity}:0;to:rotate:0:>`;
  }

  /**
   * Tossing animation - rotation with vertical movement.
   * @param rotate1 - First rotation (default: -10)
   * @param rotate2 - Second rotation (default: 10)
   * @param y1 - First vertical position (default: '-5px')
   * @param y2 - Second vertical position (default: '5px')
   * @example tossing() // Standard toss
   * @example tossing({ rotate1: -20, y1: '-10px' }) // Stronger toss
   */
  public static tossing({ rotate1 = -10, rotate2 = 10, y1 = '-5px', y2 = '5px' } = {}): string {
    return `to:rotate:${rotate1}:>;to:y:${y1}:0;to:rotate:${rotate2}:>;to:y:${y2}:0;to:rotate:${rotate1}:>;to:y:${y1}:0;to:rotate:0:>;to:y:0:0`;
  }

  /**
   * Pull up animation - quick upward movement.
   * @param y - Pull distance (default: '20px')
   * @example pullUp() // Standard pull up
   * @example pullUp({ y: '30px' }) // Stronger pull
   */
  public static pullUp({ y = '20px' } = {}): string {
    return `to:y:-${y}:>;to:y:0:>`;
  }

  /**
   * Pull down animation - quick downward movement.
   * @param y - Pull distance (default: '20px')
   * @example pullDown() // Standard pull down
   * @example pullDown({ y: '30px' }) // Stronger pull
   */
  public static pullDown({ y = '20px' } = {}): string {
    return `to:y:${y}:>;to:y:0:>`;
  }

  /**
   * Glow effect animation.
   * @param boxShadow - Glow shadow (default: '0 0 20px rgba(255, 255, 255, 0.8)')
   * @example glow() // Standard white glow
   * @example glow({ boxShadow: '0 0 30px rgba(0, 255, 255, 1)' }) // Cyan glow
   */
  public static glow({ boxShadow = '0 0 20px rgba(255, 255, 255, 0.8)' } = {}): string {
    return `to:boxShadow:${boxShadow}:>`;
  }

  /**
   * Shadow effect animation.
   * @param boxShadow - Shadow (default: '0 10px 20px rgba(0, 0, 0, 0.3)')
   * @example shadow() // Standard shadow
   * @example shadow({ boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5)' }) // Darker shadow
   */
  public static shadow({ boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)' } = {}): string {
    return `to:boxShadow:${boxShadow}:>`;
  }

  /**
   * Grow with shadow effect.
   * @param scale - Ending scale (default: 1.1)
   * @param boxShadow - Shadow (default: '0 10px 30px rgba(0, 0, 0, 0.4)')
   * @example growShadow() // Grow with shadow
   * @example growShadow({ scale: 1.2 }) // Grow more
   */
  public static growShadow({ scale = 1.1, boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)' } = {}): string {
    return `to:scale:${scale}:>;to:boxShadow:${boxShadow}:0`;
  }

  /**
   * Float with shadow effect.
   * @param y - Float distance (default: '-10px')
   * @param boxShadow - Shadow (default: '0 15px 30px rgba(0, 0, 0, 0.3)')
   * @example floatShadow() // Float with shadow
   * @example floatShadow({ y: '-20px' }) // Float higher
   */
  public static floatShadow({ y = '-10px', boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)' } = {}): string {
    return `to:y:${y}:>;to:boxShadow:${boxShadow}:0`;
  }

  /**
   * Buzz animation - rapid horizontal vibration.
   * @param x - Vibration distance (default: '3px')
   * @example buzz() // Standard buzz
   * @example buzz({ x: '5px' }) // Stronger buzz
   * @example buzz({ duration: 0.3 }) // Quick buzz
   */
  public static buzz({ x = '3px' } = {}): string {
    return `to:x:-${x}:>;to:x:${x}:>;to:x:-${x}:>;to:x:${x}:>;to:x:-${x}:>;to:x:${x}:>;to:x:-${x}:>;to:x:${x}:>;to:x:0:>`;
  }
}
