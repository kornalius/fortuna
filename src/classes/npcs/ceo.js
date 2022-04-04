import Npc from './npc'
import { registerClass } from '@/utils'

export default class CEO extends Npc {
  setupInstance(data) {
    return super.setupInstance({
      name: 'CEO',
      icon: 'ceo',
      ...data,
    })
  }
}

registerClass(CEO)
