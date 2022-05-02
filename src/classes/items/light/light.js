import Electronic from '@/classes/items/electronic/electronic'
import { mixin, registerClass } from '@/utils'
import Switch from '@/mixins/switch'

export default class Light extends Electronic {
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
