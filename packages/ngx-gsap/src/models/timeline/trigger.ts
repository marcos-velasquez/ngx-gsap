import { Condition } from '../../utils';

/* `enter` and `leave` are the 1.x names for `hover` and `hoverOut`, kept so existing templates still
   work. They name the pointer, not the element entering or leaving the DOM. */
export type TriggerType = 'hover' | 'hoverOut' | 'enter' | 'leave' | 'click' | 'load' | 'scroll' | 'none';
export type TriggerRef = { trigger: Trigger; connect: () => void; disconnect: () => void };

export class Trigger {
  private triggerType: TriggerType = 'none';

  constructor(private readonly el: HTMLElement) {}

  public static isScroll(type: TriggerType): Condition {
    return new Condition(() => type === 'scroll');
  }

  public static isLoad(type: TriggerType): Condition {
    return new Condition(() => type === 'load');
  }

  public isScroll(): Condition {
    return Trigger.isScroll(this.triggerType);
  }

  private onHover(callback: () => void): TriggerRef {
    return {
      trigger: this,
      connect: () => this.el.addEventListener('mouseenter', callback),
      disconnect: () => this.el.removeEventListener('mouseenter', callback),
    };
  }

  private onHoverOut(callback: () => void): TriggerRef {
    return {
      trigger: this,
      connect: () => this.el.addEventListener('mouseleave', callback),
      disconnect: () => this.el.removeEventListener('mouseleave', callback),
    };
  }

  private onClick(callback: () => void): TriggerRef {
    return {
      trigger: this,
      connect: () => this.el.addEventListener('click', callback),
      disconnect: () => this.el.removeEventListener('click', callback),
    };
  }

  private onLoad(callback: () => void): TriggerRef {
    return { ...Trigger.empty(this), connect: () => callback() };
  }

  public when(triggerType: TriggerType): { then: (callback: VoidFunction) => TriggerRef } {
    this.triggerType = triggerType;
    return {
      then: (callback: () => void) => {
        switch (this.triggerType) {
          case 'hover':
          case 'enter':
            return this.onHover(callback);
          case 'hoverOut':
          case 'leave':
            return this.onHoverOut(callback);
          case 'click':
            return this.onClick(callback);
          case 'load':
            return this.onLoad(callback);
          case 'scroll':
          default:
            return Trigger.empty(this);
        }
      },
    };
  }

  private static empty(trigger: Trigger): TriggerRef {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return { trigger, connect: () => {}, disconnect: () => {} };
  }
}
