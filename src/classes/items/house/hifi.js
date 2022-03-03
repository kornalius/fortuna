import Item from '../item'
import { registerClass } from '@/utils'

export default class Hifi extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Hifi',
      icon: 'mdi:audio-video',
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(Hifi)
