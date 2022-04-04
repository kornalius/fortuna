import Tool from './tool'
import { registerClass } from '@/utils'

export default class Shovel extends Tool {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Shovel',
      icon: 'shovel',
      ...data,
    })
  }
}

registerClass(Shovel)
