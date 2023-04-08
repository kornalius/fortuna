import { registerClass } from '@/utils'
import { Npc } from './npc'
import { SetupData } from '@/entity'

export class Manager extends Npc {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Manager',
      icon: 'manager',
      ...(data || {})
    })
  }
}

registerClass(Manager)
