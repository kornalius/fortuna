import { registerClass } from '@/utils'
import { INpcSetupData, Npc } from './npc'
import { SetupData } from '@/entity'

export class Janitor extends Npc {
  setupInstance(data?: INpcSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Janitor',
      icon: 'janitor',
      ...(data || {})
    })
  }
}

registerClass(Janitor)
