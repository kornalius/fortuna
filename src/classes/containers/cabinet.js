import Container from '@/classes/containers/container'
import { registerClass } from '@/utils'

export default class Safe extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Safe',
      icon: 'teenyicons:safe-solid',
      ...data,
    })
  }
}

registerClass(Safe)
