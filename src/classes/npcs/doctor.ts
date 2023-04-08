import { registerClass } from '@/utils'
import { Npc } from './npc'
import { SetupData } from '@/entity'

export class Doctor extends Npc {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Doctor',
      icon: 'doctor',
      ...(data || {})
    })
  }
}

registerClass(Doctor)
