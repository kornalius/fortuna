import { registerClass } from '@/utils'
import { Item } from '../item'
import { SetupData } from '@/entity'

export class Bed extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Bed',
      icon: 'bed',
      pickable: false,
      dropable: false,
      ...(data || {})
    })
  }

  get canSleepOn(): boolean { return true }
}

registerClass(Bed)
