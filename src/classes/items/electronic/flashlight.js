import Electronic from './electronic'
import { registerClass } from '@/utils'

export default class Flashlight extends Electronic {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Flashlight',
      icon: 'flashlight',
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Flashlight)
