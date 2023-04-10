import { log, emit, registerClass, LOG_WARN } from '@/utils'
import { Item}  from './item'
import { SetupData } from '@/entity'
import { Door } from '@/classes/items/furniture/door'

export class Keypad extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    const { doorId } = this.setupDoor(data)

    return super.setupInstance({
      name: 'Keypad',
      icon: 'keypad',
      pickable: false,
      dropable: false,
      usable: true,
      // door to open
      doorId,
      ...(data || {})
    })
  }

  get doorId(): string | null { return this.state.doorId }
  set doorId(value) { this.state.doorId = value }

  get door(): Door | undefined { return window.store.doors.get(this.doorId) }
  set door(value: Door | undefined | null) { this.state.doorId = value ? value.id : null }

  get code(): string | null { return this.door?.keypadCode || '' }

  setupDoor(data?: SetupData): { doorId: string } {
    const doorId = data?.door?.id
    return { doorId }
  }

  async onUse(): Promise<void> {
    window.store.game.keypad = this
    window.store.game.showKeypad = true
  }

  async error(): Promise<boolean> {
    await emit(this, 'onError')
    return true
  }

  async onError(): Promise<void> {}

  async success(): Promise<boolean> {
    await emit(this, 'onSuccess')
    return true
  }

  async onSuccess(): Promise<void> {
    if (this.door) {
      this.door.locked = false
      log('Door has been unlocked', LOG_WARN, this.icon)
      window.store.game.playSound('unlock')
    }
  }
}

registerClass(Keypad)
