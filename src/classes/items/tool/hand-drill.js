import Tool from './tool'
import { registerClass } from '@/utils'

export default class HandDrill extends Tool {
  setupInstance(data) {
    return super.setupInstance({
      name: 'HandDrill',
      icon: 'handDrill',
      ...data,
    })
  }
}

registerClass(HandDrill)
