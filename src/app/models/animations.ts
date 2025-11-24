import { Animation, animations } from './animations.data';

export type { Animation };

export class AnimationList {
  public readonly animations: Animation[] = animations;

  public get length(): number {
    return this.animations.length;
  }

  public get categoryCounts() {
    return {
      all: this.animations.length,
      entrance: this.animations.filter((animation) => animation.category === 'entrance').length,
      exit: this.animations.filter((animation) => animation.category === 'exit').length,
      attention: this.animations.filter((animation) => animation.category === 'attention').length,
      special: this.animations.filter((animation) => animation.category === 'special').length,
      shadow: this.animations.filter((animation) => animation.category === 'shadow').length,
      text: this.animations.filter((animation) => animation.category === 'text').length,
    };
  }

  public filter(category: 'all' | Animation['category'], query: string): Animation[] {
    query = query.toLowerCase().trim();
    return this.animations.filter(
      (animation) =>
        (category === 'all' || animation.category === category) &&
        (!query ||
          animation.name.toLowerCase().includes(query) ||
          animation.description.toLowerCase().includes(query) ||
          animation.value.toLowerCase().includes(query))
    );
  }
}
