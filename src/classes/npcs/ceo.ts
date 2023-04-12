import { registerClass } from '@/utils'
import { INpcData, Npc } from './npc'
import { SetupData } from '@/entity'

export class CEO extends Npc {
  setupInstance(data?: INpcData): SetupData | undefined {
    return super.setupInstance({
      name: 'CEO',
      icon: 'ceo',
      ...(data || {})
    })
  }
}

registerClass(CEO)
