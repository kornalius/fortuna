import Item from '../item'
import { registerClass } from '@/utils'

export default class PictureFrame extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Picture frame',
      icon: 'el:picture',
      pickable: false,
      dropable: false,
      ...data,
    })
  }
}

registerClass(PictureFrame)
