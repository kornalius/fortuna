import Npc from './npc'
import { registerClass } from '@/utils'

export default class Director extends Npc {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Director',
      icon: 'director',
      ...data,
    })
  }
}

registerClass(Director)
