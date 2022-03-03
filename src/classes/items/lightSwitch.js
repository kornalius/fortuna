import Item from './item'
import { emit, log, mixin, registerClass } from '@/utils'
import Switch from '@/mixins/switch'

export default class LightSwitch extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Light switch',
      icon: 'heroicons-solid:light-bulb',
      pickable: false,
      dropable: false,
      ...data,
    })
  }

  async examine() {
    log([
      'It\'s a normal looking light switch, nothing special about it other than the little button in the middle',
      this.isOn ? 'It is ON' : 'It is OFF',
    ])
    await emit.call(this, 'onExamine')
  }
}

mixin(LightSwitch, [
  Switch,
])

registerClass(LightSwitch)
