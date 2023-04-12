import { registerClass } from '@/utils'
import { INpcSetupData, Npc } from './npc'
import { SetupData } from '@/entity'

export class Doctor extends Npc {
  setupInstance(data?: INpcSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Doctor',
      icon: 'doctor',
      ...(data || {})
    })
  }
}

registerClass(Doctor)
