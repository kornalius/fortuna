import Container from './container'
import { registerClass } from '@/utils'

export default class Cabinet extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Cabinet',
      icon: 'cabinet',
      ...data,
    })
  }
}

registerClass(Cabinet)
