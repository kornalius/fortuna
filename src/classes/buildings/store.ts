import { registerClass } from '@/utils'
import { Building, IBuildingData } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class Store extends Building {
  setupInstance(data?: IBuildingData): SetupData | undefined {
    return super.setupInstance({
      name: 'Store',
      icon: 'store',
      ...(data || {})
    })
  }
}

registerClass(Store)
