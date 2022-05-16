import Container from './container'
import { registerClass } from '@/utils'

export default class Stove extends Container {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Stove',
      icon: 'stove',
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Stove)
