import Container from '@/classes/containers/container'
import { registerClass } from '@/utils'

export default class Cabinet extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Cabinet',
      icon: 'bxs:cabinet',
      ...data,
    })
  }
}

registerClass(Cabinet)
