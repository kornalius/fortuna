import random from 'lodash/random'
import Npc from './npc'
import { registerClass } from '@/utils'

export default class Clerk extends Npc {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Clerk',
      icon: 'clerk',
      female: !!random(0, 1),
      ...data,
    })
  }
}

registerClass(Clerk)
