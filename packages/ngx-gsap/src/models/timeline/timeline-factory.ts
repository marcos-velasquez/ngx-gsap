import { Trigger, TriggerType } from '../trigger';
import { Timeline } from './timeline';

const cache = new WeakMap<HTMLElement, Timeline>();

export class TimelineFactory {
  constructor(private readonly element: HTMLElement, private readonly trigger: TriggerType) {
    if (!cache.has(this.element)) {
      cache.set(this.element, this._create());
    }
  }

  private _create(): Timeline {
    return new Timeline(this.element, { immediateRender: Trigger.isScroll(this.trigger).evaluate() }).with(
      this.trigger
    );
  }

  public create(): Timeline {
    return cache.get(this.element) as Timeline;
  }

  public static empty(): Timeline {
    return new Timeline(null as unknown as HTMLElement, {});
  }
}
