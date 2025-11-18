export abstract class BaseParser {
  protected index = 0;
  protected depth = 0;

  constructor(protected readonly input: string) {}

  protected current(): string {
    return this.input[this.index];
  }

  protected next(): void {
    this.index++;
  }

  protected isAtEnd(): boolean {
    return this.index >= this.input.length;
  }

  protected peek(offset = 1): string {
    return this.input[this.index + offset];
  }

  protected isOpenBracket(char: string): boolean {
    return char === '{' || char === '[';
  }

  protected isCloseBracket(char: string): boolean {
    return char === '}' || char === ']';
  }

  protected isOpenBrace(char: string): boolean {
    return char === '{';
  }

  protected isCloseBrace(char: string): boolean {
    return char === '}';
  }

  protected isAtRootLevel(): boolean {
    return this.depth === 0;
  }

  protected enterNested(): void {
    this.depth++;
  }

  protected exitNested(): void {
    this.depth--;
  }

  protected reset(): void {
    this.index = 0;
    this.depth = 0;
  }
}
