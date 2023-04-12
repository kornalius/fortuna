import { registerClass } from '@/utils'
import { INpcData, Npc } from './npc'
import { SetupData } from '@/entity'

export class Mecanic extends Npc {
  setupInstance(data?: INpcData): SetupData | undefined {
    return super.setupInstance({
      name: 'Mecanic',
      icon: 'mecanic',
      ...(data || {})
    })
  }
}

registerClass(Mecanic)
