import random from 'lodash/random'
import Electronic from './electronic'
import { mixin, registerClass } from '@/utils'
import Switch from '@/mixins/switch'

export default class Laptop extends Electronic {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Laptop',
      icon: 'laptop',
      iconSuffix: random(1, 2),
      ...data,
    })
  }
}

mixin(Laptop, [
  Switch,
])

registerClass(Laptop)
