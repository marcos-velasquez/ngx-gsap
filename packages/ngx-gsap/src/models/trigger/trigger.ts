import { Condition } from '../../utils';

export type TriggerType = 'enter' | 'leave' | 'click' | 'load' | 'scroll' | 'none';
export type TriggerRef = { connect: () => void; disconnect: () => void };

export class Trigger {
  public static readonly default = 'none';

  constructor(private readonly el: HTMLElement) {}

  public static isScroll(type: TriggerType): Condition {
    return new Condition(() => type === 'scroll');
  }

  public onEnter(callback: () => void): TriggerRef {
    this.el.addEventListener('mouseenter', callback);
    return {
      connect: () => this.onEnter(callback),
      disconnect: () => this.el.removeEventListener('mouseenter', callback),
    };
  }

  public onLeave(callback: () => void): TriggerRef {
    this.el.addEventListener('mouseleave', callback);
    return {
      connect: () => this.onLeave(callback),
      disconnect: () => this.el.removeEventListener('mouseleave', callback),
    };
  }

  public onClick(callback: () => void): TriggerRef {
    this.el.addEventListener('click', callback);
    return {
      connect: () => this.onClick(callback),
      disconnect: () => this.el.removeEventListener('click', callback),
    };
  }

  public onLoad(callback: () => void): TriggerRef {
    callback();
    return Trigger.empty();
  }

  public onScroll(callback: () => void): TriggerRef {
    callback();
    return Trigger.empty();
  }

  public when(triggerType: TriggerType): { then: (callback: VoidFunction) => TriggerRef } {
    return {
      then: (callback: () => void) => {
        switch (triggerType) {
          case 'enter':
            return this.onEnter(callback);
          case 'leave':
            return this.onLeave(callback);
          case 'click':
            return this.onClick(callback);
          case 'load':
            return this.onLoad(callback);
          case 'scroll':
            return this.onScroll(callback);
          default:
            return Trigger.empty();
        }
      },
    };
  }

  public static empty(): TriggerRef {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return { connect: () => {}, disconnect: () => {} };
  }
}
