import { registerClass } from '@/utils'
import { Building, IBuildingSetupData } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class Hotel extends Building {
  setupInstance(data?: IBuildingSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Hotel',
      icon: 'hotel',
      ...(data || {})
    })
  }
}

registerClass(Hotel)
