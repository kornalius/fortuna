import Item from './item'
import { registerClass } from '@/utils'

export default class Battery extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Battery',
      icon: 'emojione-monotone:battery',
      ...data,
    })
  }
}

registerClass(Battery)
