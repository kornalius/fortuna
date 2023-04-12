import { registerClass } from '@/utils'
import { INpcData, Npc } from './npc'
import { SetupData } from '@/entity'

export class Guard extends Npc {
  setupInstance(data?: INpcData): SetupData | undefined {
    return super.setupInstance({
      name: 'Guard',
      icon: 'guard',
      ...(data || {})
    })
  }
}

registerClass(Guard)
