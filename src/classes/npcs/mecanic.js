import Npc from './npc'
import { registerClass } from '@/utils'

export default class Mecanic extends Npc {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Mecanic',
      icon: 'mecanic',
      ...data,
    })
  }
}

registerClass(Mecanic)
