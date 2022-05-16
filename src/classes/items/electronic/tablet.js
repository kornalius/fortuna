import Electronic from './electronic'
import { registerClass } from '@/utils'

export default class Tablet extends Electronic {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Tablet',
      icon: 'tablet',
      ...data,
    })
  }
}

registerClass(Tablet)
