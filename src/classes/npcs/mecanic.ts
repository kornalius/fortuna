import { registerClass } from '@/utils'
import { Npc } from './npc'
import { SetupData } from '@/entity'

export class Mecanic extends Npc {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Mecanic',
      icon: 'mecanic',
      ...(data || {})
    })
  }
}

registerClass(Mecanic)
