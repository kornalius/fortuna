import Tool from './tool'
import { registerClass } from '@/utils'

export default class Hammer extends Tool {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Hammer',
      icon: 'hammer',
      ...data,
    })
  }
}

registerClass(Hammer)
