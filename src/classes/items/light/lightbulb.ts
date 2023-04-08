import { registerClass } from '@/utils'
import { Light } from './light'
import { SetupData } from '@/entity'

export class LightBulb extends Light {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Light bulb',
      icon: 'lightbulb',
      ...(data || {})
    })
  }
}

registerClass(LightBulb)
