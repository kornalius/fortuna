import { Entity, SetupData } from '../entity'

export const LOG_IRRELEVANT = -1
export const LOG_IMPORTANT = 1
export const LOG_WARN = 2
export const LOG_ERROR = 3

export interface LogEntry {
  message: string | string[]
  icon: string | null
  level: number
  [key: string]: any
}

export class Log extends Entity {
  constructor(data: LogEntry) {
    super(data)
  }

  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      timestamp: Date.now(),
      message: '',
      icon: null,
      level: 0,
      ...(data || {})
    })
  }

  get timestamp(): number { return this.state.timestamp }
  set timestamp(value) { this.state.timestamp = value }

  get message(): string | null { return this.state.message }
  set message(value) { this.state.message = value }

  get icon(): string | null { return this.state.icon }
  set icon(value) { this.state.icon = value }

  get isIrrelevant(): boolean { return this.state.level === -1 }
  get isImportant(): boolean { return this.state.level === 1 }
  get isWarning(): boolean { return this.state.level === 2 }
  get isError(): boolean { return this.state.level === 3 }

  get level(): number { return this.state.level }
  set level(value) { this.state.level = value }
}
