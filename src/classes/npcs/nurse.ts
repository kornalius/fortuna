import { registerClass } from '@/utils'
import { INpcSetupData, Npc } from './npc'
import { SetupData } from '@/entity'

export class Nurse extends Npc {
  setupInstance(data?: INpcSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Nurse',
      icon: 'nurse',
      female: true,
      ...(data || {})
    })
  }
}

registerClass(Nurse)
