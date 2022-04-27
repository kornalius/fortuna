import Food from './food'
import { registerClass } from '@/utils'

export default class Cucumber extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Cucumber',
      icon: 'cucumber',
      ...data,
    })
  }
}

registerClass(Cucumber)
