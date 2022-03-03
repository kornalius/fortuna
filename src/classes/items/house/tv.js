import Item from '../item'
import { registerClass } from '@/utils'

export default class Tv extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Tv',
      icon: 'ion:tv-outline',
      usable: true,
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Tv)
