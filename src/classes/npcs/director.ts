import { registerClass } from '@/utils'
import { INpcSetupData, Npc } from './npc'
import { SetupData } from '@/entity'

export class Director extends Npc {
  setupInstance(data?: INpcSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Director',
      icon: 'director',
      ...(data || {})
    })
  }
}

registerClass(Director)
