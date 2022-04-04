import Npc from './npc'
import { registerClass } from '@/utils'

export default class Janitor extends Npc {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Janitor',
      icon: 'janitor',
      ...data,
    })
  }
}

registerClass(Janitor)
