import Item from '../item'
import { registerClass } from '@/utils'

export default class Radio extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Radio',
      icon: 'radio',
      usable: true,
      ...data,
    })
  }
}

registerClass(Radio)
