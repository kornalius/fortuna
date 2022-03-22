import Entity from '../entity'

export const LOG_IRRELEVANT = -1
export const LOG_IMPORTANT = 1
export const LOG_WARN = 2
export const LOG_ERROR = 3

export default class Log extends Entity {
  setupInstance(data) {
    return super.setupInstance({
      timestamp: Date.now(),
      message: '',
      icon: null,
      level: 0,
      ...data,
    })
  }

  get timestamp() { return this.state.timestamp }
  set timestamp(value) { this.state.timestamp = value }

  get message() { return this.state.message }
  set message(value) { this.state.message = value }

  get icon() { return this.state.icon }
  set icon(value) { this.state.icon = value }

  get isIrrelevant() { return this.state.level === -1 }
  get isImportant() { return this.state.level === 1 }
  get isWarning() { return this.state.level === 2 }
  get isError() { return this.state.level === 3 }

  get level() { return this.state.level }
  set level(value) { this.state.level = value }
}
