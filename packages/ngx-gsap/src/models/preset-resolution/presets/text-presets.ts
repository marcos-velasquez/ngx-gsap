export class TextPresets {
  /**
   * Screen reader animation - words fade in sequentially with stagger.
   * Uses SplitText to animate words individually.
   * @param opacity - Starting opacity (default: 0)
   * @param stagger - Delay between each word (default: 0.1)
   * @example screenReader() // Default screen reader effect
   * @example screenReader({ stagger: 0.2 }) // Slower stagger
   * @example screenReader({ opacity: 0.5, stagger: 0.05 }) // Faster animation
   */
  public static screenReader({ opacity = 0, stagger = 0.1 } = {}): string {
    return `set:perspective:500;set:opacity:${opacity};to:opacity:1@ease=sine.out,stagger=${stagger};splitText@type="words",target="words"`;
  }

  /**
   * Slide reveal animation - characters slide in with fade and stagger.
   * Uses SplitText to animate characters individually from a specified direction.
   * @param axis - Animation axis: 'x' for horizontal, 'y' for vertical (default: 'x')
   * @param distance - Starting distance in pixels (default: '0')
   * @param stagger - Delay between each character (default: 0.04)
   * @param duration - Animation duration (default: 0.7)
   * @example slideReveal({ axis: 'x', distance: '150' }) // Slide from right
   * @example slideReveal({ axis: 'x', distance: '-150' }) // Slide from left
   * @example slideReveal({ axis: 'y', distance: '150' }) // Slide from bottom
   * @example slideReveal({ axis: 'y', distance: '-150', stagger: 0.02 }) // Slide from top, faster
   */
  public static slideReveal({ axis = 'x', distance = '0', stagger = 0.04, duration = 0.7 } = {}): string {
    const property = axis === 'y' ? `y` : `x`;
    return `set:${property}:${distance};set:opacity:0;to:${property}:0:0@ease=power4,duration=${duration},stagger=${stagger},opacity=1;splitText@type="chars",target="chars"`;
  }

  /**
   * Word drop animation - words fall from above with random rotation.
   * Uses SplitText to animate words individually with random rotation and bounce effect.
   * @param y - Starting Y position in pixels (default: -100)
   * @param rotation - Random rotation range (default: '[-80,80]')
   * @param duration - Animation duration (default: 0.7)
   * @param ease - Easing function (default: 'back')
   * @param stagger - Delay between each word (default: 0.15)
   * @example wordDrop() // Default word drop effect
   * @example wordDrop({ y: -150, stagger: 0.2 }) // Drop from higher with slower stagger
   * @example wordDrop({ rotation: '[-45,45]', ease: 'bounce' }) // Less rotation with bounce
   */
  public static wordDrop({
    y = -100,
    rotation = '[-80,80]',
    duration = 0.7,
    ease = 'back',
    stagger = 0.15,
  } = {}): string {
    return `set:y:${y};set:opacity:0;set:rotation:random(${rotation});to:y:0:0@duration=${duration},ease=${ease},stagger=${stagger},opacity=1;to:rotation:0:0@duration=${duration},ease=${ease},stagger=${stagger};splitText@type="words",target="words"`;
  }

  /**
   * Line flip animation - lines flip in 3D with perspective effect.
   * Uses SplitText to animate lines individually with 3D rotation on X axis.
   * @param rotationX - Starting X rotation in degrees (default: -100)
   * @param transformOrigin - Transform origin for 3D effect (default: '50% 50% -160px')
   * @param duration - Animation duration (default: 0.8)
   * @param ease - Easing function (default: 'power3')
   * @param stagger - Delay between each line (default: 0.25)
   * @example lineFlip() // Default line flip effect
   * @example lineFlip({ rotationX: -120, stagger: 0.3 }) // More rotation with slower stagger
   * @example lineFlip({ transformOrigin: '50% 50% -200px', ease: 'back' }) // Deeper perspective
   */
  public static lineFlip({
    rotationX = -100,
    transformOrigin = '50% 50% -160px',
    duration = 0.8,
    ease = 'power3',
    stagger = 0.25,
  } = {}): string {
    return `set:perspective:500;set:rotationX:${rotationX};set:opacity:0;to:rotationX:0@duration=${duration},ease=${ease},stagger=${stagger},opacity=1,transformOrigin="${transformOrigin}";splitText@type="lines",target="lines"`;
  }
}
