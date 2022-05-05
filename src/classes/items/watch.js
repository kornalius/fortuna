import Item from './item'
import { registerClass } from '@/utils'

export default class Watch extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Watch',
      icon: 'watch',
      weight: 1,
      ...data,
    })
  }
}

registerClass(Watch)
