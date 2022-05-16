import Container from './container'
import { registerClass } from '@/utils'

export default class Dishwasher extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Dishwasher',
      icon: 'dishwasher',
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Dishwasher)
