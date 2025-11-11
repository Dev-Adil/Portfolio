/**
 * Centralized Logging Utility
 * 
 * Provides structured logging with context and environment awareness.
 * In production, logs are suppressed unless sent to an error tracking service.
 * 
 * @example
 * ```ts
 * import { log, warn, error } from './utils/logger';
 * 
 * log('User action', { userId: 123 });
 * warn('Deprecated API usage', null, { context: 'API' });
 * error('Failed to load data', err, { context: 'DataLoader' });
 * ```
 */

type LogLevel = 'log' | 'warn' | 'error';

interface LogOptions {
  context?: string;
  tags?: string[];
  [key: string]: any;
}

const isDevelopment = import.meta.env.DEV;

/**
 * Creates a logger function for a specific log level
 */
const createLogger = (level: LogLevel) => 
  (message: string, data?: any, options?: LogOptions): void => {
    if (isDevelopment) {
      const prefix = options?.context ? `[${options.context}]` : '';
      const tags = options?.tags ? `[${options.tags.join(', ')}]` : '';
      console[level](`${prefix}${tags} ${message}`, data || '', options || '');
    }
    // In production, you might send errors to a service like Sentry, Datadog, etc.
    // For now, we just suppress console output in production.
  };

/**
 * General information logging
 */
export const log = createLogger('log');

/**
 * Warning logging for non-critical issues
 */
export const warn = createLogger('warn');

/**
 * Error logging for critical errors
 */
export const error = createLogger('error');

