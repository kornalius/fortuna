import { registerClass } from '@/utils'
import { Building, IBuildingData } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class Jail extends Building {
  setupInstance(data?: IBuildingData): SetupData | undefined {
    return super.setupInstance({
      name: 'Jail',
      icon: 'jail',
      ...(data || {})
    })
  }
}

registerClass(Jail)