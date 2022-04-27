import random from 'lodash/random'
import Electronic from './electronic'
import { mixin, registerClass } from '@/utils'
import Switch from '@/mixins/switch'

export default class Pc extends Electronic {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Pc',
      icon: 'pc',
      iconSuffix: random(1, 4),
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

mixin(Pc, [
  Switch,
])

registerClass(Pc)
