import Electronic from './electronic'
import { registerClass } from '@/utils'

export default class Hifi extends Electronic {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Hifi',
      icon: 'hifi',
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Hifi)
