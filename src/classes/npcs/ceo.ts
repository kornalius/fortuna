import { registerClass } from '@/utils'
import { INpcSetupData, Npc } from './npc'
import { SetupData } from '@/entity'

export class CEO extends Npc {
  setupInstance(data?: INpcSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'CEO',
      icon: 'ceo',
      ...(data || {})
    })
  }
}

registerClass(CEO)
