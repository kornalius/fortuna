import Tool from './tool'
import { registerClass } from '@/utils'

export default class Rope extends Tool {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Rope',
      icon: 'rope',
      ...data,
    })
  }
}

registerClass(Rope)
