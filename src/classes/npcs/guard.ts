import { registerClass } from '@/utils'
import { Npc } from './npc'
import { SetupData } from '@/entity'

export class Guard extends Npc {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Guard',
      icon: 'guard',
      ...(data || {})
    })
  }
}

registerClass(Guard)
