import random from 'lodash/random'
import Npc from './npc'
import { registerClass } from '@/utils'

export default class Policeman extends Npc {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Policeman',
      icon: 'police',
      female: !!random(0, 1),
      ...data,
    })
  }
}

registerClass(Policeman)
