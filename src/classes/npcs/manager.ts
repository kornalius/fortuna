import { registerClass } from '@/utils'
import { INpcData, Npc } from './npc'
import { SetupData } from '@/entity'

export class Manager extends Npc {
  setupInstance(data?: INpcData): SetupData | undefined {
    return super.setupInstance({
      name: 'Manager',
      icon: 'manager',
      ...(data || {})
    })
  }
}

registerClass(Manager)
