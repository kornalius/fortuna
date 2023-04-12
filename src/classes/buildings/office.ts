import { registerClass } from '@/utils'
import { Building, IBuildingData } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class Office extends Building {
  setupInstance(data?: IBuildingData): SetupData | undefined {
    return super.setupInstance({
      name: 'Office',
      icon: 'office',
      ...(data || {})
    })
  }
}

registerClass(Office)
