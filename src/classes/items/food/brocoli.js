import Food from './food'
import { registerClass } from '@/utils'

export default class Brocoli extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Brocoli',
      icon: 'brocoli',
      ...data,
    })
  }
}

registerClass(Brocoli)
