import random from 'lodash/random'
import { registerClass } from '@/utils'
import { INpcSetupData, Npc } from './npc'
import { SetupData } from '@/entity'

export class Clerk extends Npc {
  setupInstance(data?: INpcSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Clerk',
      icon: 'clerk',
      female: !!random(0, 1),
      ...(data || {})
    })
  }
}

registerClass(Clerk)
