import { registerClass } from '@/utils'
import { Building, IBuildingData } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class Restaurant extends Building {
  setupInstance(data?: IBuildingData): SetupData | undefined {
    return super.setupInstance({
      name: 'Restaurant',
      icon: 'restaurant',
      ...(data || {})
    })
  }
}

registerClass(Restaurant)
