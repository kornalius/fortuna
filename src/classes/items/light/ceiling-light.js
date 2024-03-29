import Light from './light'
import { registerClass } from '@/utils'

export default class CeilingLight extends Light {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Ceiling light',
      icon: 'ceiling-light',
      ...data,
    })
  }
}

registerClass(CeilingLight)
