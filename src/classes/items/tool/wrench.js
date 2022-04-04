import Tool from './tool'
import { registerClass } from '@/utils'

export default class Wrench extends Tool {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Wrench',
      icon: 'wrench',
      ...data,
    })
  }
}

registerClass(Wrench)
