import Electronic from './electronic'
import { mixin, registerClass } from '@/utils'
import Switch from '@/mixins/switch'

export default class Smartphone extends Electronic {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Smartphone',
      icon: 'smartphone',
      ...data,
    })
  }
}

mixin(Smartphone, [
  Switch,
])

registerClass(Smartphone)
