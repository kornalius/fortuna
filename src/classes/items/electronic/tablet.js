import Electronic from './electronic'
import { mixin, registerClass } from '@/utils'
import Switch from '@/mixins/switch'

export default class Tablet extends Electronic {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Tablet',
      icon: 'tablet',
      ...data,
    })
  }
}

mixin(Tablet, [
  Switch,
])

registerClass(Tablet)
