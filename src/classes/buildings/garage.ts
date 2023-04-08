import { registerClass } from '@/utils'
import { Building } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class Garage extends Building {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Garage',
      icon: 'garage',
      ...(data || {})
    })
  }
}

registerClass(Garage)
