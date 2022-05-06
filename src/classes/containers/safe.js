import Container from './container'
import { registerClass } from '@/utils'

export default class Cabinet extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Cabinet',
      icon: 'cabinet',
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Cabinet)
