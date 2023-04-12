import { registerClass } from '@/utils'
import { Building, IBuildingData } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class Garage extends Building {
  setupInstance(data?: IBuildingData): SetupData | undefined {
    return super.setupInstance({
      name: 'Garage',
      icon: 'garage',
      ...(data || {})
    })
  }
}

registerClass(Garage)
