export class Condition {
  constructor(private readonly fn: () => boolean) {}

  public evaluate(): boolean {
    return this.fn();
  }

  public true(fn: () => void): void {
    if (this.evaluate()) {
      fn();
    }
  }

  public false(fn: () => void): void {
    if (!this.evaluate()) {
      fn();
    }
  }
}
