import { Trigger, TriggerType } from './trigger';
import { Timeline } from './timeline';

const cache = new WeakMap<HTMLElement, Map<TriggerType, Timeline>>();

export class TimelineFactory {
  constructor(private readonly element: HTMLElement, private readonly trigger: TriggerType) {
    if (!cache.has(this.element)) {
      cache.set(this.element, new Map());
    }

    if (!this.map.has(this.trigger)) {
      this.map.set(this.trigger, this._create());
    }
  }

  private get map(): Map<TriggerType, Timeline> {
    return cache.get(this.element) as Map<TriggerType, Timeline>;
  }

  private _create(): Timeline {
    return new Timeline(this.element, { immediateRender: Trigger.isScroll(this.trigger).evaluate() }).with(
      this.trigger
    );
  }

  public create(): Timeline {
    return this.map.get(this.trigger) as Timeline;
  }

  public static empty(): Timeline {
    return new Timeline(null as unknown as HTMLElement, {});
  }
}
