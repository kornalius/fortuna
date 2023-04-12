import { registerClass } from '@/utils'
import { INpcData, Npc } from './npc'
import { SetupData } from '@/entity'

export class Doctor extends Npc {
  setupInstance(data?: INpcData): SetupData | undefined {
    return super.setupInstance({
      name: 'Doctor',
      icon: 'doctor',
      ...(data || {})
    })
  }
}

registerClass(Doctor)
