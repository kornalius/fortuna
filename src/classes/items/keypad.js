import Item from './item'
import { store } from '@/store'
import { log, emit, registerClass, LOG_WARN } from '@/utils'

export default class Keypad extends Item {
  setupInstance(data) {
    const { doorId } = this.setupDoor(data)

    return super.setupInstance({
      name: 'Keypad',
      icon: 'keypad',
      pickable: false,
      dropable: false,
      usable: true,
      // door to open
      doorId,
      ...data,
    })
  }

  get doorId() { return this.state.doorId }
  set doorId(value) { this.state.doorId = value }

  get door() { return store.doors.get(this.doorId) }
  set door(value) {
    this.state.doorId = value ? value.id : null
  }

  get code() { return this.door?.keypadCode || '' }

  setupDoor(data) {
    const doorId = data?.door?.id
    return { doorId }
  }

  async onUse() {
    store.game.keypad = this
    store.game.showKeypad = true
  }

  async error() {
    await emit.call(this, 'onError')
    return true
  }

  async onError() {}

  async success() {
    await emit.call(this, 'onSuccess')
    return true
  }

  async onSuccess() {
    if (this.door) {
      this.door.locked = false
      log('Door has been unlocked', LOG_WARN, this.icon)
      store.game.playSound('unlock')
    }
  }
}

registerClass(Keypad)
