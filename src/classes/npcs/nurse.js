import Npc from './npc'
import { registerClass } from '@/utils'

export default class Nurse extends Npc {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Nurse',
      icon: 'nurse',
      female: true,
      ...data,
    })
  }
}

registerClass(Nurse)
