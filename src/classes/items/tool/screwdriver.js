import Tool from './tool'
import { registerClass } from '@/utils'

export default class Screwdriver extends Tool {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Screwdriver',
      icon: 'screwdriver',
      ...data,
    })
  }
}

registerClass(Screwdriver)
