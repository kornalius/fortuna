import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Npc } from './npc'
import { SetupData } from '@/entity'

export class Scientist extends Npc {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Scientist',
      icon: 'scientist',
      female: !!random(0, 1),
      ...(data || {})
    })
  }
}

registerClass(Scientist)