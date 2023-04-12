import { registerClass } from '@/utils'
import { Light } from './light'
import { SetupData } from '@/entity'
import { IItemData } from '@/classes/items/item'

export class LightBulb extends Light {
  setupInstance(data?: IItemData): SetupData | undefined {
    return super.setupInstance({
      name: 'Light bulb',
      icon: 'lightbulb',
      ...(data || {})
    })
  }
}

registerClass(LightBulb)
