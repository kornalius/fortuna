import Light from './light'
import { registerClass } from '@/utils'

export default class DeskLamp extends Light {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Desk lamp',
      icon: 'deskLamp',
      ...data,
    })
  }
}

registerClass(DeskLamp)
