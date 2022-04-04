import Tool from './tool'
import { registerClass } from '@/utils'

export default class Handsaw extends Tool {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Handsaw',
      icon: 'handsaw',
      ...data,
    })
  }
}

registerClass(Handsaw)
