import { registerClass } from '@/utils'
import { IItemData, Item } from '../item'
import { SetupData } from '@/entity'

export class Bed extends Item {
  setupInstance(data?: IItemData): SetupData | undefined {
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
