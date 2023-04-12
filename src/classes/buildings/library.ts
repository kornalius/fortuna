import { registerClass } from '@/utils'
import { Building, IBuildingSetupData } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class Library extends Building {
  setupInstance(data?: IBuildingSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Library',
      icon: 'library',
      ...(data || {})
    })
  }
}

registerClass(Library)
