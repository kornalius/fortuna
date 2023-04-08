import { registerClass } from '@/utils'
import { Light } from './light'
import { SetupData } from '@/entity'

export class Lamp extends Light {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Lamp',
      icon: 'lamp',
      ...(data || {})
    })
  }
}

registerClass(Lamp)
