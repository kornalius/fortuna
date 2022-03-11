import Container from '@/classes/containers/container'
import { registerClass } from '@/utils'

export default class Desk extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Desk',
      icon: 'desk',
      ...data,
    })
  }
}

registerClass(Desk)
