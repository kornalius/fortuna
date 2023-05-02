import { registerClass } from '@/utils'
import { Building, IBuildingData } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class GasStation extends Building {
  setupInstance(data?: IBuildingData): SetupData | undefined {
    return super.setupInstance({
      name: 'GasStation',
      icon: 'gas-station',
      ...(data || {})
    })
  }
}

registerClass(GasStation)
