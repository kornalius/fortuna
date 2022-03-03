import Item from '../item'
import { mixin, registerClass } from '@/utils'
import Switch from '@/mixins/switch';

export default class Lamp extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Lamp',
      icon: 'bi:lamp-fill',
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

mixin(Lamp, [
  Switch,
])

registerClass(Lamp)
