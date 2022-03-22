import Item from './item'
import { log, mixin, registerClass } from '@/utils'
import Switch from '@/mixins/switch'

export default class LightSwitch extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Light switch',
      icon: 'lightSwitch',
      pickable: false,
      dropable: false,
      ...data,
    })
  }

  async onExamine() {
    log([
      'It\'s a normal looking light switch, nothing special about it other than the little button in the middle',
      this.isOn ? 'It is ON' : 'It is OFF',
    ], 0, this.icon)
    return super.onExamine()
  }
}

mixin(LightSwitch, [
  Switch,
])

registerClass(LightSwitch)
