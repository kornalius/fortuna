import { registerClass } from '@/utils'
import { Building, IBuildingSetupData } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class Garage extends Building {
  setupInstance(data?: IBuildingSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Garage',
      icon: 'garage',
      ...(data || {})
    })
  }
}

registerClass(Garage)
