import { registerClass } from '@/utils'
import { INpcData, Npc } from './npc'
import { SetupData } from '@/entity'

export class Nurse extends Npc {
  setupInstance(data?: INpcData): SetupData | undefined {
    return super.setupInstance({
      name: 'Nurse',
      icon: 'nurse',
      female: true,
      ...(data || {})
    })
  }
}

registerClass(Nurse)
