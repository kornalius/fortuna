import Container from '@/classes/containers/container'
import { registerClass } from '@/utils'

export default class Stove extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Stove',
      icon: 'stove',
      ...data,
    })
  }
}

registerClass(Stove)
