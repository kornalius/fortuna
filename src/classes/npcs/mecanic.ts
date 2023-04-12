import { registerClass } from '@/utils'
import { INpcSetupData, Npc } from './npc'
import { SetupData } from '@/entity'

export class Mecanic extends Npc {
  setupInstance(data?: INpcSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Mecanic',
      icon: 'mecanic',
      ...(data || {})
    })
  }
}

registerClass(Mecanic)
