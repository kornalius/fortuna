import Food from './food'
import { registerClass } from '@/utils'

export default class Sushi extends Food {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Sushi',
      icon: 'sushi',
      ...data,
    })
  }
}

registerClass(Sushi)
