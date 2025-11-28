import { Condition } from '../../utils';

export type TriggerType = 'enter' | 'leave' | 'click' | 'load' | 'scroll' | 'none';
export type TriggerRef = { trigger: Trigger; connect: () => void; disconnect: () => void };

export class Trigger {
  public static readonly default = 'none';

  private triggerType: TriggerType = Trigger.default;

  constructor(private readonly el: HTMLElement) {}

  public static isScroll(type: TriggerType): Condition {
    return new Condition(() => type === 'scroll');
  }

  public isScroll(): Condition {
    return Trigger.isScroll(this.triggerType);
  }

  private onEnter(callback: () => void): TriggerRef {
    this.el.addEventListener('mouseenter', callback);
    return {
      trigger: this,
      connect: () => this.onEnter(callback),
      disconnect: () => this.el.removeEventListener('mouseenter', callback),
    };
  }

  private onLeave(callback: () => void): TriggerRef {
    this.el.addEventListener('mouseleave', callback);
    return {
      trigger: this,
      connect: () => this.onLeave(callback),
      disconnect: () => this.el.removeEventListener('mouseleave', callback),
    };
  }

  private onClick(callback: () => void): TriggerRef {
    this.el.addEventListener('click', callback);
    return {
      trigger: this,
      connect: () => this.onClick(callback),
      disconnect: () => this.el.removeEventListener('click', callback),
    };
  }

  private onLoad(callback: () => void): TriggerRef {
    callback();
    return Trigger.empty(this);
  }

  private onScroll(callback: () => void): TriggerRef {
    callback();
    return Trigger.empty(this);
  }

  public when(triggerType: TriggerType): { then: (callback: VoidFunction) => TriggerRef } {
    this.triggerType = triggerType;
    return {
      then: (callback: () => void) => {
        switch (this.triggerType) {
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
