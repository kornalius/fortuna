import { registerClass } from '@/utils'
import { INpcSetupData, Npc } from './npc'
import { SetupData } from '@/entity'

export class Guard extends Npc {
  setupInstance(data?: INpcSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Guard',
      icon: 'guard',
      ...(data || {})
    })
  }
}

registerClass(Guard)
