import Container from '@/classes/containers/container'
import { registerClass } from '@/utils'

export default class Plant extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Plant',
      icon: 'ri:plant-fill',
      ...data,
    })
  }
}

registerClass(Plant)
