import Container from '@/classes/containers/container'
import { registerClass } from '@/utils'

export default class Closet extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Closet',
      icon: 'closet',
      openIconSuffix: true,
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Closet)
