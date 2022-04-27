import Tool from './tool'
import { registerClass } from '@/utils'

export default class Chainsaw extends Tool {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Chainsaw',
      icon: 'chainsaw',
      ...data,
    })
  }
}

registerClass(Chainsaw)
