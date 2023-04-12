import { registerClass } from '@/utils'
import { Light } from './light'
import { SetupData } from '@/entity'
import { IItemData } from '@/classes/items/item'

export class Lamp extends Light {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Lamp',
      icon: 'lamp',
      ...(data || {})
    })
  }
}

registerClass(Lamp)
