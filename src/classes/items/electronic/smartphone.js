import Electronic from './electronic'
import { registerClass } from '@/utils'

export default class Smartphone extends Electronic {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Smartphone',
      icon: 'smartphone',
      ...data,
    })
  }
}

registerClass(Smartphone)
