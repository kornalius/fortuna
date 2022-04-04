import Item from '../item'
import { log, mixin, registerClass } from '@/utils'
import Switch from '@/mixins/switch'

export default class Light extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Light',
      usable: true,
      pickable: false,
      dropable: false,
      ...data,
    })
  }

  async onExamine() {
    log([
      this.isOn ? 'It is ON' : 'It is OFF',
    ], 0, this.icon)
    return super.onExamine()
  }
}

mixin(Light, [
  Switch,
])

registerClass(Light)
