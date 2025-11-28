/**
 * Utility class for DOM element operations.
 * Provides a consistent interface for querying and manipulating DOM elements.
 */
export class DomElement {
  constructor(private readonly element: HTMLElement) {}

  /**
   * Query a single element using an optional CSS selector.
   * If no selector is provided, returns the base element.
   * If selector is provided but no match is found, returns the base element as fallback.
   *
   * @param selector - Optional CSS selector string
   * @returns The matched element or the base element
   */
  public query(selector?: string): HTMLElement {
    return selector ? this.element.querySelector(selector) || this.element : this.element;
  }

  /**
   * Query multiple elements using an optional CSS selector.
   * If no selector is provided, returns the base element.
   *
   * @param selector - Optional CSS selector string
   * @returns NodeList of matched elements or the base element
   */
  public queryAll(selector?: string): HTMLElement | NodeListOf<Element> {
    return selector ? this.element.querySelectorAll(selector) : this.element;
  }
}

/**
 * Helper function to create a DomElement instance.
 * Provides a jQuery-like syntax for DOM operations.
 *
 * @param element - The HTMLElement to wrap
 * @returns A DomElement instance
 *
 * @example
 * $(element).query('.child')
 * $(element).queryAll('.items')
 */
export function $(element: HTMLElement): DomElement {
  return new DomElement(element);
}
