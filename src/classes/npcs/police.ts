import random from 'lodash/random'
import { registerClass } from '@/utils'
import { INpcSetupData, Npc } from './npc'
import { SetupData } from '@/entity'

export class Policeman extends Npc {
  setupInstance(data?: INpcSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Policeman',
      icon: 'police',
      female: !!random(0, 1),
      ...(data || {})
    })
  }
}

registerClass(Policeman)
