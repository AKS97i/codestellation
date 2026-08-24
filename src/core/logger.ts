type Level = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_ORDER: Level[] = ['debug', 'info', 'warn', 'error'];

export class Logger {
  private minLevel: Level;

  constructor(minLevel: Level = 'info') {
    this.minLevel = minLevel;
  }

  setLevel(level: Level) {
    this.minLevel = level;
  }

  private enabled(level: Level) {
    return LEVEL_ORDER.indexOf(level) >= LEVEL_ORDER.indexOf(this.minLevel);
  }

  debug(...args: unknown[]) { if (this.enabled('debug')) console.debug('[Codestellation]', ...args); }
  info(...args: unknown[]) { if (this.enabled('info')) console.info('[Codestellation]', ...args); }
  warn(...args: unknown[]) { if (this.enabled('warn')) console.warn('[Codestellation]', ...args); }
  error(...args: unknown[]) { if (this.enabled('error')) console.error('[Codestellation]', ...args); }
}

export const logger = new Logger();
