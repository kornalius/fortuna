import Item from '../item'
import { mixin, registerClass } from '@/utils'
import Switch from '@/mixins/switch';

export default class DeskLamp extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Desk lamp',
      icon: 'teenyicons:desklamp-solid',
      usable: true,
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

mixin(DeskLamp, [
  Switch,
])

registerClass(DeskLamp)
