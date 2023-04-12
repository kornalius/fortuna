import { registerClass } from '@/utils'
import { Light } from './light'
import { SetupData } from '@/entity'
import { IItemSetupData } from '@/classes/items/item'

export class LightBulb extends Light {
  setupInstance(data?: IItemSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Light bulb',
      icon: 'lightbulb',
      ...(data || {})
    })
  }
}

registerClass(LightBulb)
