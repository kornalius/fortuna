import Item from '../item'
import { mixin, registerClass } from '@/utils'
import Switch from '@/mixins/switch';

export default class Lamp extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Lamp',
      icon: 'lamp',
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
