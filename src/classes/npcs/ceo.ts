import { registerClass } from '@/utils'
import { Npc } from './npc'
import { SetupData } from '@/entity'

export class CEO extends Npc {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'CEO',
      icon: 'ceo',
      ...(data || {})
    })
  }
}

registerClass(CEO)
