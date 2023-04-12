import { registerClass } from '@/utils'
import { Building, IBuildingSetupData } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class House extends Building {
  setupInstance(data?: IBuildingSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'House',
      icon: 'house',
      ...(data || {})
    })
  }
}

registerClass(House)
