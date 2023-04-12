import { registerClass } from '@/utils'
import { Building, IBuildingData } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class Skyscraper extends Building {
  setupInstance(data?: IBuildingData): SetupData | undefined {
    return super.setupInstance({
      name: 'Skyscraper',
      icon: 'skyscraper',
      ...(data || {})
    })
  }
}

registerClass(Skyscraper)
