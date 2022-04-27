import Food from './food'
import { registerClass } from '@/utils'

export default class Carot extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Carot',
      icon: 'carot',
      ...data,
    })
  }
}

registerClass(Carot)
