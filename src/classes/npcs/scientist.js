import random from 'lodash/random'
import Npc from './npc'
import { registerClass } from '@/utils'

export default class Scientist extends Npc {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Scientist',
      icon: 'scientist',
      female: !!random(0, 1),
      ...data,
    })
  }
}

registerClass(Scientist)
