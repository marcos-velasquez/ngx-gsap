export class Condition {
  constructor(private readonly fn: () => boolean) {}

  public evaluate(): boolean {
    return this.fn();
  }

  public and(other: Condition): Condition {
    return new Condition(() => this.evaluate() && other.evaluate());
  }

  public or(other: Condition): Condition {
    return new Condition(() => this.evaluate() || other.evaluate());
  }

  public not(): Condition {
    return new Condition(() => !this.evaluate());
  }

  public whenTrue(fn: () => void): void {
    if (this.evaluate()) {
      fn();
    }
  }

  public whenFalse(fn: () => void): void {
    if (!this.evaluate()) {
      fn();
    }
  }

  public throw(message: string): void {
    if (!this.evaluate()) {
      throw new Error(message);
    }
  }
}
