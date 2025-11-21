import { TypeConverter, ObjectParser, BaseParser } from '../../../utils';

export class PropsParser extends BaseParser {
  private inQuotes = false;
  private quoteChar = '';

  constructor(propsString: string) {
    super(propsString);
  }

  public parse(): Record<string, unknown> {
    const props: Record<string, unknown> = {};
    let currentKey = '';
    let currentValue = '';

    while (!this.isAtEnd()) {
      const char = this.current();

      if (this.isQuote(char)) {
        this.toggleQuote(char);
        currentValue += char;
        this.next();
        continue;
      }

      if (this.isOpenBrace(char) && !this.inQuotes) {
        this.enterNested();
        currentValue += char;
        this.next();
        continue;
      }

      if (this.isCloseBrace(char) && !this.inQuotes) {
        this.exitNested();
        currentValue += char;
        this.next();
        continue;
      }

      if (this.isAssignment(char, currentKey)) {
        currentKey = currentValue.trim();
        currentValue = '';
        this.next();
        continue;
      }

      if (this.isSeparator(char)) {
        if (currentKey && currentValue) {
          props[currentKey] = this.parseValue(currentValue.trim());
          currentKey = '';
          currentValue = '';
        }
        this.next();
        continue;
      }

      currentValue += char;
      this.next();
    }

    if (currentKey && currentValue) {
      props[currentKey] = this.parseValue(currentValue.trim());
    }

    return props;
  }

  private isQuote(char: string): boolean {
    return char === '"' || char === "'";
  }

  private toggleQuote(char: string): void {
    if (!this.inQuotes) {
      this.inQuotes = true;
      this.quoteChar = char;
    } else if (char === this.quoteChar) {
      this.inQuotes = false;
      this.quoteChar = '';
    }
  }

  private isAssignment(char: string, currentKey: string): boolean {
    return char === '=' && this.isAtRootLevel() && !currentKey && !this.inQuotes;
  }

  private isSeparator(char: string): boolean {
    return char === ',' && this.isAtRootLevel() && !this.inQuotes;
  }

  private parseValue(value: string): unknown {
    return this.isObject(value) ? new ObjectParser(value).parse() : new TypeConverter(value).convert();
  }

  private isObject(value: string): boolean {
    return value.startsWith('{') && value.endsWith('}');
  }
}
