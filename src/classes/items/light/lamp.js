import Light from './light'
import { registerClass } from '@/utils'

export default class Lamp extends Light {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Lamp',
      icon: 'lamp',
      ...data,
    })
  }
}

registerClass(Lamp)
