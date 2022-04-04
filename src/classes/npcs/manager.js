import Npc from './npc'
import { registerClass } from '@/utils'

export default class Manager extends Npc {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Manager',
      icon: 'manager',
      ...data,
    })
  }
}

registerClass(Manager)
