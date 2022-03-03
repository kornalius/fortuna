import Item from './item'
import { registerClass } from '@/utils'

export default class Thumbdrive extends Item {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Thumb drive',
      icon: 'bi:usb-drive-fill',
      usable: true,
      ...data,
    })
  }
}

registerClass(Thumbdrive)
