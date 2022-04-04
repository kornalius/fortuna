import Food from './food'
import { registerClass } from '@/utils'

export default class Steak extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Steak',
      icon: 'steak',
      ...data,
    })
  }
}

registerClass(Steak)
