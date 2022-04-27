import Food from './food'
import { registerClass } from '@/utils'

export default class Orange extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Orange',
      icon: 'orange',
      ...data,
    })
  }
}

registerClass(Orange)
