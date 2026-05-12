export class Logger {
  private static formatTimestamp(): string {
    const now = new Date();
    return now.toISOString();
  }

  static info(message: string, details?: Record<string, unknown>): void {
    const timestamp = this.formatTimestamp();
    const prefix = `[${timestamp}] [INFO]`;
    if (details) {
      console.log(`${prefix} ${message}`, JSON.stringify(details, null, 2));
    } else {
      console.log(`${prefix} ${message}`);
    }
  }

  static error(message: string, error?: Error | unknown): void {
    const timestamp = this.formatTimestamp();
    const prefix = `[${timestamp}] [ERROR]`;
    if (error instanceof Error) {
      console.error(`${prefix} ${message}`, error.message);
    } else if (error) {
      console.error(`${prefix} ${message}`, String(error));
    } else {
      console.error(`${prefix} ${message}`);
    }
  }

  static success(message: string, details?: Record<string, unknown>): void {
    const timestamp = this.formatTimestamp();
    const prefix = `[${timestamp}] [SUCCESS]`;
    if (details) {
      console.log(`${prefix} ${message}`, JSON.stringify(details, null, 2));
    } else {
      console.log(`${prefix} ${message}`);
    }
  }

  static action(actionName: string, details?: Record<string, unknown>): void {
    const timestamp = this.formatTimestamp();
    const prefix = `[${timestamp}] [ACTION]`;
    if (details) {
      console.log(`${prefix} ${actionName}`, JSON.stringify(details, null, 2));
    } else {
      console.log(`${prefix} ${actionName}`);
    }
  }
}
