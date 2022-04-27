import Item from '../item'
import { mixin, registerClass } from '@/utils'
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
}

mixin(Light, [
  Switch,
])

registerClass(Light)
