import Item from './item'
import { log } from '@/utils'

export default class LightSwitch extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Light switch',
      off: true,
      icon: 'heroicons-solid:light-bulb',
      pickable: false,
      dropable: false,
      ...data,
    })
  }

  get isOn() { return !this.state.off }
  set isOn(value) { return this.state.off = !value }

  get isOff() { return this.state.off }
  set isOff(value) { return this.state.off = value }

  examine() {
    log([
      'It\'s a normal looking light switch, nothing special about it other than the little button in the middle',
      this.isOn ? 'It is ON' : 'It is OFF',
    ])
  }

  toggle() {
    if (!this.canUse(true)) {
      log(`You cannot toggle the ${this.name}`)
      return false
    }

    this.isOn = !this.isOn
    return true
  }
}
