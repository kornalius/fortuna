import { registerClass } from '@/utils'
import { Building, IBuildingSetupData } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class PoliceStation extends Building {
  setupInstance(data?: IBuildingSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Police station',
      icon: 'police-station',
      ...(data || {})
    })
  }
}

registerClass(PoliceStation)
