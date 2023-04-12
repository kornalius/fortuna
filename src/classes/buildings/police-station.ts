import { registerClass } from '@/utils'
import { Building, IBuildingData } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class PoliceStation extends Building {
  setupInstance(data?: IBuildingData): SetupData | undefined {
    return super.setupInstance({
      name: 'Police station',
      icon: 'police-station',
      ...(data || {})
    })
  }
}

registerClass(PoliceStation)
