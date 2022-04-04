import Npc from './npc'
import { registerClass } from '@/utils'

export default class Doctor extends Npc {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Doctor',
      icon: 'doctor',
      ...data,
    })
  }
}

registerClass(Doctor)
