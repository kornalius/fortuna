import random from 'lodash/random'
import Npc from './npc'
import { registerClass } from '@/utils'

export default class Agent extends Npc {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Agent',
      icon: 'agent',
      female: !!random(0, 1),
      ...data,
    })
  }
}

registerClass(Agent)
