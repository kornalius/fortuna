import Entity from '../entity'
import { store } from '../store';

export default class Log extends Entity {
  setupInstance(data) {
    return {
      timestamp: Date.now(),
      message: '',
      targetId: undefined,
      targetStore: undefined,
      level: 0,
      ...data,
    }
  }

  get timestamp() { return this.state.timestamp }
  set timestamp(value) { this.state.timestamp = value }

  get message() { return this.state.message }
  set message(value) { this.state.message = value }

  get target() {
    return this.targetStore && this.targetId
      ? store[this.targetStore].get(this.targetId)
      : undefined
  }
  set target(value) {
    if (value) {
      this.targetId = value.id
      this.targetStore = value.store
    } else {
      this.targetId = undefined
      this.targetStore = undefined
    }
  }

  get isImportant() { return this.state.level === 1 }
  get isIrrelevant() { return this.state.level === -1 }

  get level() { return this.state.level }
  set level(value) { this.state.level = value }
}
