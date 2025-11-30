export class DomElement {
  constructor(private readonly element: HTMLElement) {}

  public query(selector?: string): HTMLElement {
    return selector ? this.element.querySelector(selector) || this.element : this.element;
  }

  public queryAll(selector?: string): HTMLElement | NodeListOf<Element> {
    return selector ? this.element.querySelectorAll(selector) : this.element;
  }
}

export function $(element: HTMLElement): DomElement {
  return new DomElement(element);
}
