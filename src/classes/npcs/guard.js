import Npc from './npc'
import { registerClass } from '@/utils'

export default class Guard extends Npc {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Guard',
      icon: 'guard',
      ...data,
    })
  }
}

registerClass(Guard)
