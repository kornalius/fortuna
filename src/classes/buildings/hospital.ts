import { registerClass } from '@/utils'
import { Building } from '@/classes/buildings/building'
import { SetupData } from '@/entity'

export class Hospital extends Building {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Hospital',
      icon: 'hospital',
      ...(data || {})
    })
  }
}

registerClass(Hospital)