import Light from './light'
import { registerClass } from '@/utils'

export default class LightBulb extends Light {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Light bulb',
      icon: 'lightbulb',
      ...data,
    })
  }
}

registerClass(LightBulb)
