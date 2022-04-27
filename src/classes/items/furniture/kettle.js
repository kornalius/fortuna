import Container from '@/classes/containers/container'
import { registerClass } from '@/utils'

export default class Kettle extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Kettle',
      icon: 'kettle',
      ...data,
    })
  }
}

registerClass(Kettle)
