type LogLevel = 'info' | 'warn' | 'error' | 'debug'

class Logger {
  private static instance: Logger
  private logs: Array<{ level: LogLevel; message: string; timestamp: string; data?: any }> = []

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  private log(level: LogLevel, message: string, data?: any) {
    const logEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    }
    
    this.logs.push(logEntry)
    
    // Also log to console in development
    if (import.meta.env.DEV) {
      const consoleMethod = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'
      console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data || '')
    }
  }

  info(message: string, data?: any) {
    this.log('info', message, data)
  }

  warn(message: string, data?: any) {
    this.log('warn', message, data)
  }

  error(message: string, data?: any) {
    this.log('error', message, data)
  }

  debug(message: string, data?: any) {
    this.log('debug', message, data)
  }

  getLogs() {
    return this.logs
  }

  clearLogs() {
    this.logs = []
  }
}

export const logger = Logger.getInstance()
