import Tool from './tool'
import { registerClass } from '@/utils'

export default class Scisors extends Tool {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Scisors',
      icon: 'scisors',
      ...data,
    })
  }
}

registerClass(Scisors)
