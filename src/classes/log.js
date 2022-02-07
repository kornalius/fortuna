import Entity from '../entity'
import { store } from '../store';

export default class Log extends Entity {
  setupInstance(data) {
    return super.setupInstance({
      timestamp: Date.now(),
      message: '',
      level: 0,
      ...data,
    })
  }

  get timestamp() { return this.state.timestamp }
  set timestamp(value) { this.state.timestamp = value }

  get message() { return this.state.message }
  set message(value) { this.state.message = value }

  get isImportant() { return this.state.level === 1 }
  get isIrrelevant() { return this.state.level === -1 }

  get level() { return this.state.level }
  set level(value) { this.state.level = value }
}
